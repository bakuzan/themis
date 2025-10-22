import db from './database';

import { Title } from '@/types/Title';
import { IssueWithTitleInfo } from '@/types/Issue';
import { Collection, CollectionWithIssueCount } from '@/types/Collection';
import {
  CollectionIssue,
  ReOrderCollectionIssuesRequest
} from '@/types/CollectionIssue';
import { ReadOrderIssue } from '@/types/ReadOrderIssue';

import getStoredProceedure from '@/api/database/storedProceedures';

import {
  toCollectionViewModel,
  toCollectionWithIssuesViewModel
} from './mappers/collection';
import { SORT_ORDER_INCREMENT } from '@/constants';
import { ReOrderDirection } from '@/constants/ReOrderDirection';

import { moveToNewArrayPosition } from './helpers/common';
import setIssueSortOrders from './helpers/setIssueSortOrders';
import setReadOrderIssueSortOrders from './helpers/setReadOrderIssueSortOrders';

/* DATEBASE READS */
export async function getCollections() {
  const query = getStoredProceedure('GetCollectionsWithIssueCount');
  const collections = db.prepare(query).all() as CollectionWithIssueCount[];

  return collections.map(toCollectionViewModel);
}

export function getCollectionById(id: number) {
  const collection = db
    .prepare(`SELECT * FROM Collection WHERE Id = ?`)
    .get(id) as Collection;

  return toCollectionViewModel(collection);
}

export async function getCollectionWithIssues(id: number) {
  const collection = db
    .prepare(`SELECT * FROM Collection WHERE Id = ?`)
    .get(id) as Collection;

  const query = getStoredProceedure('GetIssuesListForCollection');
  const issues = db.prepare(query).all(id) as IssueWithTitleInfo[];

  return toCollectionWithIssuesViewModel(collection, issues);
}

export function getCollectionsForDropdown() {
  const query = getStoredProceedure('GetCollectionsForDropdown');
  const collections = db.prepare(query).all() as CollectionWithIssueCount[];

  return collections.map(toCollectionViewModel);
}

export async function getCollectionDefaultProps(titleId: number) {
  const title = db
    .prepare(`SELECT * FROM Title WHERE Id = ?`)
    .get(titleId) as Title;

  const collections = db
    .prepare(`SELECT * FROM Collection WHERE Name = ?`)
    .all(title.Name) as Collection[];

  const numbers = collections
    .map((x) => x.Number)
    .filter((x): x is number => typeof x === 'number');

  return {
    defaultName: title.Name,
    ...(numbers.length > 0 && { defaultNumber: numbers.sort().pop()! + 1 })
  };
}

/* DATABASE WRITES */
export function insertCollection(data: Partial<Collection>) {
  const result = db
    .prepare(
      `INSERT INTO Collection (Name, PublicationDate, Number)
       VALUES (@Name, @PublicationDate, @Number)`
    )
    .run(data);

  return result.lastInsertRowid as number;
}

export function updateCollection(data: Partial<Collection>) {
  db.prepare(
    `
    UPDATE Collection
       SET Name = @Name
         , PublicationDate = @PublicationDate
         , Number = @Number
     WHERE Id = @Id
    `
  ).run(data);
}

export function checkCollectionIssueDoesNotExist(data: CollectionIssue) {
  const existingCollectionIssue = db
    .prepare(
      `
    SELECT * 
      FROM CollectionIssue
     WHERE CollectionId = @CollectionId
       AND IssueId = @IssueId`
    )
    .get(data);

  return !existingCollectionIssue;
}

function insertCollectionIssue(data: CollectionIssue, sortOrder: number) {
  db.prepare(
    `INSERT INTO CollectionIssue (CollectionId, IssueId, SortOrder)
     VALUES (@CollectionId, @IssueId, @SortOrder)`
  ).run({ ...data, SortOrder: sortOrder });
}

export function insertCollectionIssues(items: CollectionIssue[]) {
  const collectionId = items[0].CollectionId;
  const query = `SELECT * FROM CollectionIssue WHERE CollectionId = ? ORDER BY SortOrder DESC LIMIT 1`;
  const ci = db.prepare(query).get(collectionId) as CollectionIssue;
  const latestSortOrder = ci?.SortOrder ?? 0;
  let sortOrder = latestSortOrder;

  for (let ci of items) {
    sortOrder += SORT_ORDER_INCREMENT;
    insertCollectionIssue(ci, sortOrder);
  }
}

export function removeCollectionIssue(data: CollectionIssue) {
  db.prepare(
    `DELETE FROM CollectionIssue
     WHERE CollectionId = @CollectionId
       AND IssueId = @IssueId`
  ).run(data);
}

export function reOrderCollectionIssues(data: ReOrderCollectionIssuesRequest) {
  const isMovingUp = data.Direction === ReOrderDirection.UP;

  // Re-order issues within a collection
  const query = `SELECT * FROM CollectionIssue WHERE CollectionId = @CollectionId ORDER BY SortOrder`;
  const issues = db.prepare(query).all(data) as CollectionIssue[];

  const initialSortOrder = issues[0].SortOrder;
  const diff = isMovingUp ? -1 : 1;
  const targetIndex = issues.findIndex((x) => x.IssueId === data.IssueId);
  const toIndex = targetIndex + diff;
  const changedIssues = moveToNewArrayPosition(issues, targetIndex, toIndex);

  setIssueSortOrders(changedIssues, initialSortOrder);

  // Re-order issues within the collection that are assigned to read orders
  const roQuery = `SELECT * FROM ReadOrderIssue WHERE CollectionId = @CollectionId ORDER BY ReadOrderId, SortOrder`;
  const roIssues = db.prepare(roQuery).all(data) as ReadOrderIssue[];
  setReadOrderIssueSortOrders(changedIssues, roIssues);

  // Perform updates on the issues that were re-ordered during processing
  const updateCI = db.prepare<CollectionIssue>(
    `UPDATE CollectionIssue
        SET SortOrder = @SortOrder
      WHERE CollectionId = @CollectionId
        AND IssueId = @IssueId`
  );
  const updateROI = db.prepare<ReadOrderIssue>(
    `UPDATE ReadOrderIssue
        SET SortOrder = @SortOrder
      WHERE ReadOrderId = @ReadOrderId
        AND CollectionId = @CollectionId
        AND IssueId = @IssueId`
  );

  const updateItems = db.transaction(
    (ciRows: CollectionIssue[], roRows: ReadOrderIssue[]) => {
      for (let row of ciRows) {
        updateCI.run(row);
      }

      for (let row of roRows) {
        updateROI.run(row);
      }
    }
  );

  updateItems(changedIssues, roIssues);
}

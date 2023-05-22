import db from './database';

import { IssueWithTitleInfo } from '@/types/Issue';
import { Collection, CollectionWithIssueCount } from '@/types/Collection';
import {
  CollectionIssue,
  ReOrderCollectionIssuesRequest
} from '@/types/CollectionIssue';

import getStoredProceedure from '@/api/database/storedProceedures';

import {
  toCollectionViewModel,
  toCollectionWithIssuesViewModel
} from './mappers/collection';
import { SORT_ORDER_INCREMENT } from '@/constants';
import { ReOrderDirection } from '@/constants/ReOrderDirection';

import { moveToNewArrayPosition } from './helpers/common';
import setIssueSortOrders from './helpers/setIssueSortOrders';

/* DATEBASE READS */
export function getCollections() {
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

export function getCollectionWithIssues(id: number) {
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

export function insertCollectionIssue(data: CollectionIssue) {
  const query = `SELECT * FROM CollectionIssue WHERE CollectionId = ? ORDER BY SortOrder DESC LIMIT 1`;
  const ci = db.prepare(query).get(data.CollectionId) as CollectionIssue;
  const latestSortOrder = ci?.SortOrder ?? 0;

  db.prepare(
    `INSERT INTO CollectionIssue (CollectionId, IssueId, SortOrder)
     VALUES (@CollectionId, @IssueId, @SortOrder)`
  ).run({ ...data, SortOrder: latestSortOrder + SORT_ORDER_INCREMENT });
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

  // Perform updates on the issues that were re-ordered during processing
  const updateROI = db.prepare<CollectionIssue>(
    `UPDATE CollectionIssue
        SET SortOrder = @SortOrder
      WHERE CollectionId = @CollectionId
        AND IssueId = @IssueId`
  );

  const updateROIs = db.transaction((rows: CollectionIssue[]) => {
    for (let row of rows) {
      updateROI.run(row);
    }
  });

  updateROIs(changedIssues);
}

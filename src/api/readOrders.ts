import db from './database';

import { ReadOrder, ReadOrderWithIssueCount } from '@/types/ReadOrder';
import { IssueWithReadOrderInfo } from '@/types/Issue';
import {
  AddReadOrderIssuesRequest,
  ReadOrderIssue,
  RemoveReadOrderIssuesRequest
} from '@/types/ReadOrderIssue';

import getStoredProceedure from '@/api/database/storedProceedures';

import {
  toReadOrderViewModel,
  toReadOrderWithIssuesViewModel
} from './mappers/readOrder';
import { CollectionIssue } from '@/types/CollectionIssue';

/* DATEBASE READS */
export function getReadOrders() {
  const query = getStoredProceedure('GetReadOrdersWithIssueCount');
  const readOrders = db.prepare(query).all() as ReadOrderWithIssueCount[];

  return readOrders.map(toReadOrderViewModel);
}

export function getReadOrderById(id: number) {
  const readOrder = db
    .prepare(`SELECT * FROM ReadOrder WHERE Id = ?`)
    .get(id) as ReadOrder;

  return toReadOrderViewModel(readOrder);
}

export function getReadOrderWithIssues(id: number) {
  const readOrder = db
    .prepare(`SELECT * FROM ReadOrder WHERE Id = ?`)
    .get(id) as ReadOrder;

  const query = getStoredProceedure('GetIssuesListForReadOrder');
  const issues = db.prepare(query).all(id) as IssueWithReadOrderInfo[];

  return toReadOrderWithIssuesViewModel(readOrder, issues);
}

/* DATABASE WRITES */
export function insertReadOrder(data: Partial<ReadOrder>) {
  const result = db
    .prepare(
      `INSERT INTO ReadOrder (Name)
       VALUES (@Name)`
    )
    .run(data);

  return result.lastInsertRowid as number;
}

export function updateReadOrder(data: Partial<ReadOrder>) {
  db.prepare(
    `
    UPDATE ReadOrder
       SET Name = @Name
     WHERE Id = @Id
    `
  ).run(data);
}

export function insertReadOrderIssues(data: AddReadOrderIssuesRequest) {
  const items: ReadOrderIssue[] = [];

  if (data.CollectionId) {
    const ci = db
      .prepare(`SELECT * FROM CollectionIssue WHERE CollectionId = ?`)
      .all(data.CollectionId) as CollectionIssue[];

    const rois = ci.map((x) => ({
      ReadOrderId: data.ReadOrderId,
      SortOrder: 0,
      ...x
    }));

    items.push(...rois);
  } else if (data.IssueId) {
    items.push({
      ReadOrderId: data.ReadOrderId,
      CollectionId: null,
      IssueId: data.IssueId,
      SortOrder: 0
    });
  } else {
    throw new Error('This should never happen!');
  }

  // TODO
  // Calculate Sort Order from Issue(s) !! This is the question....

  const insertROI = db.prepare<ReadOrderIssue>(
    `INSERT INTO ReadOrderIssue (ReadOrderId, CollectionId, IssueId, SortOrder)
     VALUES (@ReadOrderId, @CollectionId, @IssueId, @SortOrder)`
  );

  const insertROIs = db.transaction((rows: ReadOrderIssue[]) => {
    for (let row of rows) {
      insertROI.run(row);
    }
  });

  insertROIs(items);
}

export function removeReadOrderIssues(data: RemoveReadOrderIssuesRequest) {
  db.prepare(
    `
    DELETE FROM ReadOrderIssue
     WHERE ReadOrderId = @ReadOrderId
       AND (CollectionId = @CollectionId
            OR (CollectionId IS NULL AND IssueId = @IssueId))
    `
  ).run(data);
}

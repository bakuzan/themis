import db from './database';

import { ReadOrder, ReadOrderWithIssueCount } from '@/types/ReadOrder';
import { IssueWithReadOrderInfo } from '@/types/Issue';
import { CollectionIssue } from '@/types/CollectionIssue';
import {
  AddReadOrderIssuesRequest,
  ReOrderReadOrderIssuesRequest,
  ReadOrderIssue,
  RemoveReadOrderIssuesRequest
} from '@/types/ReadOrderIssue';

import getStoredProceedure from '@/api/database/storedProceedures';
import calculateNewReadOrderIssueSortOrder from './helpers/calculateNewReadOrderIssueSortOrder';
import {
  toReadOrderViewModel,
  toReadOrderWithIssuesViewModel
} from './mappers/readOrder';

interface ReadOrderIssueChanges {
  items: ReadOrderIssue[];
  updateItems: ReadOrderIssue[];
}

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

  // process the request ids to create a list of new read order issues
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

  // update the sort order to what the real values
  // should be based on request values
  const updateItems = calculateNewReadOrderIssueSortOrder(data, items);

  // prepare the insert and run in a transactions
  const insertROI = db.prepare<ReadOrderIssue>(
    `INSERT INTO ReadOrderIssue (ReadOrderId, CollectionId, IssueId, SortOrder)
     VALUES (@ReadOrderId, @CollectionId, @IssueId, @SortOrder)`
  );

  const updateROI = db.prepare<ReadOrderIssue>(
    `UPDATE ReadOrderIssue
        SET SortOrder = @SortOrder
      WHERE ReadOrderId = @ReadOrderId
        AND (@CollectionId IS NULL OR CollectionId = @CollectionId)
        AND IssueId = @IssueId`
  );

  const insertAndUpdateROIs = db.transaction(
    (changes: ReadOrderIssueChanges) => {
      const rows = changes.items;
      const updateRows = changes.updateItems;

      for (let newRow of rows) {
        insertROI.run(newRow);
      }

      for (let currentRow of updateRows) {
        updateROI.run(currentRow);
      }
    }
  );

  insertAndUpdateROIs({ items, updateItems });
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

export function reOrderReadOrderIssues(data: ReOrderReadOrderIssuesRequest) {
  // TODO Re-order within a collection
  // If CollectionId and IssueId
  //  > Move Issue in direction requested (within the collection)
  // You only need to get the issues for this collection!
  // TODO Re-order within read order
  // If CollectionId and Not IssueId
  //  > Move Collection in direction request
  // If Not CollectionId and IssueId
  //  > Move Collection in direction request (same as Collection)
  // You need to get all of the issues as follows:
  //  If DOWN, get all from the requested item and below.
  //  If UP, get all from the requested item -1 and below.
}

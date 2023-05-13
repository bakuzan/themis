import db from './database';

import {
  ReadHistoryWithCounts,
  ReadHistoryWithReadOrder,
  ReadHistoryIssue
} from '@/types/ReadHistory';
import { ReadOrderIssue } from '@/types/ReadOrderIssue';

import getStoredProceedure from '@/api/database/storedProceedures';
import {
  toIssueWithReadHistoryInfoViewModel,
  toReadHistoryViewModel,
  toReadHistoryWithCountsViewModel
} from './mappers/readHistory';

interface ReadHistoryIssueInsertProps
  extends Omit<ReadOrderIssue, 'ReadOrderId'> {
  ReadHistoryId: number;
}

/* DATEBASE READS */
export function getReadHistories() {
  const query = getStoredProceedure('GetReadHistoriesWithCounts');
  const readOrders = db.prepare(query).all() as ReadHistoryWithCounts[];

  return readOrders.map(toReadHistoryWithCountsViewModel);
}

export function getReadHistoryById(id: number) {
  const query = getStoredProceedure('GetReadHistoryById');
  const history = db.prepare(query).get(id) as ReadHistoryWithReadOrder;

  return toReadHistoryViewModel(history);
}

export function getReadHistoryIssues(readHistoryId: number) {
  const query = getStoredProceedure('GetIssuesListForReadHistory');
  const issues = db.prepare(query).all(readHistoryId) as ReadHistoryIssue[];

  return issues.map(toIssueWithReadHistoryInfoViewModel);
}

/* DATABASE WRITES */
function insertReadHistory(readOrderId: number) {
  const result = db
    .prepare(
      `INSERT INTO ReadHistory (ReadOrderId)
       VALUES (@readOrderId)`
    )
    .run({ readOrderId });

  return result.lastInsertRowid as number;
}

export function createReadHistoryInstance(readOrderId: number) {
  const readHistoryId = insertReadHistory(readOrderId);

  const insertReadHistoryIssue = db.prepare<ReadHistoryIssueInsertProps>(
    `INSERT INTO ReadHistoryIssue (ReadHistoryId, CollectionId, IssueId, SortOrder)
     VALUES (@ReadHistoryId, @CollectionId, @IssueId, @SortOrder)`
  );

  const getIssues = `SELECT * FROM ReadOrderIssue WHERE ReadOrderId = ? ORDER BY SortOrder, IssueId`;
  const readOrderIssues = db
    .prepare(getIssues)
    .all(readOrderId) as ReadOrderIssue[];

  const insertHistoryIssues = db.transaction((issues: ReadOrderIssue[]) => {
    for (const issue of issues) {
      insertReadHistoryIssue.run({
        ReadHistoryId: readHistoryId,
        ...issue
      });
    }
  });

  insertHistoryIssues(readOrderIssues);

  return readHistoryId;
}

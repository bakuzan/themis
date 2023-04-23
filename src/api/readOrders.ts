import db from './database';

import { ReadOrder, ReadOrderWithIssueCount } from '@/types/ReadOrder';
import { Issue, IssueWithReadOrderInfo } from '@/types/Issue';

import getStoredProceedure from '@/api/database/storedProceedures';

import {
  toReadOrderViewModel,
  toReadOrderWithIssuesViewModel
} from './mappers/readOrder';

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

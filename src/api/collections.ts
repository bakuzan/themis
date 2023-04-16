import db from './database';

import { IssueWithTitleInfo } from '@/types/Issue';
import { Collection, CollectionWithIssueCount } from '@/types/Collection';

import getStoredProceedure from '@/api/database/storedProceedures';

import {
  toCollectionViewModel,
  toCollectionWithIssuesViewModel
} from './mappers/collection';

/* DATEBASE READS */
export function getCollections() {
  const query = getStoredProceedure('GetCollectionsWithIssueCount');
  const titles = db.prepare(query).all() as CollectionWithIssueCount[];

  return titles.map(toCollectionViewModel);
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

import db from './db';

import { Title, TitleWithIssueCount } from '@/types/Title';
import { Issue } from '@/types/Issue';

import getStoredProceedure from '@/database/storedProceedures';
import {
  toTitleViewModel,
  toTitleWithIssuesViewModel
} from '@/database/mappers/title';

/* DATEBASE READS */
export function getTitles() {
  const query = getStoredProceedure('GetTitlesWithIssueCount');
  const titles = db.prepare(query).all() as TitleWithIssueCount[];

  return titles.map(toTitleViewModel);
}

export async function getTitleById(id: number) {
  const title = db.prepare(`SELECT * FROM Title WHERE Id = ?`).get(id) as Title;

  return toTitleViewModel(title);
}

export async function getTitleWithIssues(id: number) {
  const title = db.prepare(`SELECT * FROM Title WHERE Id = ?`).get(id) as Title;

  const query = getStoredProceedure('GetIssuesListForTitle');
  const issues = db.prepare(query).all(id) as Issue[];

  return toTitleWithIssuesViewModel(title, issues);
}

/* DATABASE WRITES */
export function insertTitle(data: Partial<Title>) {
  const result = db
    .prepare(
      `INSERT INTO Title (Name, StartYear, IsOneShot)
       VALUES (@Name, @StartYear, @IsOneShot)`
    )
    .run(data);

  return result.lastInsertRowid as number;
}

export function updateTitle(data: Partial<Title>) {
  db.prepare(
    `
    UPDATE Title
       SET Name = @Name
         , StartYear = @StartYear
         , IsOneShot = @IsOneShot
     WHERE Id = @Id
    `
  ).run(data);
}

import db from './database';

import { Issue, IssueWithTitleInfo } from '@/types/Issue';

import getStoredProceedure from './database/storedProceedures';
import { toIssueWithTitleInfoViewModel } from './mappers/issue';

/* DATABASE READS */
export function getIssuesWithTitleInfo() {
  const issues = db
    .prepare(getStoredProceedure('GetIssuesListWithTitleInfo'))
    .all() as IssueWithTitleInfo[];

  return issues.map(toIssueWithTitleInfoViewModel);
}

/* DATABASE WRITES */
export function insertIssue(data: Partial<Issue>) {
  const result = db
    .prepare(
      `INSERT INTO Issue (TitleId, Number, Name, CoverDate, IsAnnual)
       VALUES (@TitleId, @Number, @Name, @CoverDate, @IsAnnual)`
    )
    .run(data);

  return result.lastInsertRowid as number;
}

export function updateIssue(data: Partial<Issue>) {
  db.prepare(
    `
    UPDATE Issue
       SET TitleId = @TitleId
         , Number = @Number
         , Name = @Name
         , CoverDate = @CoverDate
         , IsAnnual = @IsAnnual
     WHERE Id = @Id
    `
  ).run(data);
}

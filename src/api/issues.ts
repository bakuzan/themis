import db from './database';

import { Issue } from '@/types/Issue';

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

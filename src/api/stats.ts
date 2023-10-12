import db from './database';

import { IssueRepeat, MonthIssueCount } from '@/types/Stats';

import getStoredProceedure from '@/api/database/storedProceedures';
import {
  toMonthIssueCountViewModel,
  toIssueRepeatViewModel
} from '@/api/mappers/stats';
import fillMissingMonths from './helpers/fillMissingMonths';

/* DATEBASE READS */
export function getIssueCountsPerMonth() {
  const query = getStoredProceedure('Stats_GetIssueCountPerMonth');
  const monthCounts = db.prepare(query).all() as MonthIssueCount[];

  return Array.from(
    fillMissingMonths(monthCounts.map(toMonthIssueCountViewModel)).entries()
  );
}

/**
 * Gets a list of Issues including the number of times read
 * and the last date each was read.
 * Currently limited to 'top 10'; Consider paging.
 *
 * @returns IssueRepeatViewModel[]
 */
export function getIssueRepeatsCounts() {
  // TODO implement paging?
  const query = getStoredProceedure('Stats_GetIssueRepeatsCounts');
  const issueRepeats = db
    .prepare(query)
    .all({ limit: 10, offset: 0 }) as IssueRepeat[];

  return issueRepeats.map(toIssueRepeatViewModel);
}

import db from './db';

import {
  IssueReadDetailInfo,
  IssueRepeat,
  MonthIssueCount,
  IssueRepeatDetailItem
} from '@/types/Stats';

import getStoredProceedure from '@/database/storedProceedures';
import {
  toMonthIssueCountViewModel,
  toIssueRepeatViewModel,
  toIssueReadDetailViewModel,
  toIssueRepeatDetailViewModel
} from '@/database/mappers/stats';
import fillMissingMonths from './helpers/fillMissingMonths';

/* DATEBASE READS */
export async function getIssueCountsPerMonth() {
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
export async function getIssueRepeatsCounts() {
  // TODO implement paging?
  const query = getStoredProceedure('Stats_GetIssueRepeatsCounts');
  const issueRepeats = db
    .prepare(query)
    .all({ limit: 10, offset: 0 }) as IssueRepeat[];

  return issueRepeats.map(toIssueRepeatViewModel);
}

export function getMonthCountDetailItems(monthOrYearKey: string) {
  const query = getStoredProceedure('Stats_GetIssuesForYearMonthKey');
  const issueReadDetails = db
    .prepare(query)
    .all({ monthKey: monthOrYearKey }) as IssueReadDetailInfo[];

  return issueReadDetails.map(toIssueReadDetailViewModel);
}

export function getIssueRepeatDetailItems(issueId: number) {
  const query = getStoredProceedure('Stats_GetIssueRepeatDetailItems');
  const issueRepeatDetails = db
    .prepare(query)
    .all({ issueId }) as IssueRepeatDetailItem[];

  return issueRepeatDetails.map(toIssueRepeatDetailViewModel);
}

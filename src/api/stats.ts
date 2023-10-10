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

export function getIssueRepeatsCounts() {
  const query = getStoredProceedure('Stats_GetIssueRepeatsCounts');
  const issueRepeats = db.prepare(query).all() as IssueRepeat[];

  return issueRepeats.map(toIssueRepeatViewModel); // TODO change number[]'s to Item[]'s
}

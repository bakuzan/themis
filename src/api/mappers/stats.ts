import {
  IssueRepeat,
  IssueRepeatViewModel,
  MonthIssueCount,
  MonthIssueCountViewModel
} from '@/types/Stats';
import { splitDelimitedToNumbers } from '@/api/helpers/common';

export function toMonthIssueCountViewModel(
  monthCount: MonthIssueCount
): MonthIssueCountViewModel {
  const parts = monthCount.ReadInMonth.split('-').map((x) => Number(x));
  const [year, monthNumber] = parts;

  return {
    count: monthCount.IssueCount,
    monthKey: monthCount.ReadInMonth,
    monthNumber,
    year
  };
}

export function toIssueRepeatViewModel(
  issueRepeat: IssueRepeat
): IssueRepeatViewModel {
  return {
    readHistoryIds: splitDelimitedToNumbers(issueRepeat.ReadHistoryIds),
    collectionIds: splitDelimitedToNumbers(issueRepeat.CollectionIds),
    issueId: issueRepeat.IssueId,
    instanceCount: issueRepeat.InstanceCount,
    lastReadDate: issueRepeat.LastReadDate,
    issueNumber: issueRepeat.IssueNumber,
    isAnnual: issueRepeat.IsAnnual === 1,
    issueName: issueRepeat.IssueName,
    issueCoverDate: issueRepeat.IssueCoverDate,
    titleId: issueRepeat.TitleId,
    titleName: issueRepeat.TitleName,
    titleStartYear: Number(issueRepeat.TitleStartYear),
    isOneShot: issueRepeat.IsOneShot === 1
  };
}

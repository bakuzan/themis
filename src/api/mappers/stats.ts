import {
  IssueReadDetailViewModel,
  IssueReadDetailInfo,
  IssueRepeat,
  IssueRepeatViewModel,
  MonthIssueCount,
  MonthIssueCountViewModel,
  IssueRepeatDetailViewModel,
  IssueRepeatDetailItem
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

export function toIssueReadDetailViewModel(
  issue: IssueReadDetailInfo
): IssueReadDetailViewModel {
  return {
    issueId: issue.Id,
    issueNumber: issue.Number,
    issueName: issue.Name,
    issueCoverDate: issue.CoverDate,
    readOnDate: issue.ReadOnDate,
    titleId: issue.TitleId,
    titleName: issue.TitleName,
    titleStartYear: Number(issue.StartYear),
    isOneShot: issue.IsOneShot === 1,
    isAnnual: issue.IsAnnual === 1
  };
}

export function toIssueRepeatDetailViewModel(
  issue: IssueRepeatDetailItem
): IssueRepeatDetailViewModel {
  return {
    readHistoryId: issue.ReadHistoryId,
    readOrderName: issue.ReadOrderName,
    readOnDate: issue.ReadOnDate,

    collectionId: issue.CollectionId,
    collectionName: issue.CollectionName,
    collectionNumber: issue.CollectionNumber,
    publicationDate: Number(issue.PublicationDate),

    issueId: issue.IssueId
  };
}

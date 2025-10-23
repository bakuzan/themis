import {
  ReadHistoryWithReadOrder,
  ReadHistoryViewModel,
  ReadHistoryWithCounts,
  ReadHistoryWithCountsViewModel
} from '@/types/ReadHistory';
import {
  ReadHistoryIssue,
  ReadHistoryIssueInfoViewModel
} from '@/types/ReadHistoryIssue';

export function toReadHistoryViewModel(
  history: ReadHistoryWithReadOrder
): ReadHistoryViewModel {
  return {
    id: history.Id,
    readOrderId: history.ReadOrderId,
    readOrderName: history.ReadOrderName,
    startedOnDate: history.StartedOnDate,
    completedOnDate: history.CompletedOnDate
  };
}

export function toReadHistoryWithCountsViewModel(
  history: ReadHistoryWithCounts
): ReadHistoryWithCountsViewModel {
  return {
    ...toReadHistoryViewModel(history),
    totalIssueCount: history.TotalIssueCount,
    readIssueCount: history.ReadIssueCount
  };
}

/* Read History Issue */
export function toIssueWithReadHistoryInfoViewModel(
  issue: ReadHistoryIssue,
  _: number,
  arr: ReadHistoryIssue[]
): ReadHistoryIssueInfoViewModel {
  const issueList = arr.filter((x) => x.IssueId === issue.IssueId);
  const isRepeatedIssue = issueList.length > 1;

  return {
    readHistoryId: issue.ReadHistoryId,
    readOnDate: issue.ReadOnDate,
    // ReadOrderIssue
    readOrderId: issue.ReadOrderId,
    sortOrder: issue.SortOrder,
    // Collection
    collectionId: issue.CollectionId,
    collectionName: issue.CollectionName,
    collectionNumber: issue.CollectionNumber,
    publicationDate: Number(issue.PublicationDate),
    // Title
    titleId: issue.TitleId,
    titleName: issue.TitleName,
    startYear: Number(issue.StartYear),
    isOneShot: issue.IsOneShot === 1,
    // Issue
    issueId: issue.IssueId,
    number: issue.Number,
    name: issue.Name,
    isAnnual: issue.IsAnnual === 1,
    coverDate: issue.CoverDate,
    // Derived
    isRepeatedIssue,
    issueInstanceIndex: isRepeatedIssue
      ? issueList.findIndex(
          (x) =>
            x.CollectionId === issue.CollectionId && x.IssueId === issue.IssueId
        )
      : 0
  };
}

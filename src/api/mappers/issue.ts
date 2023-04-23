import {
  Issue,
  IssueViewModel,
  IssueWithReadOrderInfo,
  IssueWithReadOrderInfoViewModel,
  IssueWithTitleInfo,
  IssueWithTitleInfoViewModel
} from '@/types/Issue';

export function toIssueViewModel(issue: Issue): IssueViewModel {
  return {
    id: issue.Id,
    number: issue.Number,
    name: issue.Name,
    coverDate: issue.CoverDate,
    titleId: issue.TitleId,
    isAnnual: issue.IsAnnual === 1
  };
}

export function toIssueWithTitleInfoViewModel(
  issue: IssueWithTitleInfo
): IssueWithTitleInfoViewModel {
  return {
    id: issue.Id,
    number: issue.Number,
    name: issue.Name,
    coverDate: issue.CoverDate,
    titleId: issue.TitleId,
    isAnnual: issue.IsAnnual === 1,
    // Title Info
    titleName: issue.TitleName,
    startYear: Number(issue.StartYear),
    isOneShot: issue.IsOneShot === 1
  };
}

export function toIssueWithReadOrderInfoViewModel(
  issue: IssueWithReadOrderInfo
): IssueWithReadOrderInfoViewModel {
  return {
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
    coverDate: issue.CoverDate
  };
}

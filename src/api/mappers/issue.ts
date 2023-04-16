import {
  Issue,
  IssueViewModel,
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

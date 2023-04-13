import { Issue, IssueViewModel } from '@/types/Issue';

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

import {
  Title,
  TitleViewModel,
  TitleWithIssueCount,
  TitleWithIssuesViewModel
} from '@/types/Title';
import { Issue } from '@/types/Issue';
import { toIssueViewModel } from './issue';

export function toTitleViewModel(
  title: Title | TitleWithIssueCount
): TitleViewModel {
  return {
    id: title.Id,
    name: title.Name,
    startYear: Number(title.StartYear),
    isOneShot: title.IsOneShot === 1,
    issueCount: 'IssueCount' in title ? title.IssueCount : null
  };
}

export function toTitleWithIssuesViewModel(
  title: Title,
  issues: Issue[]
): TitleWithIssuesViewModel {
  return {
    id: title.Id,
    name: title.Name,
    startYear: Number(title.StartYear),
    isOneShot: title.IsOneShot === 1,
    issueCount: issues.length,
    issues: issues.map(toIssueViewModel)
  };
}

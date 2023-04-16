import { IssueViewModel } from '@/types/Issue';

export default function getFormattedIssueNumber<T extends IssueViewModel>(
  issue: T
) {
  return '#' + `${issue.number}`.padStart(issue.isAnnual ? 2 : 4, '0');
}

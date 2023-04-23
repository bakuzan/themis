import { IssueViewModel } from '@/types/Issue';

type IssueLike = Pick<IssueViewModel, 'number' | 'isAnnual'>;

export default function getFormattedIssueNumber(issue: IssueLike) {
  return '#' + `${issue.number}`.padStart(issue.isAnnual ? 2 : 4, '0');
}

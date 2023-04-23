import {
  IssueViewModel,
  IssueWithReadOrderInfoViewModel,
  IssueWithTitleInfoViewModel
} from '@/types/Issue';
import getFormattedIssueNumber from '@/utils/getFormattedIssueNumber';
import getCollectionFullName from '@/utils/getCollectionFullName';

// TODO consider splitting search term on spaces...

export function filterReadOrderIssues(searchStringLower: string) {
  return (x: IssueWithReadOrderInfoViewModel) =>
    x.titleName.toLowerCase().includes(searchStringLower) ||
    `${x.startYear}`.includes(searchStringLower) ||
    getCollectionFullName(x)?.toLowerCase().includes(searchStringLower) ||
    x.name.toLowerCase().includes(searchStringLower) ||
    x.coverDate.includes(searchStringLower) ||
    getFormattedIssueNumber(x).includes(searchStringLower);
}

export function filterCollectionIssues(searchStringLower: string) {
  return (x: IssueWithTitleInfoViewModel) =>
    x.titleName.toLowerCase().includes(searchStringLower) ||
    `${x.startYear}`.includes(searchStringLower) ||
    x.name.toLowerCase().includes(searchStringLower) ||
    x.coverDate.includes(searchStringLower) ||
    getFormattedIssueNumber(x).includes(searchStringLower);
}

export function filterTitleIssues(searchStringLower: string) {
  return (x: IssueViewModel) =>
    x.name.toLowerCase().includes(searchStringLower) ||
    x.coverDate.includes(searchStringLower) ||
    getFormattedIssueNumber(x).includes(searchStringLower);
}

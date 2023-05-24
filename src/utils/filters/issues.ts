import {
  IssueViewModel,
  IssueWithReadOrderInfoViewModel,
  IssueWithTitleInfoViewModel
} from '@/types/Issue';
import { ReadHistoryIssueInfoViewModel } from '@/types/ReadHistoryIssue';

import getFormattedIssueNumber from '@/utils/getFormattedIssueNumber';
import getCollectionFullName from '@/utils/getCollectionFullName';

// TODO consider splitting search term on spaces...
export function filterReadHistoryIssues(searchStringLower: string) {
  return (x: ReadHistoryIssueInfoViewModel) =>
    x.titleName.toLowerCase().includes(searchStringLower) ||
    `${x.startYear}`.includes(searchStringLower) ||
    getCollectionFullName(x)?.toLowerCase().includes(searchStringLower) ||
    x.name.toLowerCase().includes(searchStringLower) ||
    x.coverDate.includes(searchStringLower) ||
    getFormattedIssueNumber(x).includes(searchStringLower);
}

export function filterReadOrderIssueOnUniqueCollection(
  issue: IssueWithReadOrderInfoViewModel,
  index: number,
  arr: IssueWithReadOrderInfoViewModel[]
) {
  // if there is no collection the loose issue needs to be included.
  if (!issue.collectionId) {
    return true;
  }

  // only keep the first issue of a collection as source of information
  const collectionIndex = arr.findIndex(
    (x) => x.collectionId === issue.collectionId
  );

  return collectionIndex === index;
}

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

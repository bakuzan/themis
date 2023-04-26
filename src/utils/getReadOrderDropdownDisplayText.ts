import { IssueWithReadOrderInfoViewModel } from '@/types/Issue';

import getCollectionFullName from './getCollectionFullName';
import getFormattedIssueNumber from './getFormattedIssueNumber';

export default function getReadOrderDropdownDisplayText(
  readOrderIssue: IssueWithReadOrderInfoViewModel
) {
  // if no collection, display the issue information
  if (!readOrderIssue.collectionId) {
    const issueNumber = getFormattedIssueNumber(readOrderIssue);
    const suffix = readOrderIssue.isOneShot ? ' (One Shot)' : '';
    return `${readOrderIssue.titleName} ${issueNumber}${suffix}`;
  }

  // otherwise, use the collection information
  return getCollectionFullName({
    collectionName: readOrderIssue.collectionName,
    collectionNumber: readOrderIssue.collectionNumber
  });
}

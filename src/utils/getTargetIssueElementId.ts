import { ReadHistoryIssueInfoViewModel } from '@/types/ReadHistoryIssue';

export default function getTargetIssueElementId(
  item: ReadHistoryIssueInfoViewModel
) {
  const prefix = item.collectionId ? 'COLLECTION' : 'ISSUE';
  const ending = item.collectionId ? '' : `_${item.issueId}`;
  return `${prefix}_${item.collectionId}${ending}`;
}

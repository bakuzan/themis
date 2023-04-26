export const ReadOrderIssueKeyPrefix = 'ROI';

type ReadOrderIssueLike = {
  collectionId: number | null;
  issueId: number;
};

export default function getReadOrderIssueKey(
  readOrderIssue: ReadOrderIssueLike
) {
  return `${ReadOrderIssueKeyPrefix}_${readOrderIssue.collectionId}_${readOrderIssue.issueId}`;
}

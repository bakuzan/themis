export const ReadOrderIssueKeyPrefix = 'ROI';

type ReadOrderIssueLike = {
  collectionId: number | null;
  issueId: number;
};

export function getReadOrderIssueKey(readOrderIssue: ReadOrderIssueLike) {
  return `${ReadOrderIssueKeyPrefix}_${readOrderIssue.collectionId}_${readOrderIssue.issueId}`;
}

export function getFirstReadOrderIssueKey(
  readOrderIssues: ReadOrderIssueLike[]
) {
  return getReadOrderIssueKey(readOrderIssues[0]);
}

export function getLastReadOrderIssueKey(
  readOrderIssues: ReadOrderIssueLike[]
) {
  const lastIssue = readOrderIssues[readOrderIssues.length - 1];

  if (!lastIssue.collectionId) {
    return getReadOrderIssueKey(lastIssue);
  }

  const lastCollectionSensitiveIssue = readOrderIssues.find(
    (r) => r.collectionId === lastIssue.collectionId
  );

  if (!lastCollectionSensitiveIssue) {
    throw new Error(
      'This will never happen. No read order issue for that collection id was found!'
    );
  }

  return getReadOrderIssueKey(lastCollectionSensitiveIssue);
}

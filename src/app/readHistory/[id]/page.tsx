import { getReadHistoryById, getReadHistoryIssues } from '@/api/readHistory';

import ReadHistoryView from '@/components/pages/ReadHistoryView';
import createCollectionCountMap from '@/utils/createCollectionCountMap';
import { findLastIndex } from '@/utils/findLastIndex';

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const readHistoryId = Number(params.id);
  const item = await getReadHistoryById(readHistoryId);
  const issues = await getReadHistoryIssues(readHistoryId);
  const countMap = createCollectionCountMap(issues);

  const mostRecentReadIndex = findLastIndex(
    issues,
    (x) => x.readOnDate !== null
  );

  return (
    <ReadHistoryView
      item={item}
      issues={issues}
      nextIssueToRead={issues[mostRecentReadIndex + 1] ?? null}
      collectionIssueCounts={Array.from(countMap.entries())}
    />
  );
}

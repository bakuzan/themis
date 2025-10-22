import { PageProps } from '@/types/PageProps';

import { getReadOrderWithIssues } from '@/api/readOrders';
import { getCollectionsForDropdown } from '@/api/collections';
import { getIssuesWithoutACollection } from '@/api/issues';

import ReadOrderView from '@/components/pages/ReadOrderView';

import {
  getFirstReadOrderIssueKey,
  getLastReadOrderIssueKey
} from '@/utils/getReadOrderIssueKey';
import createCollectionCountMap from '@/utils/createCollectionCountMap';

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const item = await getReadOrderWithIssues(Number(id));
  const collections = await getCollectionsForDropdown();
  const issues = await getIssuesWithoutACollection();

  const readOrderIssues = item.issues;
  const firstROIKey = getFirstReadOrderIssueKey(readOrderIssues);
  const lastROIKey = getLastReadOrderIssueKey(readOrderIssues);
  const countMap = createCollectionCountMap(readOrderIssues);
  const collectionIssueCounts = Array.from(countMap.entries());

  return (
    <ReadOrderView
      item={item}
      collections={collections}
      issues={issues}
      firstROIKey={firstROIKey}
      lastROIKey={lastROIKey}
      collectionIssueCounts={collectionIssueCounts}
    />
  );
}

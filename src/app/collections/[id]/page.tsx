import { PageProps } from '@/types/PageProps';

import { getCollectionWithIssues } from '@/database/collections';
import { getIssuesWithTitleInfo } from '@/database/issues';
import { getReadOrdersAssociatedWithCollection } from '@/database/readOrders';

import CollectionView from '@/components/pages/CollectionView';

import getCollectionFullName from '@/utils/getCollectionFullName';
import getPageTitle from '@/utils/getPageTitle';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const collectionId = Number(id);
  const item = await getCollectionWithIssues(collectionId);
  const pageTitle = getCollectionFullName(item);

  return {
    title: getPageTitle(pageTitle)
  };
}

export default async function CollectionPage({
  params,
  searchParams
}: PageProps) {
  const { id } = await params;
  const { titleId } = (await searchParams) ?? {};
  const collectionId = Number(id);
  const maybeTitleId = titleId ? Number(titleId) : null;

  const item = await getCollectionWithIssues(collectionId);
  const issues = await getIssuesWithTitleInfo(maybeTitleId);
  const readOrders = await getReadOrdersAssociatedWithCollection(collectionId);

  return <CollectionView item={item} issues={issues} readOrders={readOrders} />;
}

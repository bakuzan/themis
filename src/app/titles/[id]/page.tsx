import { getTitleWithIssues } from '@/api/titles';
import { PageProps } from '@/types/PageProps';

import TitleView from '@/components/pages/TitleView';
import getPageTitle from '@/utils/getPageTitle';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const data = await getTitleWithIssues(Number(id));
  const pageTitle = `${data.name} (${data.startYear})`;

  return {
    title: getPageTitle(pageTitle)
  };
}

export default async function TitleViewPage({ params }: PageProps) {
  const { id } = await params;
  const data = await getTitleWithIssues(Number(id));

  return <TitleView item={data} />;
}

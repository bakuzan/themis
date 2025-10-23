import { getTitles } from '@/database/titles';

import Titles from '@/components/pages/TitlesPage';
import getPageTitle from '@/utils/getPageTitle';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: getPageTitle('Titles')
};

export default async function TitlesPage() {
  const items = await getTitles();

  return <Titles items={items} />;
}

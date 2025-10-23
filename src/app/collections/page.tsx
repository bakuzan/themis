import { getCollections } from '@/database/collections';

import CollectionsPage from '@/components/pages/CollectionsPage';
import getPageTitle from '@/utils/getPageTitle';

export const metadata = {
  title: getPageTitle('Collections')
};

export default async function Collections() {
  const items = await getCollections();

  return <CollectionsPage items={items} />;
}

import { getReadOrders } from '@/api/readOrders';

import ReadOrdersPage from '@/components/pages/ReadOrdersPage';
import getPageTitle from '@/utils/getPageTitle';

export const metadata = {
  title: getPageTitle('Read Orders')
};

export default async function ReadOrders() {
  const items = await getReadOrders();

  return <ReadOrdersPage items={items} />;
}

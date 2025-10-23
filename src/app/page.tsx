import { getReadHistories } from '@/database/readHistory';
import { getReadOrders } from '@/database/readOrders';

import HomePage from '@/components/pages/HomePage';
import getPageTitle from '@/utils/getPageTitle';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: getPageTitle('Home')
};

export default async function Home() {
  const readHistoryList = await getReadHistories();
  const readOrders = await getReadOrders();

  return <HomePage readOrders={readOrders} readHistoryList={readHistoryList} />;
}

import { getIssueCountsPerMonth, getIssueRepeatsCounts } from '@/api/stats';

import Statistics from '@/components/pages/Statistics';
import getPageTitle from '@/utils/getPageTitle';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: getPageTitle('Statistics')
};

export default async function Stats() {
  const monthHistoryCounts = await getIssueCountsPerMonth();
  const issueRepeats = await getIssueRepeatsCounts();

  return (
    <Statistics
      monthHistoryCounts={monthHistoryCounts}
      issueRepeats={issueRepeats}
    />
  );
}

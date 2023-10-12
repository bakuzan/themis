import { getIssueCountsPerMonth, getIssueRepeatsCounts } from '@/api/stats';
import { IssueRepeatViewModel, MonthIssueCountViewModel } from '@/types/Stats';

import PageHead from '@/components/PageHead';
import MonthCountsTable from '@/components/MonthCountsTable';

import styles from './index.module.css';

interface StatsPageProps {
  monthHistoryCounts: [number, MonthIssueCountViewModel[]][];
  issueRepeats: IssueRepeatViewModel[];
}

const metadata = {
  title: 'Statistics'
};

export default function Stats(props: StatsPageProps) {
  // TODO create two tables
  // One for each set of information
  console.log('<Stats> :: ', { ...props });
  return (
    <section>
      <PageHead title={metadata.title} />
      <header className="header">
        <h1>{metadata.title}</h1>
      </header>
      <div>
        <MonthCountsTable data={props.monthHistoryCounts} />
        <br />
      </div>
    </section>
  );
}

export async function getServerSideProps() {
  const monthHistoryCounts = getIssueCountsPerMonth();
  const issueRepeats = getIssueRepeatsCounts();

  return {
    props: { monthHistoryCounts, issueRepeats }
  };
}

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getIssueCountsPerMonth, getIssueRepeatsCounts } from '@/api/stats';
import { IssueRepeatViewModel, MonthIssueCountViewModel } from '@/types/Stats';

import PageHead from '@/components/PageHead';
import MonthCountsTable from '@/components/MonthCountsTable';
import TopIssueRepeats from '@/components/TopIssueRepeats';

import styles from './index.module.css';

interface StatsPageProps {
  monthHistoryCounts: [number, MonthIssueCountViewModel[]][];
  issueRepeats: IssueRepeatViewModel[];
}

const metadata = {
  title: 'Statistics'
};

export default function Stats(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  console.log('<Stats> :: ', { ...props });
  return (
    <section>
      <PageHead title={metadata.title} />
      <header className="header">
        <h1>{metadata.title}</h1>
      </header>
      <div className={styles.sections}>
        <MonthCountsTable data={props.monthHistoryCounts} />
        <TopIssueRepeats data={props.issueRepeats} />
      </div>
    </section>
  );
}

export const getServerSideProps = (async () => {
  const monthHistoryCounts = getIssueCountsPerMonth();
  const issueRepeats = getIssueRepeatsCounts();

  return {
    props: { monthHistoryCounts, issueRepeats }
  };
}) satisfies GetServerSideProps<StatsPageProps>;

'use client';
import { useState } from 'react';
import { IssueRepeatViewModel, MonthIssueCountViewModel } from '@/types/Stats';

import MonthCountsTable from '@/components/MonthCountsTable';
import MonthCountsDetail from '@/components/MonthCountsTable/MonthCountsDetail';
import TopIssueRepeats from '@/components/TopIssueRepeats';

import styles from './Statistics.module.css';

interface StatsPageProps {
  monthHistoryCounts: [number, MonthIssueCountViewModel[]][];
  issueRepeats: IssueRepeatViewModel[];
}

export default function Statistics({
  monthHistoryCounts,
  issueRepeats
}: StatsPageProps) {
  const [monthDetailKey, setMonthCountDetailKey] = useState<string | null>(
    null
  );

  return (
    <section>
      <header className="header">
        <h1>Statistics</h1>
      </header>
      <div className={styles.sections}>
        <MonthCountsTable
          data={monthHistoryCounts}
          onSelect={(key) => setMonthCountDetailKey(key)}
        />
        <MonthCountsDetail filterKey={monthDetailKey} />
        <TopIssueRepeats data={issueRepeats} />
      </div>
    </section>
  );
}

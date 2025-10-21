'use client';
import { useState } from 'react';
import Link from 'next/link';

import { ReadOrderViewModel } from '@/types/ReadOrder';
import { ReadHistoryWithCountsViewModel } from '@/types/ReadHistory';

import ReadHistoryForm from '@/components/Forms/ReadHistoryForm';
import SearchBox from '@/components/SearchBox';
import { filterReadHistory } from '@/utils/filters/readHistory';
import getDifferenceBetweenDates from '@/utils/getDifferenceBetweenDates';
import classNames from '@/utils/classNames';

import styles from './homePage.module.css';

interface HomePageProps {
  readHistoryList: ReadHistoryWithCountsViewModel[];
  readOrders: ReadOrderViewModel[];
}

export default function HomePage({
  readOrders,
  readHistoryList
}: HomePageProps) {
  const [searchString, setSearchString] = useState('');
  const searchStringLower = searchString.toLowerCase();
  const historyList = readHistoryList.filter(
    filterReadHistory(searchStringLower)
  );

  return (
    <section>
      <header className="header">
        <h1>Home</h1>
      </header>
      <div className={styles.formContainer}>
        <ReadHistoryForm
          method="POST"
          action={`/api/readHistory/new`}
          readOrders={readOrders}
        />
      </div>
      <div>
        <SearchBox
          value={searchString}
          onChange={(text) => setSearchString(text)}
        />
        <ul className={styles.list}>
          {historyList.map((x) => {
            const percentageRead = `${Math.round(
              (x.readIssueCount / x.totalIssueCount) * 100
            )}%`;
            const dateDiff = getDifferenceBetweenDates(
              x.startedOnDate,
              x.completedOnDate
            );

            return (
              <li key={x.id} className={styles.list__item}>
                <div className={styles.nameWrapper}>
                  <Link
                    className={styles.itemName}
                    href={`/readHistory/${x.id}`}
                  >
                    {x.readOrderName}&nbsp;
                  </Link>
                  <span className="muted" title={percentageRead}>
                    {x.readIssueCount}/{x.totalIssueCount}
                  </span>
                </div>
                <div className={classNames('muted', styles.dates)}>
                  <span>{x.startedOnDate}</span>
                  <span>&nbsp;to&nbsp;</span>
                  <span>
                    {x.completedOnDate ? x.completedOnDate : 'present'}
                  </span>
                  <span title={dateDiff.details}>&nbsp;{dateDiff.text}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';

import { ReadOrderViewModel } from '@/types/ReadOrder';
import { ReadHistoryWithCountsViewModel } from '@/types/ReadHistory';

import { getReadHistories } from '@/api/readHistory';
import { getReadOrders } from '@/api/readOrders';

import ReadHistoryForm from '@/components/Forms/ReadHistoryForm';
import PageHead from '@/components/PageHead';
import SearchBox from '@/components/SearchBox';
import { filterReadHistory } from '@/utils/filters/readHistory';
import getDifferenceBetweenDates from '@/utils/getDifferenceBetweenDates';

import styles from './index.module.css';
import classNames from '@/utils/classNames';

interface HomePageProps {
  readHistoryList: ReadHistoryWithCountsViewModel[];
  readOrders: ReadOrderViewModel[];
}

const metadata = {
  title: 'Home'
};

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [searchString, setSearchString] = useState('');
  const searchStringLower = searchString.toLowerCase();
  const historyList = props.readHistoryList.filter(
    filterReadHistory(searchStringLower)
  );

  return (
    <section>
      <PageHead title={metadata.title} />
      <header className="header">
        <h1>{metadata.title}</h1>
      </header>
      <div className={styles.formContainer}>
        <ReadHistoryForm
          method="POST"
          action={`/api/readHistory/new`}
          readOrders={props.readOrders}
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

export const getServerSideProps = (async () => {
  const readHistoryList = getReadHistories();
  const readOrders = getReadOrders();

  return {
    props: { readHistoryList, readOrders }
  };
}) satisfies GetServerSideProps<HomePageProps>;

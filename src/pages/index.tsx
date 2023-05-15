import { useState } from 'react';
import Link from 'next/link';

import { ReadOrderViewModel } from '@/types/ReadOrder';
import { ReadHistoryWithCountsViewModel } from '@/types/ReadHistory';

import { getReadHistories } from '@/api/readHistory';
import { getReadOrders } from '@/api/readOrders';

import ReadHistoryForm from '@/components/Forms/ReadHistoryForm';
import PageHead from '@/components/PageHead';
import SearchBox from '@/components/SearchBox';
import { filterReadHistory } from '@/utils/filters/readHistory';

import styles from './index.module.css';

interface HomePageProps {
  readHistoryList: ReadHistoryWithCountsViewModel[];
  readOrders: ReadOrderViewModel[];
}

const metadata = {
  title: 'Home'
};

export default function Home(props: HomePageProps) {
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

      <div>
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
          {historyList.map((x) => (
            <li key={x.id} className={styles.list__item}>
              <div className={styles.nameWrapper}>
                <Link href={`/readHistory/${x.id}`}>{x.readOrderName}</Link>
                <span className="muted">&nbsp;{x.readIssueCount}</span>/
                <span className="muted">{x.totalIssueCount}</span>
              </div>
              <div className="muted">
                <span>{x.startedOnDate}</span>
                <span>&nbsp;to&nbsp;</span>
                <span>{x.completedOnDate ? x.completedOnDate : 'present'}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export async function getServerSideProps() {
  const readHistoryList = getReadHistories();
  const readOrders = getReadOrders();

  return {
    props: { readHistoryList, readOrders }
  };
}

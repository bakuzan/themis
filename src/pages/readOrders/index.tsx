import { useState } from 'react';
import Link from 'next/link';

import { getReadOrders } from '@/api/readOrders';
import { ReadOrderViewModel } from '@/types/ReadOrder';

import PageHead from '@/components/PageHead';
import SearchBox from '@/components/SearchBox';

import styles from './index.module.css';

interface ReadOrdersProps {
  items: ReadOrderViewModel[];
}

const metadata = {
  title: 'Read Orders'
};

export default function ReadOrders(props: ReadOrdersProps) {
  const [searchString, setSearchString] = useState('');
  const searchStringLower = searchString.toLowerCase();
  const readOrders = props.items.filter((x) =>
    x.name.toLowerCase().includes(searchStringLower)
  );

  return (
    <section>
      <PageHead title={metadata.title} />
      <header className="header">
        <h1>{metadata.title}</h1>
        <div>
          <Link href="/readOrders/new">Create New Read Order</Link>
        </div>
      </header>
      <div>
        <SearchBox
          value={searchString}
          onChange={(text) => setSearchString(text)}
        />
        <ul className={styles.list}>
          {readOrders.map((x) => (
            <li key={x.id} className={styles.list__item}>
              <div className={styles.nameWrapper}>
                <Link className={styles.itemName} href={`/readOrders/${x.id}`}>
                  {x.name}
                </Link>
              </div>
              <div className="muted">
                {x.issueCount} {x.issueCount === 1 ? 'issue' : 'issues'}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export async function getServerSideProps() {
  const items = getReadOrders();

  return {
    props: { items }
  };
}

'use client';
import { useState } from 'react';
import Link from 'next/link';

import { ReadOrderViewModel } from '@/types/ReadOrder';

import SearchBox from '@/components/SearchBox';

import classNames from '@/utils/classNames';

import styles from './ReadOrdersPage.module.css';

interface ReadOrdersProps {
  items: ReadOrderViewModel[];
}

export default function ReadOrdersPage(props: ReadOrdersProps) {
  const [searchString, setSearchString] = useState('');
  const searchStringLower = searchString.toLowerCase();
  const readOrders = props.items.filter((x) =>
    x.name.toLowerCase().includes(searchStringLower)
  );

  return (
    <section>
      <header className="header">
        <h1>Read Orders</h1>
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
              <div className={classNames('muted', styles.issueCount)}>
                {x.issueCount} {x.issueCount === 1 ? 'issue' : 'issues'}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

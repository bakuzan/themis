'use client';
import { useState } from 'react';
import Link from 'next/link';

import { CollectionViewModel } from '@/types/Collection';

import SearchBox from '@/components/SearchBox';
import getCollectionFullName from '@/utils/getCollectionFullName';
import classNames from '@/utils/classNames';

import styles from './CollectionsPage.module.css';

interface CollectionsProps {
  items: CollectionViewModel[];
}

export default function CollectionsPage(props: CollectionsProps) {
  const [searchString, setSearchString] = useState('');
  const searchStringLower = searchString.toLowerCase();
  const collections = props.items.filter(
    (x) =>
      getCollectionFullName(x)?.toLowerCase().includes(searchStringLower) ||
      `${x.publicationDate}`.includes(searchStringLower)
  );

  return (
    <section>
      <header className="header">
        <h1>Collections</h1>
        <div>
          <Link href="/collections/new">Create New Collection</Link>
        </div>
      </header>
      <div>
        <SearchBox
          value={searchString}
          onChange={(text) => setSearchString(text)}
        />
        <ul className={styles.list}>
          {collections.map((x) => (
            <li key={x.id} className={styles.list__item}>
              <div className={styles.nameWrapper}>
                <Link className={styles.itemName} href={`/collections/${x.id}`}>
                  {getCollectionFullName(x)}&nbsp;
                </Link>
                <span className="muted">({x.publicationDate})</span>
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

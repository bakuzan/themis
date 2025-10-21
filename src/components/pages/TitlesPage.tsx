'use client';
import { useState } from 'react';
import Link from 'next/link';

import { TitleViewModel } from '@/types/Title';

import SearchBox from '@/components/SearchBox';
import { filterTitles } from '@/utils/filters/titles';
import classNames from '@/utils/classNames';

import styles from './TitlesPage.module.css';

interface TitlesProps {
  items: TitleViewModel[];
}

export default function Titles(props: TitlesProps) {
  const [searchString, setSearchString] = useState('');
  const searchStringLower = searchString.toLowerCase();
  const titles = props.items.filter(filterTitles(searchStringLower));

  return (
    <section>
      <header className="header">
        <h1>Titles</h1>
        <div>
          <Link href="/titles/new">Create New Title</Link>
        </div>
      </header>
      <div>
        <SearchBox
          value={searchString}
          onChange={(text) => setSearchString(text)}
        />
        <ul className={styles.list}>
          {titles.map((x) => (
            <li key={x.id} className={styles.list__item}>
              <div className={styles.nameWrapper}>
                <Link className={styles.itemName} href={`/titles/${x.id}`}>
                  {x.name}&nbsp;
                </Link>
                <span className="muted">({x.startYear})</span>
                {x.isOneShot && <span className="muted">&nbsp;(One Shot)</span>}
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

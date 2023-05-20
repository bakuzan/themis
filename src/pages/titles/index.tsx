import { useState } from 'react';
import Link from 'next/link';

import { getTitles } from '@/api/titles';
import { TitleViewModel } from '@/types/Title';

import PageHead from '@/components/PageHead';
import SearchBox from '@/components/SearchBox';
import { filterTitles } from '@/utils/filters/titles';

import styles from './index.module.css';

interface TitlesProps {
  items: TitleViewModel[];
}

const metadata = {
  title: 'Titles'
};

export default function Titles(props: TitlesProps) {
  const [searchString, setSearchString] = useState('');
  const searchStringLower = searchString.toLowerCase();
  const titles = props.items.filter(filterTitles(searchStringLower));

  return (
    <section>
      <PageHead title={metadata.title} />
      <header className="header">
        <h1>{metadata.title}</h1>
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
                  {x.name}
                </Link>
                <span className="muted">&nbsp;({x.startYear})</span>
                {x.isOneShot && <span className="muted">&nbsp;(One Shot)</span>}
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
  const items = getTitles();

  return {
    props: { items }
  };
}

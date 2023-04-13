import Link from 'next/link';

import { getTitles } from '@/api/titles';
import { TitleViewModel } from '@/types/Title';

import styles from './index.module.css';
import PageHead from '@/components/PageHead';
import { useState } from 'react';
import SearchBox from '@/components/SearchBox';

interface TitlesProps {
  items: TitleViewModel[];
}

const metadata = {
  title: 'Titles'
};

export default function Titles(props: TitlesProps) {
  const [searchString, setSearchString] = useState('');
  const searchStringLower = searchString.toLowerCase();
  const titles = props.items.filter((x) =>
    x.name.toLowerCase().includes(searchStringLower)
  );
  console.log('<Titles>', props);

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
                <Link href={`/titles/${x.id}`}>{x.name}</Link>
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

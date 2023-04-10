import Link from 'next/link';

import { getTitles } from '@/api/titles';
import { TitleViewModel } from '@/types/Title';

import styles from './index.module.css';

interface TitlesProps {
  items: TitleViewModel[];
}

export default function Titles(props: TitlesProps) {
  console.log('<Titles>', props);

  return (
    <section>
      <header className="header">
        <h1>Titles</h1>
        <div>
          <Link href="/titles/new">Create New Title</Link>
        </div>
      </header>
      <div>
        {/* TODO Add a filter */}
        <ul className={styles.list}>
          {props.items.map((x) => (
            <li key={x.id} className={styles.list__item}>
              <div>
                <Link href={`/titles/${x.id}`}>{x.name}</Link>
              </div>
              {x.isOneShot && <span>&nbsp;(One Shot)</span>}
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

import Link from 'next/link';

import styles from './page.module.css';

export const metadata = {
  title: 'Titles'
};

export default function Titles() {
  return (
    <section>
      <header className={styles.header}>
        <h1>Titles</h1>
        <div>
          <Link href="/titles/new">Create New Title</Link>
        </div>
      </header>
      <div></div>
    </section>
  );
}

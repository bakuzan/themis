import Link from 'next/link';

import TitleForm from '@/app/components/Forms/TitleForm';

import styles from '../page.module.css';

export const metadata = {
  title: 'Create Title'
};

export default function TitlesNew() {
  return (
    <section>
      <header className={styles.header}>
        <h1>Create Title</h1>
        <div>
          <Link href="/titles">Back</Link>
        </div>
      </header>
      <TitleForm
        method="POST"
        data={{ name: '', startYear: 1977, isOneShot: false }}
      />
    </section>
  );
}

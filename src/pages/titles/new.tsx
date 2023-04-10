import Link from 'next/link';

import TitleForm from '@/components/Forms/TitleForm';

import styles from './titles.module.css';

export const metadata = {
  title: 'Create Title'
};

export default function TitlesNew() {
  return (
    <section>
      <header className="header">
        <h1>Create Title</h1>
        <div>
          <Link href="/titles">Back</Link>
        </div>
      </header>
      <TitleForm
        method="POST"
        action="titles/new"
        data={{ name: '', startYear: 1977, isOneShot: false }}
      />
    </section>
  );
}

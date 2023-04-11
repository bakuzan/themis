import Link from 'next/link';

import TitleForm from '@/components/Forms/TitleForm';

import PageHead from '@/components/PageHead';

export const metadata = {
  title: 'Create Title'
};

export default function TitlesNew() {
  return (
    <section>
      <PageHead title={metadata.title} />
      <header className="header">
        <h1>{metadata.title}</h1>
        <div>
          <Link href="/titles">Back</Link>
        </div>
      </header>
      <TitleForm
        method="POST"
        action="/api/titles/new"
        data={{ name: '', startYear: 1977, isOneShot: false }}
      />
    </section>
  );
}

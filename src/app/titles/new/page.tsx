import Link from 'next/link';

import TitleForm from '@/components/Forms/TitleForm';

import getPageTitle from '@/utils/getPageTitle';

export const metadata = {
  title: getPageTitle('Create Title')
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
        action="/api/titles"
        data={{ name: '', startYear: 1977, isOneShot: false }}
      />
    </section>
  );
}

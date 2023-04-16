import Link from 'next/link';

import CollectionForm from '@/components/Forms/CollectionForm';

import PageHead from '@/components/PageHead';

export const metadata = {
  title: 'Create Collection'
};

export default function CollectionsNew() {
  return (
    <section>
      <PageHead title={metadata.title} />
      <header className="header">
        <h1>{metadata.title}</h1>
        <div>
          <Link href="/collections">Back</Link>
        </div>
      </header>
      <CollectionForm
        method="POST"
        action="/api/collections/new"
        data={{ name: '', publicationDate: 1977, number: undefined }}
      />
    </section>
  );
}

import Link from 'next/link';

import { PageProps } from '@/types/PageProps';

import { getCollectionById } from '@/api/collections';

import CollectionForm from '@/components/Forms/CollectionForm';
import getPageTitle from '@/utils/getPageTitle';

export const metadata = {
  title: getPageTitle('Edit Collection')
};

export default async function CollectionEdit({ params }: PageProps) {
  const { id } = await params;
  const data = getCollectionById(Number(id));

  return (
    <section>
      <header className="header">
        <h1>Edit Collection</h1>
        <div>
          <Link href={`/collections/${data.id}`}>Back</Link>
        </div>
      </header>
      <CollectionForm
        method="PUT"
        action={`/api/collections/${data.id}`}
        data={data}
      />
    </section>
  );
}

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';

import { CollectionViewModel } from '@/types/Collection';
import { getCollectionById } from '@/api/collections';

import CollectionForm from '@/components/Forms/CollectionForm';
import PageHead from '@/components/PageHead';

interface CollectionEditProps {
  item: CollectionViewModel;
}

const metadata = {
  title: 'Edit Collection'
};

export default function CollectionEdit(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const data = props.item;

  return (
    <section>
      <PageHead title={metadata.title} />
      <header className="header">
        <h1>{metadata.title}</h1>
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

export const getServerSideProps = (async (context) => {
  const { id } = context.params ?? {};
  if (!id) {
    throw new Error(`collections/[id]/edit was called without an id!`);
  }

  const item = getCollectionById(Number(id));

  return {
    props: { item }
  };
}) satisfies GetServerSideProps<CollectionEditProps>;

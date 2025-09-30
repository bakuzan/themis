import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';

import CollectionForm from '@/components/Forms/CollectionForm';
import { getCollectionDefaultProps } from '@/api/collections';

import PageHead from '@/components/PageHead';
import stripUndefined from '@/utils/stripUndefined';

interface CollectionsNewProps {
  defaultName?: string;
  defaultNumber?: number;
}

export const metadata = { title: 'Create Collection' };

export default function CollectionsNew(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
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
        data={{
          name: props.defaultName,
          publicationDate: 1977,
          number: props.defaultNumber
        }}
      />
    </section>
  );
}

export const getServerSideProps = (async (context) => {
  const { titleId } = context.query ?? {};
  let defaultProps: CollectionsNewProps = { defaultName: '' };

  if (titleId) {
    defaultProps = { ...getCollectionDefaultProps(Number(titleId)) };
  }

  return { props: { ...stripUndefined(defaultProps) } };
}) satisfies GetServerSideProps<CollectionsNewProps>;

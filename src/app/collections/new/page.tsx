import Link from 'next/link';

import { PageProps } from '@/types/PageProps';

import { getCollectionDefaultProps } from '@/database/collections';

import CollectionForm from '@/components/Forms/CollectionForm';
import getPageTitle from '@/utils/getPageTitle';

interface CollectionsNewProps {
  defaultName?: string;
  defaultNumber?: number;
}

export const metadata = {
  title: getPageTitle('Create Collection')
};

export default async function CollectionsNew(props: PageProps) {
  const { titleId } = (await props.searchParams) ?? {};
  let defaultProps: CollectionsNewProps = { defaultName: '' };

  if (titleId) {
    const defaults = await getCollectionDefaultProps(Number(titleId));
    defaultProps = { ...defaults };
  }

  return (
    <section>
      <header className="header">
        <h1>Create Collection</h1>
        <div>
          <Link href="/collections">Back</Link>
        </div>
      </header>
      <CollectionForm
        method="POST"
        action="/api/collections"
        data={{
          name: defaultProps.defaultName,
          publicationDate: 1977,
          number: defaultProps.defaultNumber
        }}
      />
    </section>
  );
}

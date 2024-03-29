import { useState } from 'react';
import Link from 'next/link';

import { CollectionViewModel } from '@/types/Collection';
import { getCollections } from '@/api/collections';

import PageHead from '@/components/PageHead';
import SearchBox from '@/components/SearchBox';
import getCollectionFullName from '@/utils/getCollectionFullName';

import styles from './index.module.css';
import classNames from '@/utils/classNames';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

interface CollectionsProps {
  items: CollectionViewModel[];
}

const metadata = {
  title: 'Collections'
};

export default function Collections(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [searchString, setSearchString] = useState('');
  const searchStringLower = searchString.toLowerCase();
  const collections = props.items.filter(
    (x) =>
      getCollectionFullName(x)?.toLowerCase().includes(searchStringLower) ||
      `${x.publicationDate}`.includes(searchStringLower)
  );

  return (
    <section>
      <PageHead title={metadata.title} />
      <header className="header">
        <h1>{metadata.title}</h1>
        <div>
          <Link href="/collections/new">Create New Collection</Link>
        </div>
      </header>
      <div>
        <SearchBox
          value={searchString}
          onChange={(text) => setSearchString(text)}
        />
        <ul className={styles.list}>
          {collections.map((x) => (
            <li key={x.id} className={styles.list__item}>
              <div className={styles.nameWrapper}>
                <Link className={styles.itemName} href={`/collections/${x.id}`}>
                  {getCollectionFullName(x)}&nbsp;
                </Link>
                <span className="muted">({x.publicationDate})</span>
              </div>
              <div className={classNames('muted', styles.issueCount)}>
                {x.issueCount} {x.issueCount === 1 ? 'issue' : 'issues'}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export const getServerSideProps = (async () => {
  const items = getCollections();

  return {
    props: { items }
  };
}) satisfies GetServerSideProps<CollectionsProps>;

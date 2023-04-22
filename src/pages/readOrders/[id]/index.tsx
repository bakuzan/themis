import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';

import { getReadOrderWithIssues } from '@/api/readOrders';
import { getCollections } from '@/api/collections';
import { getIssuesWithTitleInfo } from '@/api/issues';
import { ReadOrderWithIssuesViewModel } from '@/types/ReadOrder';
import { CollectionViewModel } from '@/types/Collection';
import { IssueWithTitleInfoViewModel } from '@/types/Issue';

import SearchBox from '@/components/SearchBox';
import PageHead from '@/components/PageHead';
import ReadOrderIssueItem from '@/components/ReadOrderIssueItem';
import ReadOrderIssueForm from '@/components/Forms/ReadOrderIssueForm';

import { filterReadOrderIssues } from '@/utils/filters/issues';

import styles from './index.module.css';

interface ReadOrderViewProps {
  item: ReadOrderWithIssuesViewModel;
  collections: CollectionViewModel[];
  issues: IssueWithTitleInfoViewModel[];
}

export default function ReadOrderView(props: ReadOrderViewProps) {
  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);
  const data = props.item;

  const [formKey, setFormKey] = useState(1);
  const [searchString, setSearchString] = useState('');
  const searchStringLower = searchString.toLowerCase();

  const allIssues = [...data.issues];
  const issues = allIssues.filter(filterReadOrderIssues(searchStringLower));

  const pageTitle = data.name;
  const issueIds = allIssues.map((x) => x.id);
  const dropdownIssues = props.issues.filter(
    (x) => !issueIds.some((y) => y === x.id)
  );

  console.log('<ReadOrderView>', props);

  return (
    <section>
      <PageHead title={pageTitle} />
      <header className="header">
        <div>
          <h1>{pageTitle}</h1>
          <p className="subtitle">{data.issueCount} Issues</p>
        </div>
        <div>
          <Link href={`/readOrders/${data.id}/edit`}>Edit</Link>
        </div>
      </header>
      <div>
        <section className={styles.issue_form}>
          <header className="header">
            <h2>Add existing collection or issue to {pageTitle}</h2>
          </header>
          <ReadOrderIssueForm
            key={formKey}
            method="POST"
            action={`/api/readOrderIssues/new`}
            issues={dropdownIssues}
            onSuccess={() => {
              refreshData();
              setFormKey((p) => p + 1);
            }}
            data={{
              readOrderId: data.id,
              collectionId: undefined,
              issueId: undefined
            }}
          />
        </section>
        <SearchBox
          value={searchString}
          onChange={(text) => setSearchString(text)}
        />
        {/* <ul className={styles.list}>
          {issues.map((x) => (
            <CollectionIssueItem
              key={x.id}
              data={x}
              collectionId={data.id}
              onRemove={refreshData}
            />
          ))}
        </ul> */}
      </div>
      <footer>{/* TODO Add a delete button */}</footer>
    </section>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const { id } = context.params ?? {};
  if (!id) {
    throw new Error(`readOrder/[id] was called without an id!`);
  }

  const item = getReadOrderWithIssues(Number(id));
  const collections = getCollections();
  const issues = getIssuesWithTitleInfo();

  return {
    props: { item, collections, issues }
  };
}

import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';

import { ReadOrderWithIssuesViewModel } from '@/types/ReadOrder';
import { CollectionViewModel } from '@/types/Collection';
import { IssueWithTitleInfoViewModel } from '@/types/Issue';

import { getReadOrderWithIssues } from '@/api/readOrders';
import { getCollectionsForDropdown } from '@/api/collections';
import { getIssuesWithoutACollection } from '@/api/issues';

import SearchBox from '@/components/SearchBox';
import PageHead from '@/components/PageHead';
import ReadOrderIssueItem from '@/components/ReadOrderIssueItem';
import ReadOrderIssueForm from '@/components/Forms/ReadOrderIssueForm';

import { filterReadOrderIssues } from '@/utils/filters/issues';
import { exclude } from '@/utils/filters/includeExclude';
import {
  getReadOrderIssueKey,
  getFirstReadOrderIssueKey,
  getLastReadOrderIssueKey
} from '@/utils/getReadOrderIssueKey';

import styles from './index.module.css';

interface ReadOrderViewProps {
  item: ReadOrderWithIssuesViewModel;
  collections: CollectionViewModel[];
  issues: IssueWithTitleInfoViewModel[];
  firstROIKey: string | null;
  lastROIKey: string | null;
}

export default function ReadOrderView(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const refreshData = () =>
    router.replace(router.asPath, undefined, { scroll: false });

  const data = props.item;
  const [formKey, setFormKey] = useState(1);
  const [searchString, setSearchString] = useState('');
  const searchStringLower = searchString.toLowerCase();

  const allIssues = [...data.issues];
  const issues = allIssues.filter(filterReadOrderIssues(searchStringLower));

  const pageTitle = data.name;
  const collectionIds = allIssues.map((x) => x.collectionId);
  const issueIds = allIssues.map((x) => x.issueId);

  const dropdownCollections = exclude(props.collections, collectionIds);
  const dropdownIssues = exclude(props.issues, issueIds);

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
            readOrderIssues={data.issues}
            collections={dropdownCollections}
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
        <ul className={styles.list}>
          {issues.map((item, index, arr) => {
            const itemKey = getReadOrderIssueKey(item);

            const prevItem = arr[index - 1];
            const collectionStarting =
              !!item.collectionId &&
              (!prevItem || prevItem.collectionId !== item.collectionId);

            return (
              <ReadOrderIssueItem
                key={itemKey}
                isFirst={itemKey === props.firstROIKey}
                isLast={itemKey === props.lastROIKey}
                includeHeader={collectionStarting}
                data={item}
                onEdit={refreshData}
                onRemove={refreshData}
              />
            );
          })}
        </ul>
      </div>
      <footer>{/* TODO Add a delete button */}</footer>
    </section>
  );
}

export const getServerSideProps = (async (context) => {
  const { id } = context.params ?? {};
  if (!id) {
    throw new Error(`readOrders/[id] was called without an id!`);
  }

  const item = getReadOrderWithIssues(Number(id));
  const collections = getCollectionsForDropdown();
  const issues = getIssuesWithoutACollection();

  const readOrderIssues = item.issues;
  const firstROIKey = getFirstReadOrderIssueKey(readOrderIssues);
  const lastROIKey = getLastReadOrderIssueKey(readOrderIssues);

  return {
    props: { item, collections, issues, firstROIKey, lastROIKey }
  };
}) satisfies GetServerSideProps<ReadOrderViewProps>;

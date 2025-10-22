'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { ReadOrderWithIssuesViewModel } from '@/types/ReadOrder';
import { CollectionViewModel } from '@/types/Collection';
import { IssueWithTitleInfoViewModel } from '@/types/Issue';

import SearchBox from '@/components/SearchBox';
import ReadOrderIssueItem from '@/components/ReadOrderIssueItem';
import ReadOrderIssueForm from '@/components/Forms/ReadOrderIssueForm';

import { filterReadOrderIssues } from '@/utils/filters/issues';
import { exclude } from '@/utils/filters/includeExclude';
import { getReadOrderIssueKey } from '@/utils/getReadOrderIssueKey';

import styles from './ReadOrderView.module.css';

interface ReadOrderViewProps {
  item: ReadOrderWithIssuesViewModel;
  collections: CollectionViewModel[];
  issues: IssueWithTitleInfoViewModel[];
  firstROIKey: string | null;
  lastROIKey: string | null;
  collectionIssueCounts: [number | null, number][];
}

export default function ReadOrderView(props: ReadOrderViewProps) {
  const router = useRouter();
  const refreshData = () => router.refresh();

  const data = props.item;
  const countMap = new Map(props.collectionIssueCounts);
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
                countMap={countMap}
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

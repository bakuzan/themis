'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { CollectionWithIssuesViewModel } from '@/types/Collection';
import { IssueWithTitleInfoViewModel } from '@/types/Issue';
import { ReadOrderViewModel } from '@/types/ReadOrder';

import SearchBox from '@/components/SearchBox';
import CollectionIssueItem from '@/components/CollectionIssueItem';
import CollectionIssueForm from '@/components/Forms/CollectionIssueForm';

import getCollectionFullName from '@/utils/getCollectionFullName';
import { filterCollectionIssues } from '@/utils/filters/issues';

import styles from './CollectionView.module.css';

interface CollectionViewProps {
  item: CollectionWithIssuesViewModel;
  issues: IssueWithTitleInfoViewModel[];
  readOrders: ReadOrderViewModel[];
}

export default function CollectionView(props: CollectionViewProps) {
  const router = useRouter();
  const refreshData = () => router.refresh();

  const data = props.item;
  const [issueFormKey, setIssueFormKey] = useState(1);
  const [searchString, setSearchString] = useState('');
  const searchStringLower = searchString.toLowerCase();

  const allIssues = [...data.issues];
  const issues = allIssues.filter(filterCollectionIssues(searchStringLower));

  const pageTitle = getCollectionFullName(data);
  const issueIds = allIssues.map((x) => x.id);
  const dropdownIssues = props.issues.filter(
    (x) => !issueIds.some((y) => y === x.id)
  );

  return (
    <section>
      <header className="header">
        <div>
          <h1>{pageTitle}</h1>
          <p className="subtitle">{data.issueCount} Issues</p>
        </div>
        <div>
          <Link href={`/collections/${data.id}/edit`}>Edit</Link>
        </div>
      </header>
      <div>
        <div className={styles.sectionGrid}>
          <section className={styles.issue_form}>
            <header className="header">
              <h2>Add existing issue to {pageTitle}</h2>
            </header>
            <CollectionIssueForm
              key={issueFormKey}
              method="POST"
              action={`/api/collectionissues/new`}
              issues={dropdownIssues}
              onSuccess={() => {
                refreshData();
                setIssueFormKey((p) => p + 1);
              }}
              data={{ collectionId: data.id }}
            />
          </section>
          <section className={styles.readOrderLinks}>
            <header className="header">
              <h2>Associated with the following read orders</h2>
            </header>
            <ul className={styles.list}>
              {props.readOrders.map((x) => (
                <li key={x.id} className={styles.readOrderLink}>
                  <Link href={`/readOrders/${x.id}`}>{x.name}</Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <SearchBox
          value={searchString}
          onChange={(text) => setSearchString(text)}
        />
        <ul className={styles.list}>
          {issues.map((x) => (
            <CollectionIssueItem
              key={x.id}
              data={x}
              collectionId={data.id}
              onEdit={refreshData}
              onRemove={refreshData}
            />
          ))}
        </ul>
      </div>
      <footer>{/* TODO Add a delete button */}</footer>
    </section>
  );
}

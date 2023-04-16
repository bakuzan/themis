import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';

import { getCollectionWithIssues } from '@/api/collections';
import { getIssuesWithTitleInfo } from '@/api/issues';
import { CollectionWithIssuesViewModel } from '@/types/Collection';
import { IssueWithTitleInfoViewModel } from '@/types/Issue';

import SearchBox from '@/components/SearchBox';
import PageHead from '@/components/PageHead';
import CollectionIssueItem from '@/components/CollectionIssueItem';
import CollectionIssueForm from '@/components/Forms/CollectionIssueForm';

import getCollectionFullName from '@/utils/getCollectionFullName';
import getFormattedIssueNumber from '@/utils/getFormattedIssueNumber';

import styles from './index.module.css';

interface CollectionViewProps {
  item: CollectionWithIssuesViewModel;
  issues: IssueWithTitleInfoViewModel[];
}

export default function CollectionView(props: CollectionViewProps) {
  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);
  const data = props.item;

  const [issueFormKey, setIssueFormKey] = useState(1);
  const [newIssues, setNewIssues] = useState(
    [] as IssueWithTitleInfoViewModel[]
  );
  const [searchString, setSearchString] = useState('');
  const searchStringLower = searchString.toLowerCase();

  const allIssues = [...data.issues, ...newIssues];
  const issues = allIssues.filter(
    (x) =>
      x.titleName.toLowerCase().includes(searchStringLower) ||
      `${x.startYear}`.includes(searchStringLower) ||
      x.name.toLowerCase().includes(searchStringLower) ||
      x.coverDate.includes(searchStringLower) ||
      getFormattedIssueNumber(x).includes(searchStringLower)
  );

  const pageTitle = getCollectionFullName(data);

  console.log('<CollectionView>', props);

  return (
    <section>
      <PageHead title={pageTitle} />
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
        <section className={styles.issue_form}>
          <header className="header">
            <h2>Add existing issue to {pageTitle}</h2>
          </header>
          <CollectionIssueForm
            key={issueFormKey}
            method="POST"
            action={`/api/collectionissues/new`}
            issues={props.issues}
            onSuccess={(newIssue) => {
              setNewIssues((p) => [...p, newIssue]);
              setIssueFormKey((p) => p + 1);
            }}
            data={{
              collectionId: data.id,
              issueId: undefined
            }}
          />
        </section>
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
              onRemove={refreshData}
            />
          ))}
        </ul>
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
    throw new Error(`collections/[id] was called without an id!`);
  }

  const item = getCollectionWithIssues(Number(id));
  const issues = getIssuesWithTitleInfo();

  return {
    props: { item, issues }
  };
}

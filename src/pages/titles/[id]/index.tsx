import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';

import { getTitleWithIssues } from '@/api/titles';
import { TitleWithIssuesViewModel } from '@/types/Title';

import SearchBox from '@/components/SearchBox';
import IssueForm from '@/components/Forms/IssueForm';
import PageHead from '@/components/PageHead';
import IssueItem from '@/components/IssueItem';
import { filterTitleIssues } from '@/utils/filters/issues';
import getNextYYYYMM from '@/utils/getNextYYYYMM';

import styles from './index.module.css';

interface TitleViewProps {
  item: TitleWithIssuesViewModel;
}

export default function TitleView(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);
  const data = props.item;

  const [searchString, setSearchString] = useState('');
  const searchStringLower = searchString.toLowerCase();

  const allIssues = [...data.issues];
  const issues = allIssues.filter(filterTitleIssues(searchStringLower));

  const pageTitle = `${data.name} (${data.startYear})`;
  const latestIssue = issues[0] ?? { number: 0, coverDate: '' };

  return (
    <section>
      <PageHead title={pageTitle} />
      <header className="header">
        <div>
          <h1>{pageTitle}</h1>
          <p className="subtitle">
            {data.isOneShot ? `(One Shot)` : `${data.issueCount} Issues`}
          </p>
        </div>
        <div className={styles.links}>
          <Link href={`/titles/${data.id}/edit`}>Edit</Link>
          <Link href={`/collections/new?titleId=${data.id}`}>
            Create New Collection
          </Link>
        </div>
      </header>
      <div>
        <section className={styles.issue_form}>
          <header className="header">
            <h2>Add a new issue to {pageTitle}</h2>
          </header>
          <IssueForm
            key={latestIssue.id ?? 0}
            method="POST"
            action="/api/issues/new"
            onSuccess={() => refreshData()}
            data={{
              titleId: data.id,
              number: latestIssue.number + 1,
              name: '',
              coverDate: getNextYYYYMM(latestIssue.coverDate),
              isAnnual: false
            }}
          />
        </section>
        <SearchBox
          value={searchString}
          onChange={(text) => setSearchString(text)}
        />
        <ul className={styles.list}>
          {issues.map((x) => (
            <IssueItem key={x.id} data={x} />
          ))}
        </ul>
      </div>
      <footer>{/* TODO Add a delete button */}</footer>
    </section>
  );
}

export const getServerSideProps = (async (context) => {
  const { id } = context.params ?? {};
  if (!id) {
    throw new Error(`titles/[id] was called without an id!`);
  }

  const item = getTitleWithIssues(Number(id));

  return { props: { item } };
}) satisfies GetServerSideProps<TitleViewProps>;

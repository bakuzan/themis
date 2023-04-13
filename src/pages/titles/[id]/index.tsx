import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';

import { getTitleWithIssues } from '@/api/titles';
import { TitleWithIssuesViewModel } from '@/types/Title';

import IssueForm from '@/components/Forms/IssueForm';
import PageHead from '@/components/PageHead';

import styles from './index.module.css';
import { useState } from 'react';
import SearchBox from '@/components/SearchBox';
import { IssueViewModel } from '@/types/Issue';

const getFormattedIssueNumber = (issue: IssueViewModel) =>
  '#' + `${issue.number}`.padStart(issue.isAnnual ? 2 : 4, '0');

interface TitleViewProps {
  item: TitleWithIssuesViewModel;
}

export default function TitleView(props: TitleViewProps) {
  const data = props.item;

  const [searchString, setSearchString] = useState('');
  const searchStringLower = searchString.toLowerCase();
  const issues = data.issues.filter(
    (x) =>
      x.name.toLowerCase().includes(searchStringLower) ||
      x.coverDate.includes(searchStringLower) ||
      getFormattedIssueNumber(x).includes(searchStringLower)
  );

  const pageTitle = `${data.name} (${data.startYear})`;
  console.log('<TitleView>', props);

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
        <div>
          <Link href={`/titles/${data.id}/edit`}>Edit</Link>
        </div>
      </header>
      <div>
        <section className={styles.issue_form}>
          <IssueForm method="POST" action="/api/issue/new" />
        </section>
        <SearchBox
          value={searchString}
          onChange={(text) => setSearchString(text)}
        />
        <ul className={styles.list}>
          {issues.map((x) => {
            const issueNumber = getFormattedIssueNumber(x);

            return (
              <li key={x.id} className={styles.list__item}>
                <div className={styles.coverInfo}>
                  <div>
                    {issueNumber} {x.isAnnual && 'Annual'}
                  </div>
                  &nbsp;
                  <div>{x.coverDate}</div>
                </div>
                <div>{x.name}</div>
              </li>
            );
          })}
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
    throw new Error(`titles/[id] was called without an id!`);
  }

  const item = getTitleWithIssues(Number(id));

  return {
    props: { item }
  };
}

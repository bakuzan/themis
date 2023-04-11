import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';

import { getTitleById } from '@/api/titles';
import { TitleViewModel } from '@/types/Title';

import IssueForm from '@/components/Forms/IssueForm';

import styles from './index.module.css';
import PageHead from '@/components/PageHead';

interface TitleViewProps {
  item: TitleViewModel;
}

export default function TitleView(props: TitleViewProps) {
  const data = props.item;
  const issues = [];

  const pageTitle = `${data.name} (${data.startYear})`;
  console.log('<TitleView>', props);

  return (
    <section>
      <PageHead title={pageTitle} />
      <header className="header">
        <div>
          <h1>{pageTitle}</h1>
          <p className="subtitle">
            {data.isOneShot ? `(One Shot)` : `${issues.length} Issues`}
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
        {/* TODO Add a filter */}
        {/* TODO Render list of issues */}
        {/* <ul className={styles.list}>
          {props.items.map((x) => (
            <li key={x.id} className={styles.list__item}>
              <div>
                <Link href={`/titles/${x.id}`}>{x.name}</Link>
              </div>
              {x.isOneShot && <span>&nbsp;(One Shot)</span>}
            </li>
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
    throw new Error(`titles/[id] was called without an id!`);
  }

  const item = getTitleById(Number(id));

  return {
    props: { item }
  };
}

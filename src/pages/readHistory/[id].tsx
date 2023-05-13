import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';

import {
  ReadHistoryIssueInfoViewModel,
  ReadHistoryViewModel
} from '@/types/ReadHistory';
import { getReadHistoryById, getReadHistoryIssues } from '@/api/readHistory';

import PageHead from '@/components/PageHead';
import SearchBox from '@/components/SearchBox';
import ReadHistoryIssueItem from '@/components/ReadHistoryIssueItem';

import { filterReadHistoryIssues } from '@/utils/filters/issues';
import { getReadOrderIssueKey } from '@/utils/getReadOrderIssueKey';

import styles from './[id].module.css';
import RemoveReadHistoryForm from '@/components/Forms/RemoveReadHistoryForm';

interface ReadHistoryViewProps {
  item: ReadHistoryViewModel;
  issues: ReadHistoryIssueInfoViewModel[];
}

export default function ReadHistoryView(props: ReadHistoryViewProps) {
  const router = useRouter();
  const refreshData = () =>
    router.replace(router.asPath, undefined, { scroll: false });

  const data = props.item;
  const pageTitle = `Reading ${data.readOrderName}`;

  const [searchString, setSearchString] = useState('');
  const searchStringLower = searchString.toLowerCase();

  const allIssues = [...props.issues];
  const issues = allIssues.filter(filterReadHistoryIssues(searchStringLower));
  const totalIssueCount = allIssues.length;
  const completedCount = allIssues.filter((x) => !!x.readOnDate).length;

  console.log('<ReadHistoryView>', props);

  return (
    <section>
      <PageHead title={pageTitle} />
      <header className="header">
        <div>
          <h1>{pageTitle}</h1>
          <p className="subtitle">
            {completedCount}/{totalIssueCount}
          </p>
        </div>
      </header>
      <div>
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
              <ReadHistoryIssueItem
                key={itemKey}
                includeHeader={collectionStarting}
                data={item}
                onUpdate={refreshData}
              />
            );
          })}
        </ul>
      </div>
      <footer className={styles.footer}>
        <RemoveReadHistoryForm
          readHistoryId={data.id}
          onSubmitSuccess={() => router.replace('/')}
        />
      </footer>
    </section>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const { id } = context.params ?? {};
  if (!id) {
    throw new Error(`readHistory/[id] was called without an id!`);
  }

  const readHistoryId = Number(id);
  const item = getReadHistoryById(readHistoryId);
  const issues = getReadHistoryIssues(readHistoryId);

  return {
    props: { item, issues }
  };
}

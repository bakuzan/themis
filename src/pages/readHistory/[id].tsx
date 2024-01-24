import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { ReadHistoryViewModel } from '@/types/ReadHistory';
import { ReadHistoryIssueInfoViewModel } from '@/types/ReadHistoryIssue';
import { getReadHistoryById, getReadHistoryIssues } from '@/api/readHistory';

import PageHead from '@/components/PageHead';
import SearchBox from '@/components/SearchBox';
import ReadHistoryIssueItem from '@/components/ReadHistoryIssueItem';
import RemoveReadHistoryForm from '@/components/Forms/RemoveReadHistoryForm';
import CompleteReadHistoryForm from '@/components/Forms/CompleteReadHistoryForm';

import { filterReadHistoryIssues } from '@/utils/filters/issues';
import { getReadOrderIssueKey } from '@/utils/getReadOrderIssueKey';
import createCollectionCountMap from '@/utils/createCollectionCountMap';
import getTargetIssueElementId from '@/utils/getTargetIssueElementId';
import { findLastIndex } from '@/utils/findLastIndex';

import styles from './[id].module.css';

interface ReadHistoryViewProps {
  item: ReadHistoryViewModel;
  issues: ReadHistoryIssueInfoViewModel[];
  nextIssueToRead: ReadHistoryIssueInfoViewModel | null;
  collectionIssueCounts: [number | null, number][];
}

function getReadOnDate(
  changes: Map<string, string | null>,
  item: ReadHistoryIssueInfoViewModel
) {
  const itemKey = getReadOrderIssueKey(item);
  return (
    (changes.has(itemKey) ? changes.get(itemKey) : item.readOnDate) ?? null
  );
}

export default function ReadHistoryView(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const routerIsReady = router.isReady;
  const currentPath = router.asPath;
  const pathNoHash = currentPath.split('#')[0];
  const refreshData = () =>
    router.replace(currentPath, undefined, { scroll: false });

  const { item: data, nextIssueToRead } = props;
  const countMap = new Map(props.collectionIssueCounts);
  const pageTitle = `Reading ${data.readOrderName}`;

  const [changes, setChanges] = useState(new Map<string, string | null>([]));
  const [searchString, setSearchString] = useState('');
  const searchStringLower = searchString.toLowerCase();

  const allIssues = [...props.issues];
  const isComplete = data.completedOnDate !== null;
  const issues = allIssues.filter(filterReadHistoryIssues(searchStringLower));
  const totalIssueCount = allIssues.length;
  const completedCount = allIssues.filter(
    (x) => !!getReadOnDate(changes, x)
  ).length;

  useEffect(() => {
    // Scroll to the next issue to read in an ongoing read-through.
    if (routerIsReady && !isComplete && nextIssueToRead) {
      const elementId = getTargetIssueElementId(nextIssueToRead);

      // To avoid "Cancel rendering route" error
      // https://github.com/vercel/next.js/issues/37362#issuecomment-1272211420
      const newPath = `${pathNoHash}#${elementId}`;
      window.location.replace(newPath);
    }
  }, [nextIssueToRead, isComplete, pathNoHash, routerIsReady]);

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
        <div className={styles.completionBlock}>
          <div className={styles.historyDates}>
            <span>{data.startedOnDate}</span>
            <span>&nbsp;to&nbsp;</span>
            <span>{data.completedOnDate ?? 'present'}</span>
          </div>
          <CompleteReadHistoryForm data={data} onSubmitSuccess={refreshData} />
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
                data={{ ...item, readOnDate: getReadOnDate(changes, item) }}
                countMap={countMap}
                onUpdate={(updated) =>
                  setChanges((p) => new Map(p.set(itemKey, updated.readOnDate)))
                }
              />
            );
          })}
        </ul>
      </div>
      <footer className={styles.footer}>
        {!data.completedOnDate && (
          <RemoveReadHistoryForm
            readHistoryId={data.id}
            onSubmitSuccess={() => router.replace('/')}
          />
        )}
      </footer>
    </section>
  );
}

export const getServerSideProps = (async (context) => {
  const { id } = context.params ?? {};
  if (!id) {
    throw new Error(`readHistory/[id] was called without an id!`);
  }

  const readHistoryId = Number(id);
  const item = getReadHistoryById(readHistoryId);
  const issues = getReadHistoryIssues(readHistoryId);
  const countMap = createCollectionCountMap(issues);

  const mostRecentReadIndex = findLastIndex(
    issues,
    (x) => x.readOnDate !== null
  );

  return {
    props: {
      item,
      issues,
      collectionIssueCounts: Array.from(countMap.entries()),
      nextIssueToRead: issues[mostRecentReadIndex + 1] ?? null
    }
  };
}) satisfies GetServerSideProps<ReadHistoryViewProps>;

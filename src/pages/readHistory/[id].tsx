import { GetServerSidePropsContext } from 'next';

import { ReadHistoryViewModel } from '@/types/ReadHistory';
import { getReadHistoryById } from '@/api/readHistory';

import PageHead from '@/components/PageHead';

interface ReadHistoryViewProps {
  item: ReadHistoryViewModel;
}

export default function ReadHistoryView(props: ReadHistoryViewProps) {
  const data = props.item;
  const pageTitle = `Reading ${data.readOrderName}`;

  console.log('<ReadHistoryView>', props);

  return (
    <section>
      <PageHead title={pageTitle} />
      <header className="header">
        <div>
          <h1>{pageTitle}</h1>
          {/* <p className="subtitle">{data.issueCount} Issues</p> */}
        </div>
      </header>
      {/* <div>
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
      </div> */}
      <footer>{/* TODO Add a delete button */}</footer>
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

  const item = getReadHistoryById(Number(id));

  return {
    props: { item }
  };
}

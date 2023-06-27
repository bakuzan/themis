import React, { FormEvent, useContext } from 'react';

import { IssueWithTitleInfoViewModel } from '@/types/Issue';
import { DeleteResponse } from '@/types/Response';
import { AppContext } from '@/context';
import callApi from '@/utils/callApi';
import getFormattedIssueNumber from '@/utils/getFormattedIssueNumber';

import CollectionIssueEditForm from './Forms/CollectionIssueEditForm';
import Button from './Button';

import styles from './CollectionIssueItem.module.css';

interface CollectionIssueItemProps {
  collectionId: number;
  data: IssueWithTitleInfoViewModel;
  onEdit: () => void;
  onRemove: () => void;
}

const deleteActionUrl = `/api/collectionissues/remove`;

export default function CollectionIssueItem(props: CollectionIssueItemProps) {
  const appProps = useContext(AppContext);
  const { collectionId, data: item } = props;
  const issueNumber = getFormattedIssueNumber(item);

  async function onDelete(event: FormEvent) {
    event.preventDefault();

    const response = await callApi<DeleteResponse>(deleteActionUrl, {
      method: 'POST',
      body: JSON.stringify({ collectionId, issueId: item.id })
    });

    if (response.success) {
      props.onRemove();
    } else {
      appProps.dispatch({ type: 'ON_ERROR', messages: response.errorMessages });
    }
  }

  return (
    <li className={styles.item}>
      <div style={{ flex: 1 }}>
        <div className={styles.coverInfo}>
          <div>
            {item.titleName} {issueNumber} {item.isAnnual && 'Annual'}
          </div>
          &nbsp;
          <div>{item.coverDate}</div>
        </div>
        <div>{item.name}</div>
      </div>

      <div>
        <CollectionIssueEditForm
          collectionId={collectionId}
          issueId={item.id}
          onSubmitSuccess={props.onEdit}
        />
        <form
          method="POST"
          action={deleteActionUrl}
          id="removeCollectionIssue"
          name="removeCollectionIssue"
          onSubmit={onDelete}
        >
          <Button type="submit" isDanger>
            Remove
          </Button>
        </form>
      </div>
    </li>
  );
}

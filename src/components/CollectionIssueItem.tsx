import React, { FormEvent } from 'react';

import { IssueWithTitleInfoViewModel } from '@/types/Issue';
import { DeleteResponse } from '@/types/Response';
import callApi from '@/utils/callApi';
import getFormattedIssueNumber from '@/utils/getFormattedIssueNumber';

import Button from './Button';

import styles from './IssueItem.module.css';

interface CollectionIssueItemProps {
  collectionId: number;
  data: IssueWithTitleInfoViewModel;
  onRemove: () => void;
}

export default function CollectionIssueItem(props: CollectionIssueItemProps) {
  const { collectionId, data: item } = props;
  const issueNumber = getFormattedIssueNumber(item);
  const deleteActionUrl = `/api/collectionissues/remove`;

  async function onDelete(event: FormEvent) {
    event.preventDefault();

    const response = await callApi<DeleteResponse>(deleteActionUrl, {
      method: 'DELETE',
      body: JSON.stringify({ collectionId, issueId: item.id })
    });

    if (response.success) {
      props.onRemove();
    } else {
      // TODO handle errors...
    }
  }

  return (
    <li className={styles.item}>
      <div className={styles.coverInfo}>
        <div>
          {issueNumber} {item.isAnnual && 'Annual'}
        </div>
        &nbsp;
        <div>{item.coverDate}</div>
      </div>
      <div className={styles.main}>
        <div>{item.name}</div>
        <div>
          <form
            method="POST"
            action={deleteActionUrl}
            id="removeCollectionIssue"
            name="removeCollectionIssue"
            onSubmit={onDelete}
          >
            <Button type="submit">Remove</Button>
          </form>
        </div>
      </div>
    </li>
  );
}

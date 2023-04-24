import React, { FormEvent } from 'react';

import { IssueWithReadOrderInfoViewModel } from '@/types/Issue';
import { DeleteResponse } from '@/types/Response';

import callApi from '@/utils/callApi';
import classNames from '@/utils/classNames';
import getFormattedIssueNumber from '@/utils/getFormattedIssueNumber';
import getCollectionFullName from '@/utils/getCollectionFullName';

import Button from './Button';

import styles from './ReadOrderIssueItem.module.css';

interface ReadOrderIssueItemProps {
  includeHeader: boolean;
  data: IssueWithReadOrderInfoViewModel;
  onRemove: () => void;
}

const deleteActionUrl = `/api/readOrderIssues/remove`;

function RemoveForm(props: Omit<ReadOrderIssueItemProps, 'includeHeader'>) {
  const { data: item } = props;

  async function onDelete(event: FormEvent) {
    event.preventDefault();

    const response = await callApi<DeleteResponse>(deleteActionUrl, {
      method: 'POST',
      body: JSON.stringify({
        readOrderId: item.readOrderId,
        collectionId: item.collectionId,
        issueId: item.issueId
      })
    });

    if (response.success) {
      props.onRemove();
    } else {
      // TODO handle errors...
    }
  }

  return (
    <div>
      <div className={styles.edit}>
        Edit
        {/* TODO Need to implement some mechanism to update sort order of issues */}
      </div>
      <form
        method="POST"
        action={deleteActionUrl}
        id={`removeReadOrderIssue_${item.collectionId ?? 0}_${item.issueId}`}
        name="removeReadOrderIssue"
        onSubmit={onDelete}
      >
        <Button type="submit">Remove</Button>
      </form>
    </div>
  );
}

export default function ReadOrderIssueItem(props: ReadOrderIssueItemProps) {
  const { data: item } = props;

  return (
    <React.Fragment>
      {props.includeHeader && (
        <li key="HEADER" className={styles.headerItem}>
          <div>
            <div>
              {getCollectionFullName({
                collectionName: item.collectionName,
                collectionNumber: item.collectionNumber
              })}
            </div>
            <span className="muted">({item.publicationDate})</span>
          </div>

          <RemoveForm {...props} />
        </li>
      )}
      <li
        key="ITEM"
        className={classNames(
          styles.item,
          item.collectionId && styles.itemIndented
        )}
      >
        <div>
          <div className={styles.coverInfo}>
            <div>
              {item.titleName} {getFormattedIssueNumber(item)}{' '}
              {item.isOneShot && '(One Shot)'}
            </div>
            &nbsp;
            <div>{item.coverDate}</div>
          </div>
          <div className={styles.main}>
            <div>{item.name}</div>
          </div>
        </div>
        {!item.collectionId && <RemoveForm {...props} />}
      </li>
    </React.Fragment>
  );
}

import React, { FormEvent } from 'react';

import { IssueWithReadOrderInfoViewModel } from '@/types/Issue';
import { DeleteResponse } from '@/types/Response';
import callApi from '@/utils/callApi';
import classNames from '@/utils/classNames';

import styles from './IssueItem.module.css';

interface ReadOrderIssueItemProps {
  includeHeader: boolean;
  data: IssueWithReadOrderInfoViewModel;
  onRemove: () => void;
}

export default function ReadOrderIssueItem(props: ReadOrderIssueItemProps) {
  const { data: item } = props;

  const deleteActionUrl = `/api/readOrderIssues/remove`;

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
    <React.Fragment>
      {props.includeHeader && (
        <li key="HEADER" className={styles.header}>
          TODO display a collection special header
          <br />
        </li>
      )}
      <li
        key="ITEM"
        className={classNames(
          styles.item,
          item.collectionId && styles.itemIndented
        )}
      >
        TODO think this through
        <br />
      </li>
    </React.Fragment>
  );
}

import React, { FormEvent } from 'react';

import { IssueWithTitleInfoViewModel } from '@/types/Issue';
import { DeleteResponse } from '@/types/Response';
import callApi from '@/utils/callApi';

import styles from './IssueItem.module.css';

interface ReadOrderIssueItemProps {
  readOrderId: number;
  data: IssueWithTitleInfoViewModel;
  onRemove: () => void;
}

export default function ReadOrderIssueItem(props: ReadOrderIssueItemProps) {
  const { readOrderId, data: item } = props;

  const deleteActionUrl = `/api/readOrderIssues/remove`;

  async function onDelete(event: FormEvent) {
    event.preventDefault();

    const response = await callApi<DeleteResponse>(deleteActionUrl, {
      method: 'POST',
      body: JSON.stringify({ readOrderId, issueId: item.id })
    });

    if (response.success) {
      props.onRemove();
    } else {
      // TODO handle errors...
    }
  }

  return (
    <li className={styles.item}>
      TODO think this through
      <br />
    </li>
  );
}

import React, { FormEvent, useContext } from 'react';

import { ReadHistoryIssueInfoViewModel } from '@/types/ReadHistory';
import { ToggleReadHistoryIssueResponse } from '@/types/Response';
import { AppContext } from '@/context';

import callApi from '@/utils/callApi';

import Button from '@/components/Button';

interface ToggleFormProps {
  data: ReadHistoryIssueInfoViewModel;
  onSubmitSuccess: (item: ReadHistoryIssueInfoViewModel) => void;
}

const actionUrl = `/api/readHistoryIssues/toggle`;

export default function ToggleForm(props: ToggleFormProps) {
  const appProps = useContext(AppContext);
  const { data: item } = props;

  async function onUpdate(event: FormEvent) {
    event.preventDefault();

    const response = await callApi<ToggleReadHistoryIssueResponse>(actionUrl, {
      method: 'POST',
      body: JSON.stringify({
        readHistoryId: item.readHistoryId,
        collectionId: item.collectionId,
        issueId: item.issueId
      })
    });

    if (response.success) {
      const readOnDate = !item.readOnDate
        ? new Date().toISOString().split('T')[0]
        : null;

      props.onSubmitSuccess({
        ...item,
        readOnDate
      });
    } else {
      appProps.dispatch({ type: 'ON_ERROR', messages: response.errorMessages });
    }
  }

  return (
    <form
      method="POST"
      action={actionUrl}
      id={`toggleReadHistoryIssue_${item.collectionId ?? 0}_${item.issueId}`}
      name="toggleReadHistoryIssue"
      onSubmit={onUpdate}
    >
      <Button type="submit">{item.readOnDate ? 'Unread' : 'Read'}</Button>
    </form>
  );
}

import React, { FormEvent, useContext } from 'react';

import { IssueWithReadOrderInfoViewModel } from '@/types/Issue';
import { DeleteResponse } from '@/types/Response';
import { AppContext } from '@/context';

import callApi from '@/utils/callApi';

import Button from '@/components/Button';

interface RemoveFormProps {
  data: IssueWithReadOrderInfoViewModel;
  onSubmitSuccess: () => void;
}

const deleteActionUrl = `/api/readOrderIssues/remove`;

export default function RemoveForm(props: RemoveFormProps) {
  const appProps = useContext(AppContext);
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
      props.onSubmitSuccess();
    } else {
      appProps.dispatch({ type: 'ON_ERROR', messages: response.errorMessages });
    }
  }

  return (
    <form
      method="POST"
      action={deleteActionUrl}
      id={`removeReadOrderIssue_${item.collectionId ?? 0}_${item.issueId}`}
      name="removeReadOrderIssue"
      onSubmit={onDelete}
    >
      <Button type="submit">Remove</Button>
    </form>
  );
}

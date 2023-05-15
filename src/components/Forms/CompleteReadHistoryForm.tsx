import React, { FormEvent, useContext } from 'react';

import { CompleteReadHistoryResponse } from '@/types/Response';
import { ReadHistoryViewModel } from '@/types/ReadHistory';
import { AppContext } from '@/context';

import callApi from '@/utils/callApi';

import Button from '@/components/Button';

interface CompleteReadHistoryFormProps {
  data: ReadHistoryViewModel;
  onSubmitSuccess: () => void;
}

const actionUrl = `/api/readHistory/complete`;

export default function CompleteReadHistoryForm(
  props: CompleteReadHistoryFormProps
) {
  const appProps = useContext(AppContext);
  const readHistoryId = props.data.id;

  async function onDelete(event: FormEvent) {
    event.preventDefault();

    const response = await callApi<CompleteReadHistoryResponse>(actionUrl, {
      method: 'POST',
      body: JSON.stringify({
        readHistoryId
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
      action={actionUrl}
      id="completeReadHistory"
      name="completeReadHistory"
      onSubmit={onDelete}
    >
      <Button type="submit">
        {props.data.completedOnDate ? 'Reopen' : 'Complete'}
      </Button>
    </form>
  );
}

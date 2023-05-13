import React, { FormEvent, useContext } from 'react';

import { DeleteResponse } from '@/types/Response';
import { AppContext } from '@/context';

import callApi from '@/utils/callApi';

import Button from '@/components/Button';

interface RemoveReadHistoryFormProps {
  readHistoryId: number;
  onSubmitSuccess: () => void;
}

const deleteActionUrl = `/api/readHistory/remove`;

export default function RemoveReadHistoryForm(
  props: RemoveReadHistoryFormProps
) {
  const appProps = useContext(AppContext);
  const readHistoryId = props.readHistoryId;

  async function onDelete(event: FormEvent) {
    event.preventDefault();

    const response = await callApi<DeleteResponse>(deleteActionUrl, {
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
      action={deleteActionUrl}
      id="removeReadHistory"
      name="removeReadHistory"
      onSubmit={onDelete}
    >
      <Button type="submit" isDanger>
        Remove
      </Button>
    </form>
  );
}

import React, { FormEvent, useContext } from 'react';

import { ReadOrderIssueReOrderResponse } from '@/types/Response';

import callApi from '@/utils/callApi';
import { ReOrderDirection } from '@/constants/ReOrderDirection';

import Button from '@/components/Button';

import styles from './EditForm.module.css';
import { AppContext } from '@/context';

interface EditFormProps {
  canUp: boolean;
  canDown: boolean;
  readOrderId: number;
  collectionId?: number;
  issueId?: number;
  onSubmitSuccess: () => void;
}

const actionUrl = `/api/readOrderIssues/edit`;

export default function EditForm(props: EditFormProps) {
  const appProps = useContext(AppContext);
  const { readOrderId, collectionId, issueId } = props;

  async function onEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const native = event.nativeEvent as SubmitEvent;
    const direction = native.submitter
      ? (native.submitter as HTMLButtonElement).name
      : null;

    const response = await callApi<ReadOrderIssueReOrderResponse>(actionUrl, {
      method: 'POST',
      body: JSON.stringify({
        readOrderId,
        collectionId,
        issueId,
        direction
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
      id={`reOrderReadOrderIssue_${collectionId ?? 0}_${issueId ?? 0}`}
      name="reOrderReadOrderIssue"
      onSubmit={onEdit}
    >
      <div className={styles.buttonGroup}>
        <Button
          className={styles.directionButton}
          title="Move earlier in the read order"
          type="submit"
          name={ReOrderDirection.UP}
          disabled={!props.canUp}
        >
          <span aria-hidden={true}>&#x25b2;</span>
        </Button>
        <Button
          className={styles.directionButton}
          title="Move later in the read order"
          type="submit"
          name={ReOrderDirection.DOWN}
          disabled={!props.canDown}
        >
          <span aria-hidden={true}>&#x25bc;</span>
        </Button>
      </div>
    </form>
  );
}

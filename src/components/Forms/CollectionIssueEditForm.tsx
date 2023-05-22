import React, { FormEvent, useContext } from 'react';

import { CollectionIssueReOrderResponse } from '@/types/Response';

import { AppContext } from '@/context';
import callApi from '@/utils/callApi';
import { ReOrderDirection } from '@/constants/ReOrderDirection';

import Button from '@/components/Button';

import styles from './CollectionIssueEditForm.module.css';

interface CollectionIssueEditFormProps {
  collectionId: number;
  issueId: number;
  onSubmitSuccess: () => void;
}

const actionUrl = `/api/collectionissues/edit`;

export default function CollectionIssueEditForm(
  props: CollectionIssueEditFormProps
) {
  const appProps = useContext(AppContext);
  const { collectionId, issueId } = props;

  async function onEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const native = event.nativeEvent as SubmitEvent;
    const direction = native.submitter
      ? (native.submitter as HTMLButtonElement).name
      : null;

    const response = await callApi<CollectionIssueReOrderResponse>(actionUrl, {
      method: 'POST',
      body: JSON.stringify({
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
      id={`reOrderCollectionIssue_${collectionId}_${issueId}`}
      name="reOrderCollectionIssue"
      onSubmit={onEdit}
    >
      <div className={styles.buttonGroup}>
        <Button
          className={styles.directionButton}
          title="Move earlier in the collection"
          type="submit"
          name={ReOrderDirection.UP}
        >
          <span aria-hidden={true}>&#x25b2;</span>
        </Button>
        <Button
          className={styles.directionButton}
          title="Move later in the collection"
          type="submit"
          name={ReOrderDirection.DOWN}
        >
          <span aria-hidden={true}>&#x25bc;</span>
        </Button>
      </div>
    </form>
  );
}

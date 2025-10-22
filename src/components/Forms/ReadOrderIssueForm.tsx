'use client';
import { FormEvent, useContext, useState } from 'react';

import { CollectionViewModel } from '@/types/Collection';
import { ReadOrderIssueViewModel } from '@/types/ReadOrderIssue';
import { ReadOrderIssueResponse } from '@/types/Response';
import {
  IssueWithTitleInfoViewModel,
  IssueWithReadOrderInfoViewModel
} from '@/types/Issue';
import { AppContext } from '@/context';
import callApi from '@/utils/callApi';

import Input from '@/components/Input';
import InputSelect from '@/components/InputSelect';
import Button from '@/components/Button';
import ButtonGroup from '@/components/ButtonGroup';

import { filterReadOrderIssueOnUniqueCollection } from '@/utils/filters/issues';
import convertMethodToFormValidMethod from '@/utils/convertMethodToFormValidMethod';
import getFormattedIssueNumber from '@/utils/getFormattedIssueNumber';
import getCollectionFullName from '@/utils/getCollectionFullName';
import getReadOrderDropdownDisplayText from '@/utils/getReadOrderDropdownDisplayText';
import { getReadOrderIssueKey } from '@/utils/getReadOrderIssueKey';

import styles from './ReadOrderIssueForm.module.css';

interface ReadOrderIssueFormProps {
  method: string;
  action: string;
  data: Partial<ReadOrderIssueViewModel>;
  readOrderIssues: IssueWithReadOrderInfoViewModel[];
  collections: CollectionViewModel[];
  issues: IssueWithTitleInfoViewModel[];
  onSuccess: () => void;
}

export default function ReadOrderIssueForm(props: ReadOrderIssueFormProps) {
  const appProps = useContext(AppContext);
  const { data } = props;

  const [issueId, setIssueId] = useState(data.issueId);
  const [collectionId, setCollectionId] = useState(data.collectionId);
  const [beforeReadOrderIssueKey, setBeforeReadOrderIssueKey] = useState<
    string | undefined
  >(undefined);

  const existingEntries = props.readOrderIssues.filter(
    filterReadOrderIssueOnUniqueCollection
  );

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const payload = {
      readOrderId: data.readOrderId,
      collectionId,
      issueId,
      beforeReadOrderIssueKey
    };

    const response = await callApi<ReadOrderIssueResponse>(props.action, {
      method: props.method,
      body: JSON.stringify(payload)
    });

    if (response.success) {
      props.onSuccess();
    } else {
      appProps.dispatch({ type: 'ON_ERROR', messages: response.errorMessages });
    }
  }

  return (
    <div>
      <form
        method={convertMethodToFormValidMethod(props.method)}
        action={props.action}
        id="readOrderIssueForm"
        name="readOrderIssueForm"
        onSubmit={handleSubmit}
      >
        <Input
          type="hidden"
          id="readOrderId"
          name="readOrderId"
          value={data.readOrderId}
        />

        <div className={styles.grid}>
          <div>
            <InputSelect
              id="collectionId"
              name="collectionId"
              label="Collection"
              value={collectionId ?? undefined}
              onChange={(e) => {
                const value = e.target.value;
                setCollectionId(value ? Number(value) : undefined);
              }}
            >
              <option value="">Select a Collection</option>
              {props.collections.map((x) => (
                <option key={x.id} value={x.id}>
                  {getCollectionFullName(x, true)}
                </option>
              ))}
            </InputSelect>
            <InputSelect
              id="issueId"
              name="issueId"
              label="Issue"
              value={issueId}
              onChange={(e) => {
                const value = e.target.value;
                setIssueId(value ? Number(value) : undefined);
              }}
            >
              <option value="">Select an Issue</option>
              {props.issues.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.titleName} ({x.startYear}) {getFormattedIssueNumber(x)}{' '}
                  {x.isOneShot && '(One Shot)'}
                </option>
              ))}
            </InputSelect>
          </div>

          <div>
            <InputSelect
              id="beforeReadOrderIssueKey"
              name="beforeReadOrderIssueKey"
              label="Add Before Entry"
              value={beforeReadOrderIssueKey}
              onChange={(e) =>
                setBeforeReadOrderIssueKey(e.target.value || undefined)
              }
            >
              <option value="">Select an entry to preceed</option>
              {existingEntries.map((x) => {
                const key = getReadOrderIssueKey(x);
                const text = getReadOrderDropdownDisplayText(x);

                return (
                  <option key={key} value={key}>
                    {text}
                  </option>
                );
              })}
            </InputSelect>
          </div>
        </div>

        <ButtonGroup>
          <Button type="submit">Add</Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

import { FormEvent, useState } from 'react';

import { CollectionViewModel } from '@/types/Collection';
import { ReadOrderIssueViewModel } from '@/types/ReadOrderIssue';
import { ReadOrderIssueResponse } from '@/types/Response';
import { IssueWithTitleInfoViewModel } from '@/types/Issue';
import callApi from '@/utils/callApi';

import Input from '@/components/Input';
import InputSelect from '@/components/InputSelect';
import Button from '@/components/Button';
import ButtonGroup from '@/components/ButtonGroup';

import convertMethodToFormValidMethod from '@/utils/convertMethodToFormValidMethod';
import getFormattedIssueNumber from '@/utils/getFormattedIssueNumber';
import getCollectionFullName from '@/utils/getCollectionFullName';

interface ReadOrderIssueFormProps {
  method: string;
  action: string;
  data: Partial<ReadOrderIssueViewModel>;
  collections: CollectionViewModel[];
  issues: IssueWithTitleInfoViewModel[];
  onSuccess: () => void;
}

export default function ReadOrderIssueForm(props: ReadOrderIssueFormProps) {
  const { data } = props;
  const [issueId, setIssueId] = useState(data.issueId);
  const [collectionId, setCollectionId] = useState(data.collectionId);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const payload = {
      readOrderId: data.readOrderId,
      collectionId,
      issueId
    };

    const response = await callApi<ReadOrderIssueResponse>(props.action, {
      method: props.method,
      body: JSON.stringify(payload)
    });

    if (response.success) {
      props.onSuccess();
    } else {
      // TODO handle errors...
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
        <InputSelect
          id="collectionId"
          name="collectionId"
          label="Collection"
          value={collectionId}
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

        <ButtonGroup>
          <Button type="submit">Add</Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

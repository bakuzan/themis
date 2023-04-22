import { FormEvent, useState } from 'react';

import { CollectionIssueViewModel } from '@/types/CollectionIssue';
import { CollectionIssueResponse } from '@/types/Response';
import { IssueWithTitleInfoViewModel } from '@/types/Issue';
import callApi from '@/utils/callApi';

import Input from '@/components/Input';
import InputSelect from '@/components/InputSelect';
import Button from '@/components/Button';
import ButtonGroup from '@/components/ButtonGroup';

import convertMethodToFormValidMethod from '@/utils/convertMethodToFormValidMethod';
import getFormattedIssueNumber from '@/utils/getFormattedIssueNumber';

interface ReadOrderIssueFormProps {
  method: string;
  action: string;
  data: Partial<ReadOrderIssueViewModel>;
  issues: IssueWithTitleInfoViewModel[];
  onSuccess: (issue: IssueWithTitleInfoViewModel) => void;
}

export default function ReadOrderIssueForm(props: ReadOrderIssueFormProps) {
  const { data } = props;
  const [issueId, setIssueId] = useState(data.issueId);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const payload = {
      collectionId: data.collectionId,
      issueId
    };

    const response = await callApi<ReadOrderIssueResponse>(props.action, {
      method: props.method,
      body: JSON.stringify(payload)
    });

    if (response.success) {
      const issue = props.issues.find((x) => x.id === issueId);
      if (!issue) {
        throw new Error('This should never happen!');
      }

      props.onSuccess(issue);
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
          id="issueId"
          name="issueId"
          label="Issue"
          required
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
              {x.isAnnual && '(Annual)'} {x.isOneShot && '(One Shot)'}
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

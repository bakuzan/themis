import { FormEvent, useState } from 'react';

import callApi from '@/utils/callApi';
import { IssueViewModel } from '@/types/Issue';

import Input from '@/components/Input';
import Button from '@/components/Button';
import ButtonGroup from '@/components/ButtonGroup';
import convertMethodToFormValidMethod from '@/utils/convertMethodToFormValidMethod';
import { IssueResponse } from '@/types/Response';

interface IssueFromProps {
  method: string;
  action: string;
  data: Partial<IssueViewModel>;
  onSuccess: (issue: IssueViewModel) => void;
}

export default function IssueForm(props: IssueFromProps) {
  const data = props.data;
  const [issueNumber, setIssueNumber] = useState(data.number);
  const [name, setName] = useState(data.name);
  const [coverDate, setCoverDate] = useState(data.coverDate);
  const [isAnnual, setIsAnnual] = useState(data.isAnnual);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const payload = {
      id: data.id,
      titleId: data.titleId,
      number: issueNumber,
      name,
      coverDate,
      isAnnual
    };

    const response = await callApi<IssueResponse>(props.action, {
      method: props.method,
      body: JSON.stringify(payload)
    });

    if (response.success) {
      props.onSuccess({
        ...payload,
        id: (data.id ?? response.id) as number
      } as IssueViewModel);
    } else {
      // TODO handle errors...
    }
  }

  return (
    <div>
      <form
        method={convertMethodToFormValidMethod(props.method)}
        action={props.action}
        id="issueForm"
        name="issueForm"
        onSubmit={handleSubmit}
      >
        <Input type="hidden" id="id" name="id" value={data.id} />
        <Input type="hidden" id="titleId" name="titleId" value={data.titleId} />

        <Input
          type="number"
          id="number"
          name="number"
          label="Number"
          required
          value={issueNumber}
          onChange={(e) => setIssueNumber(Number(e.currentTarget.value))}
        />
        <Input
          type="text"
          id="name"
          name="name"
          label="Name"
          required
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <Input
          type="text"
          id="coverDate"
          name="coverDate"
          label="Cover Date"
          required
          pattern="^\d{4}\-(0?[1-9]|1[012])\$"
          value={coverDate}
          onChange={(e) => setCoverDate(e.currentTarget.value)}
        />
        <Input
          type="checkbox"
          id="isAnnual"
          name="isAnnual"
          label="Is Annual"
          checked={isAnnual}
          onChange={(e) => setIsAnnual(e.currentTarget.checked)}
        />

        <ButtonGroup>
          <Button type="submit">{data.id ? 'Save' : 'Create'}</Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

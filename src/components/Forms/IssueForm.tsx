import { FormEvent } from 'react';

// import callApi from '@/utils/callApi';

import Input from '@/components/Input';
import Button from '@/components/Button';
import ButtonGroup from '@/components/ButtonGroup';

interface IssueFromProps {
  method: string;
  action: string;
}

export default function IssueForm(props: IssueFromProps) {
  const data = { id: undefined };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <div>
      <form
        method={props.method}
        action={props.action}
        id="issueForm"
        name="issueForm"
        onSubmit={handleSubmit}
      >
        <Input type="hidden" id="id" value={data.id} />

        <ButtonGroup>
          <Button type="submit">Save</Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

import { TitleViewModel } from '@/types/Title';
import { TitleResponse } from '@/types/Response';
import callApi from '@/utils/callApi';

import Input from '@/components/Input';
import Button from '@/components/Button';
import ButtonGroup from '@/components/ButtonGroup';

interface TitleFromProps {
  method: string;
  action: string;
  data: Partial<TitleViewModel>;
}

export const OLDEST_START_YEAR = 1930;

export default function TitleForm(props: TitleFromProps) {
  const router = useRouter();

  const data = props.data;
  const [name, setName] = useState(data.name);
  const [startYear, setStartYear] = useState(data.startYear);
  const [isOneShot, setIsOneShot] = useState(data.isOneShot);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const response = await callApi<TitleResponse>(props.action, {
      method: props.method,
      body: JSON.stringify({ id: data.id, name, startYear, isOneShot })
    });
    if (response.success) {
      router.push(`/titles/${response.id}`);
    } else {
      // TODO handle errors...
    }
  }

  return (
    <div>
      <form
        method={props.method}
        action={props.action}
        id="titleForm"
        name="titleForm"
        style={{ maxWidth: 300 }}
        onSubmit={handleSubmit}
      >
        <Input type="hidden" id="id" value={data.id} />
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
          type="number"
          id="startYear"
          name="startYear"
          label="Start Year"
          required
          min={OLDEST_START_YEAR}
          max={2100}
          value={startYear}
          onChange={(e) => setStartYear(Number(e.currentTarget.value))}
        />
        <Input
          type="checkbox"
          id="isOneShot"
          name="isOneShot"
          label="Is One Shot"
          checked={isOneShot}
          onChange={(e) => setIsOneShot(e.currentTarget.checked)}
        />
        <ButtonGroup>
          <Button type="submit">Save</Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

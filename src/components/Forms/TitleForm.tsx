import { useRouter } from 'next/router';
import { FormEvent, useContext, useState } from 'react';

import { TitleViewModel } from '@/types/Title';
import { TitleResponse } from '@/types/Response';
import { AppContext } from '@/context';
import callApi from '@/utils/callApi';

import Input from '@/components/Input';
import Button from '@/components/Button';
import ButtonGroup from '@/components/ButtonGroup';
import convertMethodToFormValidMethod from '@/utils/convertMethodToFormValidMethod';
import { LATEST_START_YEAR, OLDEST_START_YEAR } from '@/constants';

interface TitleFromProps {
  method: string;
  action: string;
  data: Partial<TitleViewModel>;
}

export default function TitleForm(props: TitleFromProps) {
  const appProps = useContext(AppContext);
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
      appProps.dispatch({ type: 'ON_ERROR', messages: response.errorMessages });
    }
  }

  return (
    <div>
      <form
        method={convertMethodToFormValidMethod(props.method)}
        action={props.action}
        id="titleForm"
        name="titleForm"
        style={{ maxWidth: 300 }}
        onSubmit={handleSubmit}
      >
        <Input type="hidden" id="id" name="id" value={data.id} />
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
          max={LATEST_START_YEAR}
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
          <Button type="submit">{data.id ? 'Save' : 'Create'}</Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

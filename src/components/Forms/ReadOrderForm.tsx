'use client';
import { useRouter } from 'next/navigation';
import { FormEvent, useContext, useState } from 'react';

import { ReadOrderViewModel } from '@/types/ReadOrder';
import { ReadOrderResponse } from '@/types/Response';
import { AppContext } from '@/context';
import callApi from '@/utils/callApi';

import Input from '@/components/Input';
import Button from '@/components/Button';
import ButtonGroup from '@/components/ButtonGroup';
import convertMethodToFormValidMethod from '@/utils/convertMethodToFormValidMethod';

interface ReadOrderFromProps {
  method: string;
  action: string;
  data: Partial<ReadOrderViewModel>;
}

export default function TitleForm(props: ReadOrderFromProps) {
  const appProps = useContext(AppContext);
  const router = useRouter();

  const data = props.data;
  const [name, setName] = useState(data.name);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const response = await callApi<ReadOrderResponse>(props.action, {
      method: props.method,
      body: JSON.stringify({ id: data.id, name })
    });
    if (response.success) {
      router.push(`/readOrders/${response.id}`);
    } else {
      appProps.dispatch({ type: 'ON_ERROR', messages: response.errorMessages });
    }
  }

  return (
    <div>
      <form
        method={convertMethodToFormValidMethod(props.method)}
        action={props.action}
        id="readOrderForm"
        name="readOrderForm"
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

        <ButtonGroup>
          <Button type="submit">{data.id ? 'Save' : 'Create'}</Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

'use client';
import { FormEvent, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ReadOrderViewModel } from '@/types/ReadOrder';
import { ReadHistoryResponse } from '@/types/Response';
import { AppContext } from '@/context';
import callApi from '@/utils/callApi';
import convertMethodToFormValidMethod from '@/utils/convertMethodToFormValidMethod';

import InputSelect from '@/components/InputSelect';
import Button from '@/components/Button';
import ButtonGroup from '@/components/ButtonGroup';

import styles from './ReadHistoryForm.module.css';

interface ReadHistoryFormProps {
  method: string;
  action: string;
  readOrders: ReadOrderViewModel[];
}

export default function ReadHistoryForm(props: ReadHistoryFormProps) {
  const appProps = useContext(AppContext);
  const router = useRouter();
  const [readOrderId, setReadOrderId] = useState<number>();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const payload = {
      readOrderId
    };

    const response = await callApi<ReadHistoryResponse>(props.action, {
      method: props.method,
      body: JSON.stringify(payload)
    });

    if (response.success) {
      router.push(`/readHistory/${response.id}`);
    } else {
      appProps.dispatch({ type: 'ON_ERROR', messages: response.errorMessages });
    }
  }

  return (
    <form
      method={convertMethodToFormValidMethod(props.method)}
      action={props.action}
      id="readHistoryForm"
      name="readHistoryForm"
      onSubmit={handleSubmit}
    >
      <div className={styles.innerContainer}>
        <InputSelect
          id="readOrderId"
          name="readOrderId"
          label="Read Order"
          value={readOrderId}
          required
          onChange={(e) => {
            const value = e.target.value;
            setReadOrderId(value ? Number(value) : undefined);
          }}
        >
          <option value="">Select a Read Order</option>
          {props.readOrders.map((x) => (
            <option key={x.id} value={x.id}>
              {x.name}
            </option>
          ))}
        </InputSelect>

        <ButtonGroup style={{ paddingTop: 5 }}>
          <Button type="submit">Start</Button>
        </ButtonGroup>
      </div>
    </form>
  );
}

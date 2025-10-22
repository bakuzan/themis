'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useContext, useState } from 'react';

import { CollectionViewModel } from '@/types/Collection';
import { CollectionResponse } from '@/types/Response';
import { AppContext } from '@/context';
import { LATEST_START_YEAR, OLDEST_START_YEAR } from '@/constants';
import callApi from '@/utils/callApi';

import Input from '@/components/Input';
import Button from '@/components/Button';
import ButtonGroup from '@/components/ButtonGroup';

import convertMethodToFormValidMethod from '@/utils/convertMethodToFormValidMethod';

interface CollectionFromProps {
  method: string;
  action: string;
  data: Partial<CollectionViewModel>;
}

export default function CollectionForm(props: CollectionFromProps) {
  const appProps = useContext(AppContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const data = props.data;
  const [name, setName] = useState(data.name);
  const [publicationDate, setPublicationDate] = useState(data.publicationDate);
  const [collectionNumber, setCollectionNumber] = useState(data.number);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const response = await callApi<CollectionResponse>(props.action, {
      method: props.method,
      body: JSON.stringify({
        id: data.id,
        name,
        publicationDate,
        number: collectionNumber ?? null
      })
    });

    if (response.success) {
      const query = searchParams?.toString();
      const suffix = query ? `?${query}` : '';
      router.push(`/collections/${response.id}${suffix}`);
    } else {
      appProps.dispatch({ type: 'ON_ERROR', messages: response.errorMessages });
    }
  }

  return (
    <div>
      <form
        method={convertMethodToFormValidMethod(props.method)}
        action={props.action}
        id="collectionForm"
        name="collectionForm"
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
          id="publicationDate"
          name="publicationDate"
          label="Publication Date"
          required
          min={OLDEST_START_YEAR}
          max={LATEST_START_YEAR}
          value={publicationDate}
          onChange={(e) => setPublicationDate(Number(e.currentTarget.value))}
        />
        <Input
          type="number"
          id="number"
          name="number"
          label="Number"
          value={collectionNumber ?? undefined}
          onChange={(e) => {
            const val = e.currentTarget.value;
            setCollectionNumber(val ? Number(val) : undefined);
          }}
        />

        <ButtonGroup>
          <Button type="submit">{data.id ? 'Save' : 'Create'}</Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

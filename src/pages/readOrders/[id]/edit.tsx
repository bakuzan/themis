import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';

import { getReadOrderById } from '@/api/readOrders';
import { ReadOrderViewModel } from '@/types/ReadOrder';

import ReadOrderForm from '@/components/Forms/ReadOrderForm';
import PageHead from '@/components/PageHead';

interface ReadOrdersEditProps {
  item: ReadOrderViewModel;
}

const metadata = {
  title: 'Edit Read Order'
};

export default function ReadOrdersEdit(props: ReadOrdersEditProps) {
  const data = props.item;

  return (
    <section>
      <PageHead title={metadata.title} />
      <header className="header">
        <h1>{metadata.title}</h1>
        <div>
          <Link href={`/readOrders/${data.id}`}>Back</Link>
        </div>
      </header>
      <ReadOrderForm
        method="PUT"
        action={`/api/readOrders/${data.id}`}
        data={data}
      />
    </section>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const { id } = context.params ?? {};
  if (!id) {
    throw new Error(`readOrders/[id]/edit was called without an id!`);
  }

  const item = getReadOrderById(Number(id));

  return {
    props: { item }
  };
}

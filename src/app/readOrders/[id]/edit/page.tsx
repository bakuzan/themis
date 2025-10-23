import Link from 'next/link';

import { PageProps } from '@/types/PageProps';

import { getReadOrderById } from '@/database/readOrders';

import ReadOrderForm from '@/components/Forms/ReadOrderForm';
import getPageTitle from '@/utils/getPageTitle';

export const metadata = {
  title: getPageTitle('Edit Read Order')
};

export default async function ReadOrdersEdit({ params }: PageProps) {
  const { id } = await params;
  const data = await getReadOrderById(Number(id));

  return (
    <section>
      <header className="header">
        <h1>Edit Read Order</h1>
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

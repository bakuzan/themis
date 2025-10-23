import Link from 'next/link';

import ReadOrderForm from '@/components/Forms/ReadOrderForm';

import getPageTitle from '@/utils/getPageTitle';

export const metadata = {
  title: getPageTitle('Create Read Order')
};

export default function ReadOrdersNew() {
  return (
    <section>
      <header className="header">
        <h1>Create Read Order</h1>
        <div>
          <Link href="/readOrders">Back</Link>
        </div>
      </header>
      <ReadOrderForm
        method="POST"
        action="/api/readOrders"
        data={{ name: '' }}
      />
    </section>
  );
}

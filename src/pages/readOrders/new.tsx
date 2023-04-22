import Link from 'next/link';

import ReadOrderForm from '@/components/Forms/ReadOrderForm';

import PageHead from '@/components/PageHead';

export const metadata = {
  title: 'Create Read Order'
};

export default function ReadOrdersNew() {
  return (
    <section>
      <PageHead title={metadata.title} />
      <header className="header">
        <h1>{metadata.title}</h1>
        <div>
          <Link href="/readOrders">Back</Link>
        </div>
      </header>
      <ReadOrderForm
        method="POST"
        action="/api/readOrders/new"
        data={{ name: '' }}
      />
    </section>
  );
}

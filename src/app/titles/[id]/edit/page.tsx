import Link from 'next/link';

import { getTitleById } from '@/database/titles';

import TitleForm from '@/components/Forms/TitleForm';
import getPageTitle from '@/utils/getPageTitle';

type PageProps = {
  params: { id: string };
};

export const metadata = {
  title: getPageTitle('Edit Title')
};

export default async function TitlesEdit({ params }: PageProps) {
  const { id } = await params;
  const data = await getTitleById(Number(id));

  return (
    <section>
      <header className="header">
        <h1>Edit Title</h1>
        <div>
          <Link href={`/titles/${data.id}`}>Back</Link>
        </div>
      </header>
      <TitleForm method="PUT" action={`/api/titles/${data.id}`} data={data} />
    </section>
  );
}

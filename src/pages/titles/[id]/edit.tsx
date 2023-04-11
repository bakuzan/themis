import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';

import { getTitleById } from '@/api/titles';
import { TitleViewModel } from '@/types/Title';

import TitleForm from '@/components/Forms/TitleForm';
import PageHead from '@/components/PageHead';

interface TitleEditProps {
  item: TitleViewModel;
}

const metadata = {
  title: 'Edit Title'
};

export default function TitlesEdit(props: TitleEditProps) {
  const data = props.item;

  return (
    <section>
      <PageHead title={metadata.title} />
      <header className="header">
        <h1>{metadata.title}</h1>
        <div>
          <Link href={`/titles/${data.id}`}>Back</Link>
        </div>
      </header>
      <TitleForm method="PUT" action={`/api/titles/${data.id}`} data={data} />
    </section>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const { id } = context.params ?? {};
  if (!id) {
    throw new Error(`titles/[id]/edit was called without an id!`);
  }

  const item = getTitleById(Number(id));

  return {
    props: { item }
  };
}

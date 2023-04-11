import Head from 'next/head';

interface PageHeadProps {
  title?: string;
}

export default function PageHead(props: PageHeadProps) {
  const pageTitle = props.title ? `${props.title} | Themis` : 'Themis';

  return (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  );
}

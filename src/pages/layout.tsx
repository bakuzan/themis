import * as React from 'react';
import Head from 'next/head';

import NavBar from '@/components/NavBar';

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <React.Fragment>
      <Head>
        <title>Themis</title>
        <meta
          name="description"
          content="Comic book cataloguer and read ristory tracking"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar key="NAV" />
      <main key="MAIN">{children}</main>
    </React.Fragment>
  );
}

import '@/styles/globals.css';
import { Metadata } from 'next';

import AppAlertWrapper from '@/components/AppAlertWrapper';
import NavBar from '@/components/NavBar';

export const metadata: Metadata = {
  title: 'Themis',
  description: 'Comic book cataloguer and read ristory tracking',
  icons: ['/favicon.ico']
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>
          <AppAlertWrapper>{children}</AppAlertWrapper>
        </main>
      </body>
    </html>
  );
}

import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './NavBar';
import { Container, Theme, ThemePanel } from '@radix-ui/themes';

const inter = Inter({
  subsets: ['latin'],
  // display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Issues Tracker',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={inter.variable}>
      <body>
        <Theme accentColor='violet'>
          <NavBar />
          <main className='p-5'>
            {' '}
            <Container>{children}</Container>
          </main>

          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}

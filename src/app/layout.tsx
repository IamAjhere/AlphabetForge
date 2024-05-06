import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import NavigationBar from '@/components/nav-bar';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alphabet Forge',
  description:
    'Alphabet Forge is an engaging word-building game where players craft words from a set of randomly generated alphabets. With each letter chosen strategically, players expand their word, aiming to create valid words with meanings. Explore your vocabulary prowess as you forge your way through an array of letters, uncovering words and their definitions along the way',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <NavigationBar />
          <main className='flex flex-col items-center justify-between p-12 sm:p-24'>
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

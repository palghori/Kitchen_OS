import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

import PWA from './pwa';

export const metadata: Metadata = {
  title: 'KitchenOS',
  description: 'Enterprise Dark Kitchen Operating System',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PWA />
        {children}
      </body>
    </html>
  );
}

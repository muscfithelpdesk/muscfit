import { Inter, Barlow, Barlow_Condensed } from 'next/font/google';
import '@/styles/index.css';
import ClientProviders from '@/components/ClientProviders';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const barlow = Barlow({
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-barlow',
});

const barlowCondensed = Barlow_Condensed({
  weight: ['900'],
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
});

export const metadata = {
  title: 'MuscFIT | Something Big Is Coming',
  description:
    'Witness the rebirth of elite athletic performance. MUSCFIT — built for the ones who train different. Launching soon.',

  icons: {
    icon: '/logo-v5.png',
    shortcut: '/logo-v5.png',
    apple: '/logo-v5.png',
  },
};

import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="font-body bg-black">
        <ClientProviders>
          {children}
          <Analytics />
        </ClientProviders>
      </body>
    </html>
  );
}

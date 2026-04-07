import { Inter, Outfit, Anton, Bebas_Neue } from 'next/font/google';
import '@/styles/index.css';
import ClientProviders from '@/components/ClientProviders';
import ChatbotPopup from '@/components/common/ChatbotPopup';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
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
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${anton.variable} ${bebasNeue.variable}`}>
      <body className="font-body bg-black">
        <ClientProviders>
          {children}
          <Analytics />
        </ClientProviders>
      </body>
    </html>
  );
}

import { Inter, Outfit, Anton } from 'next/font/google';
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

export const metadata = {
  title: 'MuscFIT',
  description:
    'Discover premium fitness apparel designed for peak performance. Shop high-quality athletic wear including compression gear, training essentials, and lifestyle collections for men and women.',

  icons: {
    icon: '/logo-v5.png',
    shortcut: '/logo-v5.png',
    apple: '/logo-v5.png',
  },
};

import AdminQuickLink from '@/components/admin/AdminQuickLink';

import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${anton.variable}`}>
      <body className="font-body">
        <ClientProviders>
          {children}
          <AdminQuickLink />
          <ChatbotPopup />
          <Analytics />
        </ClientProviders>
      </body>
    </html>
  );
}

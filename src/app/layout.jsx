import { Inter, Outfit } from 'next/font/google';
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

export const metadata = {
  title: 'MuscFIT',
  description:
    'Discover premium fitness apparel designed for peak performance. Shop high-quality athletic wear including compression gear, training essentials, and lifestyle collections for men and women.',

  icons: {
    icon: '/logo-v2.png',
    shortcut: '/logo-v2.png',
    apple: '/logo-v2.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-body">
        <ClientProviders>
          {children}
          <ChatbotPopup />
        </ClientProviders>
      </body>
    </html>
  );
}

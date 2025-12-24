'use client';

import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import '@/styles/index.css';
import Header from '@/components/common/Header';
import PromoBar from '@/app/homepage/components/PromoBar';
import { AuthProvider } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  // Check if current page is an admin page
  const isAdminPage = pathname?.startsWith('/admin-');

  return (
    <html lang="en">
      <body className={inter?.className}>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <AuthProvider>
          {!isAdminPage && (
            <PromoBar message="Join the MUSCFIT family - Sign up for exclusive offers!" dismissible />
          )}
          <Header />
          {children}
        </AuthProvider>

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fmuscfit9587back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.12" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></body>
    </html>
  );
}
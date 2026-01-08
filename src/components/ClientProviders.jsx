'use client';

import { Suspense } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export default function ClientProviders({ children }) {
    return (
        <>
            <Suspense fallback={null}>
                <GoogleAnalytics />
            </Suspense>
            <AuthProvider>
                {children}
            </AuthProvider>

            <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fmuscfit9587back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.12" />
            <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" />
        </>
    );
}

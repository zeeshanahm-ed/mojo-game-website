'use client';

import { ReactNode } from 'react';
import './i18n';
import ClientLayoutWrapper from './ClientLayoutWrapper';
import { AuthProvider } from './context/AuthContext';

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <ClientLayoutWrapper>
                {children}
            </ClientLayoutWrapper>
        </AuthProvider>
    );
}
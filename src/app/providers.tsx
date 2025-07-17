'use client';

import { ReactNode } from 'react';
import './i18n';
import ClientLayoutWrapper from './ClientLayoutWrapper';
import { AuthProvider } from './context/AuthContext';
import { Bounce, ToastContainer } from 'react-toastify';

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <>
            <AuthProvider>
                <ClientLayoutWrapper>
                    {children}
                </ClientLayoutWrapper>
            </AuthProvider>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </>
    );
}
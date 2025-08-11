'use client';

import { ReactNode } from 'react';
import './i18n';
import ClientLayoutWrapper from './ClientLayoutWrapper';
import { AuthProvider } from './context/AuthContext';
import { Bounce, ToastContainer } from 'react-toastify';
import { setupAxios } from './helpers/auth-helper';
import { QueryClient, QueryClientProvider } from 'react-query';
import requestConfigs from './config/request-configs';

export default function Providers({ children }: { children: ReactNode }) {
    setupAxios();
    const queryClient = new QueryClient(requestConfigs);
    return (
        <>
            <QueryClientProvider client={queryClient}>
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
            </QueryClientProvider>
        </>
    );
}
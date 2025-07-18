import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purpl-100">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
                {children}
            </div>
        </main>
    );
}
'use client';

import { usePathname } from 'next/navigation';
import Header from './components/ui/common/Header';
import Footer from './components/ui/common/Footer';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideHeaderOn = '/game-play';

    return (
        <div className="min-h-screen flex flex-col">
            {pathname !== hideHeaderOn && <Header />}

            <main className="flex-grow">
                {children}
            </main>

            <Footer />
        </div>
    );
}

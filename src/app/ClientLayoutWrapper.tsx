'use client';

import { usePathname } from 'next/navigation';
import Header from './components/ui/common/Header';
import Footer from './components/ui/common/Footer';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideHeaderOn = '/game-play';

    return (
        <>
            {pathname !== hideHeaderOn && <Header />}
            {children}
            <Footer />
        </>
    );
}
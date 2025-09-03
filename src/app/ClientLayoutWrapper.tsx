'use client';

import { usePathname } from 'next/navigation';
import Header from './components/ui/common/Header';
import Footer from './components/ui/common/Footer';
import ScrollToTop from './components/utils/ScrollToTop';
import { useEffect } from 'react';
import { useDirection } from './hooks/useGetDirection';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideHeaderOn = '/game-play';
    const direction = useDirection();
    const isArabic = direction === 'rtl';

    useEffect(() => {
        if (isArabic) {
            document.body.style.setProperty(
                "font-family",
                "var(--font-arabic), sans-serif",
                "important"
            );
        } else {
            document.body.style.setProperty(
                "font-family",
                "var(--font-popfun), sans-serif"
            );
        }
    }, [isArabic]);



    return (
        <div className="min-h-screen flex flex-col">
            {pathname !== hideHeaderOn && <Header />}
            <ScrollToTop />
            <main className="flex-grow">
                {children}
            </main>

            <Footer />
        </div>
    );
}

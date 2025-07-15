'use client';

import { usePathname } from 'next/navigation';
import Header from './components/ui/common/Header';
import Footer from './components/ui/common/Footer';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideHeaderOn = '/game-play';

    return (
        <div className="flex flex-col">
            {pathname !== hideHeaderOn && <Header />}
            {children}
            <div className='relative bottom-0 left-0 right-0'>
                <Footer />
            </div>
        </div>
    );
}
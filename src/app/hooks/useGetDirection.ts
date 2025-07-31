'use client';

import { useState, useEffect } from 'react';

type Direction = 'ltr' | 'rtl';

const getLangFromCookie = (): string | null => {
    if (typeof document !== 'undefined') {
        const match = document.cookie.match(/(?:^|; )language=([^;]+)/);
        return match ? decodeURIComponent(match[1]) : null;
    }
    return null;
};

const getLangFromLocalStorage = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('i18nextLng');
    }
    return null;
};

const resolveDirection = (lang: string | null): Direction =>
    lang === 'sa' || lang?.startsWith('ar') ? 'rtl' : 'ltr';

export function useDirection(initialLang?: string): Direction {
    const [direction, setDirection] = useState<Direction>(() =>
        resolveDirection(initialLang || getLangFromCookie() || getLangFromLocalStorage())
    );

    useEffect(() => {
        const lang = getLangFromLocalStorage() || getLangFromCookie();
        setDirection(resolveDirection(lang));
    }, []);

    return direction;
}

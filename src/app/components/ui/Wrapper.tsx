'use client';

import { ReactNode } from 'react';

interface WrapperProps {
    children: ReactNode;
    className?: string;
}

export default function Wrapper({ children, className = '' }: WrapperProps) {
    return (
        <div className={`m-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
}
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: 'en', label: 'ENG', },
        { code: 'ar', label: 'ARABIC', }
    ];

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const changeLanguage = (langCode: string) => {
        i18n.changeLanguage(langCode);
        localStorage.setItem("i18nextLng", langCode);
        setIsOpen(false);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={toggleMenu}
            >
                {/* Globe Icon */}
                <Image src="/images/icons/translate-icon.svg" alt='translate-icon' width={20} height={20} />

                {/* Language Text */}
                <span className="text-black font-bold text-lg">
                    {currentLanguage.label}
                </span>

                {/* Dropdown Arrow */}
                <svg
                    className={`w-4 h-4 text-black ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 w-40 overflow-hidden z-50">
                    {languages.map((language) => (
                        <div
                            key={language.code}
                            className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${currentLanguage.code === language.code
                                ? 'bg-red-50 text-red-600 font-medium'
                                : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            onClick={() => changeLanguage(language.code)}
                        >
                            {language.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
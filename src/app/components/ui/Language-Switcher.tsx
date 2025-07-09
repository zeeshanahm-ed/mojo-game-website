'use client';

import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value;
        i18n.changeLanguage(lang);
        localStorage.setItem("i18nextLng", lang)
    };

    return (
        <select
            onChange={changeLanguage}
            defaultValue={i18n.language}
            className="select bg-white border border-black"
        >
            <option value="en">English</option>
            <option value="sa">العربية</option>
        </select>
    );
}

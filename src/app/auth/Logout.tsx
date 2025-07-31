'use client';
import React from 'react';
import Button from '../components/ui/common/Button';
import { useAuthModalStore } from '../store/useAuthModalStore';
import { useTranslation } from 'react-i18next';


export default function Logout() {
    const closeModal = useAuthModalStore((state) => state.closeModal);
    const { t } = useTranslation();
    const handleLogout = () => {
        // TODO: Implement logout logic
        // Close modal
        closeModal();
    };
    return (
        <section>
            <div className="text-center md:px-20 sm:px-10 px-5 py-10 space-y-6">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-popfun">
                    {t("logoutTitle")}
                </h2>
                <div className='flex justify-evenly '>
                    <Button className='text-5xl w-44' onClick={closeModal}>{t("no")}</Button>
                    <Button className='text-5xl w-44' onClick={handleLogout}>{t("yes")}</Button>
                </div>
            </div>
        </section>
    );
}
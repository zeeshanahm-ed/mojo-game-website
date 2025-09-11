'use client';
import React, { useEffect, useState } from 'react';
import Button from '../components/ui/common/Button';
import { useAuthModalStore } from '../store/useAuthModalStore';
import { useTranslation } from 'react-i18next';
import Input from '../components/ui/common/Input';
import { showErrorMessage, showSuccessMessage } from '../utils/messageUtils';
import { forgotPassCode } from './core/_requests';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useDirection } from '../hooks/useGetDirection';


interface ForgotPasswordProps {
    setLoading: (loading: boolean) => void;
    loading: boolean;
    resetState: boolean;
    setResetState: (resetState: boolean) => void;
}

interface ValidationErrors {
    [key: string]: string;
}

export default function ForgotPassword({ setLoading, loading, resetState: resetStateonClose, setResetState: setResetStateonClose }: ForgotPasswordProps) {
    const { openModal } = useAuthModalStore((state) => state);
    const { t } = useTranslation();
    const [values, setValues] = useState({ email: '' });
    const [formErrors, setFormErrors] = useState<ValidationErrors>({});
    const direction = useDirection();

    useEffect(() => {
        if (resetStateonClose) {
            resetState();
            setResetStateonClose(false);
        }
    }, [setResetStateonClose]);

    const resetState = () => {
        setValues({ email: '' });
        setFormErrors({});
    }

    const emailValidation = () => {
        const errors: ValidationErrors = {};

        if (!values.email.trim()) {
            errors.email = t('errors.emailRequired');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
            errors.email = t('errors.emailInvalid');
        }
        return errors;
    }

    const handleOk = async () => {
        setLoading(true);
        const email = values.email.trim();
        localStorage.setItem("forgotEmail", email);
        const body = { email };
        try {
            await forgotPassCode(body);
            showSuccessMessage(t("passwordResetOtpSent"));
            openModal("verifyOtp");
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                showErrorMessage(error.message);
            } else {
                showErrorMessage(t('unknownError'));
            }
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendEmail = () => {
        const error = emailValidation();
        if (Object.keys(error).length > 0) {
            setFormErrors(error);
            return;
        } else {
            handleOk();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: '' }));
    };

    return (
        <section>
            <div className="text-center md:px-20 sm:px-10 px-5 py-10 space-y-6">
                <div>
                    <Input
                        name="email"
                        onChange={handleInputChange}
                        icon={<Image src="/images/icons/password-icon.svg"
                            alt='email-icon' width={20} height={20} />}
                        type='email'
                        placeholder={t('emailPlaceholder')}
                    />
                    {formErrors.email && <p className={`${direction === "rtl" ? "font-arabic" : "font-secondary"} text-start text-red mt-1`}>{formErrors.email}</p>}
                </div>
                <p className={`${direction === "rtl" ? "font-arabic" : "font-secondary"}`}>{t("resetPasswordNote")}</p>
                <Button disabled={loading} className={`${direction === "rtl" ? "text-xl md:text-2xl" : "md:text-4xl text-2xl"} w-32 md:w-44`} onClick={handleSendEmail}>{t("send")}</Button>
            </div>
        </section>
    );
}
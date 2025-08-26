'use client';
import React, { useState } from 'react';
import Button from '../components/ui/common/Button';
import { useAuthModalStore } from '../store/useAuthModalStore';
import { useTranslation } from 'react-i18next';
import Input from '../components/ui/common/Input';
import EmailIcon from '../assets/icons/email-icon.svg';
import { showErrorMessage, showSuccessMessage } from '../utils/messageUtils';
import { forgotPassCode } from './core/_requests';
import { AxiosError } from 'axios';


interface ForgotPasswordProps {
    setLoading: (loading: boolean) => void;
    loading: boolean;
}

interface ValidationErrors {
    [key: string]: string;
}

export default function ForgotPassword({ setLoading, loading }: ForgotPasswordProps) {
    const { openModal } = useAuthModalStore((state) => state);
    const { t } = useTranslation();
    const [values, setValues] = useState({ email: '' });
    const [formErrors, setFormErrors] = useState<ValidationErrors>({});

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
                    <Input name="email" onChange={handleInputChange} icon={<EmailIcon />} type='email' placeholder={t('emailPlaceholder')} />
                    {formErrors.email && <p className='font-secondary text-start text-red mt-1'>{formErrors.email}</p>}
                </div>
                <p className='font-secondary'>{t("resetPasswordNote")}</p>
                <Button disabled={loading} className='md:text-4xl text-2xl w-32 md:w-44' onClick={handleSendEmail}>{t("send")}</Button>
            </div>
        </section>
    );
}
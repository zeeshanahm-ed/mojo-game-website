'use client';
import React, { useState } from 'react';
import Button from '../components/ui/common/Button';
import { useAuthModalStore } from '../store/useAuthModalStore';
import { useTranslation } from 'react-i18next';
import Input from '../components/ui/common/Input';
import { showErrorMessage, showSuccessMessage } from '../utils/messageUtils';
import { resetPassword } from './core/_requests';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useDirection } from '../hooks/useGetDirection';


interface ForgotPasswordProps {
    setLoading: (loading: boolean) => void;
    loading: boolean;
}

interface ValidationErrors {
    [key: string]: string;
}

export default function ResetPassword({ setLoading, loading }: ForgotPasswordProps) {
    const { openModal } = useAuthModalStore((state) => state);
    const { t } = useTranslation();
    const [values, setValues] = useState({ newPassword: '', confirmPassword: "" });
    const [formErrors, setFormErrors] = useState<ValidationErrors>({});
    const forgotEmail = localStorage.getItem('forgotEmail');
    const verifiedOtp = localStorage.getItem('verifiedOtp');
    const direction = useDirection();

    const passwordValidation = () => {
        const errors: ValidationErrors = {};

        if (!values.newPassword.trim()) {
            errors.newPassword = t("newPasswordRequired");
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(values.newPassword)) {
            errors.newPassword = t('errors.passwordInvalid');
        }
        if (!values.confirmPassword.trim()) {
            errors.confirmPassword = t("confirmPasswordRequired");
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(values.confirmPassword)) {
            errors.confirmPassword = t('errors.passwordInvalid');
        }
        if (values.newPassword !== values.confirmPassword) {
            errors.confirmPassword = t('confirmPasswordMismatch');
        }
        return errors;
    }

    const handleOk = async () => {
        setLoading(true);
        const body = {
            email: forgotEmail,
            newPassword: values?.newPassword,
            confirmPassword: values?.confirmPassword,
            otp: verifiedOtp
        }
        try {
            await resetPassword(body);
            showSuccessMessage(t("passwordResetSuccess"));
            openModal("signin");
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                showErrorMessage(error.message);
            } else {
                showErrorMessage(t('unknownError'));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChangePass = () => {
        const error = passwordValidation();
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
                <div >
                    <Input name="newPassword" onChange={handleInputChange} icon={<Image src="/images/icons/password-icon.svg" alt='email-icon' width={20} height={20} />} type='password' placeholder={t("newPassword")} />
                    {formErrors.newPassword && <p className={`${direction === "rtl" ? "font-arabic" : "font-secondary"} text-start text-red mt-1`}>{formErrors.newPassword}</p>}
                </div>
                <div>
                    <Input name="confirmPassword" onChange={handleInputChange} icon={<Image src="/images/icons/password-icon.svg" alt='email-icon' width={20} height={20} />} type='password' placeholder={t("confirmPassword")} />
                    {formErrors.confirmPassword && <p className={`${direction === "rtl" ? "font-arabic" : "font-secondary"} text-start text-red mt-1`}>{formErrors.confirmPassword}</p>}
                </div>
                <Button disabled={loading} className={`${direction === "rtl" ? "text-xl md:text-2xl w-fit" : "md:text-4xl text-2xl w-32 md:w-52"} `} onClick={handleChangePass}>{t("changePassword")}</Button>
            </div>
        </section>
    );
}
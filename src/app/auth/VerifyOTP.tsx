'use client';
import React, { useEffect, useRef, useState } from 'react';
import Button from '../components/ui/common/Button';
import { useAuthModalStore } from '../store/useAuthModalStore';
import { useTranslation } from 'react-i18next';
import { showErrorMessage, showSuccessMessage } from '../utils/messageUtils';
import { forgotPassCode, verifyOtp } from './core/_requests';
import { AxiosError } from 'axios';
import { useDirection } from '../hooks/useGetDirection';


interface ForgotPasswordProps {
    setLoading: (loading: boolean) => void;
    loading: boolean;
    resetState: boolean;
    setResetState: (resetState: boolean) => void;
}

const length = 6;

export default function VerifyOTP({ setLoading, loading, resetState: resetStateonClose, setResetState: setResetStateonClose }: ForgotPasswordProps) {
    const { openModal } = useAuthModalStore((state) => state);
    const { t } = useTranslation();
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
    const [error, setError] = useState<string>('');
    const [timer, setTimer] = useState<number>(60);
    const [canResend, setCanResend] = useState<boolean>(false);
    const forgotEmail = localStorage.getItem('forgotEmail');
    const direction = useDirection();

    const inputRefs = useRef<HTMLInputElement[] | undefined>([]);

    // Timer countdown
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0 && !canResend) {
            interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
        } else if (timer === 0) {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer, canResend]);

    useEffect(() => {
        if (resetStateonClose) {
            resetState();
            setResetStateonClose(false);
        }
    }, [setResetStateonClose]);

    const resetState = () => {
        setOtp(new Array(length).fill(''));
        setError('');
        setTimer(60);
        setCanResend(false);
    }

    // Focus first input on mount
    useEffect(() => {
        if (inputRefs?.current?.[0]) {
            inputRefs?.current[0].focus();
        }
    }, []);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        setError('');

        // // Move to next input if value entered
        if (value && index < length - 1 && inputRefs?.current?.[index + 1]) {
            inputRefs?.current?.[index + 1].focus();
        }

        // // Check if OTP is complete
        const otpValue = newOtp.join('');
        if (otpValue.length === length) {
            inputRefs?.current?.[length - 1]?.blur();
        }
    };

    const handleOk = async (otpValue: string) => {
        setLoading(true);

        const body = {
            email: forgotEmail,
            otp: otpValue
        }

        try {
            await verifyOtp(body);
            showSuccessMessage(t('otpVerified'));
            localStorage.setItem('verifiedOtp', otpValue);
            openModal("resetPassword")
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



    const handleVerifyOtp = () => {
        const otpValue = otp.join('')
        if (otpValue.length < length) {
            setError(t('otpIncomplete'));
            setLoading(false);
            return;
        } else {
            handleOk(otpValue);
        }
    };


    const handleResendOTP = async () => {
        setTimer(60);
        setCanResend(false);
        setOtp(new Array(length).fill(''));
        setError('');
        if (inputRefs?.current?.[0]) {
            inputRefs.current[0].focus();
        }
        try {
            await forgotPassCode({ email: forgotEmail });
            showSuccessMessage(t('otpResent'));
        } catch (error) {
            showErrorMessage(t('otpResendError'));
            console.error(error);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs?.current?.[index - 1].focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text');
        const pasteArray = paste.slice(0, length).split('');

        if (pasteArray.every(char => !isNaN(Number(char)))) {
            const newOtp = [...otp];
            pasteArray.forEach((char, index) => {
                if (index < length) {
                    newOtp[index] = char;
                }
            });
            setOtp(newOtp);

            // Focus last filled input or next empty ones
            const lastIndex = Math.min(pasteArray.length - 1, length - 1);
            if (inputRefs?.current?.[lastIndex]) {
                inputRefs.current[lastIndex].focus();
            }
        }
    };

    return (
        <section>
            <div className="text-center md:px-20 sm:px-10 px-5 py-10 space-y-6">
                <div>
                    <div className="flex justify-center gap-3 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el: HTMLInputElement | null) => { if (inputRefs.current) inputRefs.current[index] = el!; }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={(e) => handlePaste(e)}
                                className={`w-14 ${direction === "rtl" ? "font-arabic" : "font-secondary"} bg-gray-200 h-14 rounded-lg text-center text-lg focus:outline-none focus:border-dark-gray focus:border-2`}
                            />
                        ))}
                    </div>
                    {error && <p className={`${direction === "rtl" ? "font-arabic" : "font-secondary"} text-red`}>{error}</p>}

                </div>
                <p className={`${direction === "rtl" ? "font-arabic" : "font-secondary"}`}>{t("enterOtp")}</p>
                <div className='flex gap-x-6 items-center justify-center'>
                    <Button disabled={loading} className={`${direction === "rtl" ? "text-xl md:text-2xl" : "md:text-4xl text-2xl"} w-32 md:w-44`} onClick={handleVerifyOtp}>{t("submit")}</Button>
                    <Button className={`${timer ? "cursor-not-allowed pointer-events-none" : ""} ${direction === "rtl" ? "text-xl md:text-2xl w-fit " : "md:text-4xl text-2xl w-32 md:w-44"} `} onClick={handleResendOTP}>{timer ? timer : t("resendOtp")}</Button>
                </div>
            </div>
        </section>
    );
}
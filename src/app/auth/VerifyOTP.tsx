'use client';
import React, { useEffect, useRef, useState } from 'react';
import Button from '../components/ui/common/Button';
import { useAuthModalStore } from '../store/useAuthModalStore';
// import { useTranslation } from 'react-i18next';
import { showErrorMessage, showSuccessMessage } from '../utils/messageUtils';
import { forgotPassCode, verifyOtp } from './core/_requests';
import { AxiosError } from 'axios';


interface ForgotPasswordProps {
    setLoading: (loading: boolean) => void;
    loading: boolean;
}

const length = 6;

export default function VerifyOTP({ setLoading, loading }: ForgotPasswordProps) {
    const { openModal } = useAuthModalStore((state) => state);
    // const { t } = useTranslation();
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
    const [error, setError] = useState<string>('');
    const [timer, setTimer] = useState<number>(60);
    const [canResend, setCanResend] = useState<boolean>(false);
    const forgotEmail = localStorage.getItem('forgotEmail');


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

    const handleOk = async () => {
        setLoading(true);
        const otpValue = otp.join('')
        if (otpValue.length < length) {
            setError('OTP is incomplete');
            setLoading(false);
            return;
        }

        const body = {
            email: forgotEmail,
            otp: otpValue
        }

        try {
            await verifyOtp(body);
            showSuccessMessage('Otp has been varified.');
            localStorage.setItem('verifiedOtp', otpValue);
            openModal("resetPassword")
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                showErrorMessage(error.message);
            } else {
                showErrorMessage('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };



    const handleVerifyOtp = () => {
        const otpValue = otp.join('')
        if (otpValue.length < length) {
            setError('OTP is incomplete');
            setLoading(false);
            return;
        } else {
            handleOk();
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
            showSuccessMessage('OTP resent successfully!');
            localStorage.setItem('resendTimestamp', Date.now().toString());
        } catch (error) {
            showErrorMessage('Error while resending OTP!');
            console.error('Resend OTP Error:', error);
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
                                className={`w-14 font-secondary bg-gray-200 h-14 rounded-lg text-center text-lg focus:outline-none focus:border-dark-gray focus:border-2`}
                                placeholder="0"
                            />
                        ))}
                    </div>
                    {error && <p className='text-red font-secondary'>{error}</p>}

                </div>
                <p className='font-secondary'>Enter the OTP we sent to your email.</p>
                <div className='flex gap-x-6 items-center justify-center'>
                    <Button disabled={loading} className='md:text-4xl text-2xl w-32 md:w-44' onClick={handleVerifyOtp}>Submit</Button>
                    <Button className={`${timer ? "cursor-not-allowed pointer-events-none" : ""} md:text-4xl text-2xl w-32 md:w-44`} onClick={handleResendOTP}>{timer ? timer : "Resend OTP"}</Button>
                </div>
            </div>
        </section>
    );
}
'use client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthModalStore } from '../store/useAuthModalStore';
import Logout from './Logout';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ForgotPassword from './ForgotPassword';
import FallbackLoader from '../components/ui/common/FallbackLoader';
import VerifyOTP from './VerifyOTP';
// Icons
import { MdClose, MdArrowBack } from 'react-icons/md';
import ResetPassword from './ResetPassword';

export default function AuthModal() {
    const open = useAuthModalStore((state) => state.open);
    const { mode, goBack } = useAuthModalStore((state) => state);
    const closeModal = useAuthModalStore((state) => state.closeModal);
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const getModalContent = () => {
        switch (mode) {
            case 'signin':
                return <SignInForm loading={loading} setLoading={setLoading} />;
            case 'signup':
                return <SignUpForm loading={loading} setLoading={setLoading} />;
            case 'logout':
                return <Logout />;
            case 'forgotPassword':
                return <ForgotPassword loading={loading} setLoading={setLoading} />;
            case 'verifyOtp':
                return <VerifyOTP loading={loading} setLoading={setLoading} />;
            case 'resetPassword':
                return <ResetPassword loading={loading} setLoading={setLoading} />;
            default:
                return null;
        }
    };

    const getTitle = () => {
        switch (mode) {
            case 'signin':
                return t('signIn');
            case 'signup':
                return t('signUp');
            case 'logout':
                return t('logout');
            case 'forgotPassword':
                return "Forgot Password";
            case 'verifyOtp':
                return "Verify OTP";
            case 'resetPassword':
                return "Add New Password";
            default:
                return null;
        }
    };

    return (
        <dialog id="auth_modal" className={` modal ${open ? 'modal-open' : ''}`}>
            <div className="modal-box font-primary bg-white max-w-2xl items-center rounded-none border-2 border-black w-full customModalStyle">
                <form method="dialog " className="flex items-center justify-center relative">
                    {mode != "signin" && mode != "signup" && <button
                        type="button"
                        className="absolute left-3 -top-0 bg-light-gray focus:outline-none w-5 h-5 md:w-8 md:h-8 flex items-center justify-center rounded-full text-white hover:bg-dark-gray transition-colors duration-300"
                        onClick={goBack}
                        aria-label="Close"
                    >
                        <MdArrowBack className='text-base md:text-2xl' />
                    </button>}
                    <h2 className="text-5xl md:text-6xl uppercase ">
                        {getTitle()}
                    </h2>
                    <button
                        type="button"
                        className="absolute right-3 -top-0 bg-light-gray focus:outline-none w-5 h-5 md:w-8 md:h-8 flex items-center justify-center rounded-full text-white hover:bg-dark-gray transition-colors duration-300"
                        onClick={closeModal}
                        aria-label="Close"
                    >
                        <MdClose className='text-base md:text-2xl' />
                    </button>
                </form>
                {loading && <FallbackLoader isModal={true} />}
                <div className="divider before:bg-light-gray after:bg-light-gray m-0"></div>
                {getModalContent()}
            </div>
        </dialog>
    );
}
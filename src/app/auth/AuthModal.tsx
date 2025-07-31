'use client';
import { useTranslation } from 'react-i18next';
import { useAuthModalStore } from '../store/useAuthModalStore';
import Logout from './Logout';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
// Icons
import { MdClose } from 'react-icons/md';

export default function AuthModal() {
    const open = useAuthModalStore((state) => state.open);
    const mode = useAuthModalStore((state) => state.mode);
    const closeModal = useAuthModalStore((state) => state.closeModal);
    const { t } = useTranslation();

    const getModalContent = () => {
        switch (mode) {
            case 'signin':
                return <SignInForm />;
            case 'signup':
                return <SignUpForm />;
            case 'logout':
                return <Logout />;
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
            default:
                return null;
        }
    };

    return (
        <dialog id="auth_modal" className={` modal ${open ? 'modal-open' : ''}`}>
            <div className="modal-box bg-white max-w-2xl items-center rounded-none border-2 border-black w-full px-0">
                <form method="dialog " className="flex items-center justify-center relative">
                    <h2 className="text-5xl md:text-6xl uppercase font-popfun">
                        {getTitle()}
                    </h2>
                    <button
                        type="button"
                        className="absolute right-2 top-0 bg-light-gray focus:outline-none w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-dark-gray transition-colors duration-300"
                        onClick={closeModal}
                        aria-label="Close"
                    >
                        <MdClose className='text-2xl' />
                    </button>
                </form>
                <div className="divider before:bg-light-gray after:bg-light-gray m-0"></div>
                {getModalContent()}
            </div>
        </dialog>
    );
}
'use client';
import { useAuthModalStore } from '../store/useAuthModalStore';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
// Icons
import { MdClose } from 'react-icons/md';

export default function AuthModal() {
    const open = useAuthModalStore((state) => state.open);
    const mode = useAuthModalStore((state) => state.mode);
    const closeModal = useAuthModalStore((state) => state.closeModal);

    return (
        <dialog id="auth_modal" className={` modal ${open ? 'modal-open' : ''}`}>
            <div className="modal-box bg-white items-center">
                <form method="dialog " className="flex items-center justify-center relative">
                    <h2 className="text-7xl font-popfun">
                        {mode === 'signin' ? 'SIGN IN' : 'SIGN UP'}
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
                {mode === 'signin' ? <SignInForm /> : <SignUpForm />}
            </div>
        </dialog>
    );
}
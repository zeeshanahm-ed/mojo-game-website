'use client';
import { useEffect } from 'react';
import { useAuthModalStore } from '../store/useAuthModalStore';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

export default function AuthModal() {
    const open = useAuthModalStore((state) => state.open);
    const mode = useAuthModalStore((state) => state.mode);
    const closeModal = useAuthModalStore((state) => state.closeModal);

    useEffect(() => {
        console.log(`AuthModal mounted with mode: ${mode} and open state: ${open}`);
    }, [mode, open]);

    return (
        <dialog id="auth_modal" className={` modal ${open ? 'modal-open' : ''}`}>
            <div className="modal-box bg-white">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}></button>
                    <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={closeModal}
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </form>
                <h2 className="text-4xl tracking-widest font-bulletproof">
                    {mode === 'signin' ? 'SIGN IN' : 'SIGN UP'}
                </h2>
                {mode === 'signin' ? <SignInForm /> : <SignUpForm />}
            </div>
        </dialog>
    );
}
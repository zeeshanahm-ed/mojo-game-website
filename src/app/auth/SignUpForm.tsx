'use client';
import { useState } from 'react';
import { useAuthModalStore } from '../store/useAuthModalStore';


export default function SignUpForm() {
    const { closeModal } = useAuthModalStore();
    const [username, setUsername] = useState('');

    return (
        <div>
            <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input input-bordered w-full mb-4"
            />
            <button
                className="btn btn-secondary w-full"
                onClick={() => {
                    closeModal();
                }}
            >
                Sign Up
            </button>
        </div>
    );
}
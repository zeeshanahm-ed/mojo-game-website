'use client';
import { useState } from 'react';
import { useAuthModalStore } from '../store/useAuthModalStore';

export default function SignInForm() {
    const { closeModal } = useAuthModalStore();


    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login button clicked!');
        closeModal();
    };

    return (
        <div>
            {/* Modal Body */}
            <form onSubmit={handleLogin} className="p-6 space-y-6">
                {/* Email Input */}
                <div className="relative flex items-center w-full transform -skew-x-6 border border-gray-400 rounded-lg overflow-hidden">
                    <div className="bg-purple-600 p-3 flex items-center justify-center transform skew-x-6 w-12 h-full absolute left-0 top-0 bottom-0">
                        {/* Envelope Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="input input-bordered w-full pl-16 pr-4 py-3 text-lg bg-white text-gray-800 border-none focus:outline-none"
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="relative flex items-center w-full transform -skew-x-6 border border-gray-400 rounded-lg overflow-hidden">
                    <div className="bg-purple-600 p-3 flex items-center justify-center transform skew-x-6 w-12 h-full absolute left-0 top-0 bottom-0">
                        {/* Lock Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 11V9a3 3 0 00-6 0v2m8 0V9a3 3 0 00-6 0v2" />
                        </svg>
                    </div>
                    <input
                        type="password"
                        placeholder="Your password"
                        className="input input-bordered w-full pl-16 pr-4 py-3 text-lg bg-white text-gray-800 border-none focus:outline-none"
                        required
                    />
                </div>

                {/* Create new account link */}
                <div className="text-gray-700 text-sm mt-4 text-left">
                    <a href="#" className="hover:underline">Create new account ?</a>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg text-xl font-bold uppercase tracking-wider transform -skew-x-12 border-2 border-black shadow-lg hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    style={{ fontFamily: 'Impact, sans-serif' /* Replace with your actual custom font */ }}
                >
                    <span className="inline-block transform skew-x-12">LOGIN</span>
                </button>
            </form>
        </div>
    );
}


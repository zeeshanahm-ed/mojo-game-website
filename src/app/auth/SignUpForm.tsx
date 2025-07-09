'use client';
import React, { useState } from 'react';
import { useAuthModalStore } from '../store/useAuthModalStore';
//icons
import PasswordIcon from '../assets/icons/password-icon.svg';
import EmailIcon from '../assets/icons/email-icon.svg';
import EditIcon from '../assets/icons/edit-icon.svg';
import ContactIcon from '../assets/icons/contact-icon.svg';
import UserIcon from '../assets/icons/user-icon.svg';
import FallBackProfileImage from '../assets/images/fallback-profile-image.jpg';


export default function SignUpForm() {
    const { openModal } = useAuthModalStore();
    const [profilePicture, setProfilePicture] = useState<string | null>(null);

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Sign Up button clicked!');
    };

    const handleGoToLogin = () => {
        openModal("signin");
    };

    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Reference to the hidden file input
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Function to trigger the hidden file input click
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <form onSubmit={handleSignUp} className="p-6 space-y-6">
                {/* Upload Picture Section */}
                <div className="flex items-center justify-center mb-6 gap-5">
                    <span className="text-gray-700 text-lg mb-2">Upload Picture</span>
                    <div className="relative w-24 h-24 border-2 border-gray-300 flex items-center justify-center">
                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleProfilePictureChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <img
                            src={profilePicture || (typeof FallBackProfileImage === 'string' ? FallBackProfileImage : FallBackProfileImage.src)}
                            alt="User Profile"
                            className="w-full h-full object-cover"
                        />
                        <div
                            className="absolute -top-2 -right-2 bg-black rounded-full p-1 border-2 border-white cursor-pointer"
                            onClick={triggerFileInput}
                        >
                            <EditIcon className=" w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* First Name & Last Name Input */}
                <div className="mb-6 flex items-center h-14 w-full transform -skew-x-12 border-2 border-black overflow-hidden">
                    <div className="bg-purple flex items-center justify-center w-16 h-full">
                        <UserIcon />
                    </div>
                    <input
                        type="text"
                        placeholder="First Name"
                        className="input input-bordered w-1/2 pl-10 pr-2 py-3 text-lg bg-white text-gray-800 border-none focus:outline-none"
                        required
                    />
                    <div className='h-[90%] w-[2px] bg-light-gray'></div>
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="input input-bordered w-1/2 pl-10 pr-2 py-3 text-lg bg-white text-gray-800 border-none focus:outline-none border-l border-gray-300"
                        required
                    />
                </div>

                {/* Email Input */}
                <div className="mb-6 flex items-center h-14 w-full transform -skew-x-12 border-2 border-black overflow-hidden">
                    <div className="bg-purple flex items-center justify-center w-16 h-full">
                        <EmailIcon />
                    </div>
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="input input-bordered w-full pl-10 pr-4 py-3 text-lg bg-white text-gray-800 border-none focus:outline-none"
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="mb-6 flex items-center h-14 w-full transform -skew-x-12 border-2 border-black overflow-hidden">
                    <div className="bg-purple flex items-center justify-center w-16 h-full">
                        <PasswordIcon />
                    </div>
                    <input
                        type="password"
                        placeholder="Your password"
                        className="input input-bordered w-full pl-10 pr-4 py-3 text-lg bg-white text-gray-800 border-none focus:outline-none"
                        required
                    />
                </div>

                {/* Contact Number Input */}
                <div className="mb-6 flex items-center h-14 w-full transform -skew-x-12 border-2 border-black overflow-hidden">
                    <div className="bg-purple flex items-center justify-center w-16 h-full">
                        <ContactIcon />
                    </div>
                    <input
                        type="tel"
                        placeholder="Your Contact Number"
                        className="input input-bordered w-full pl-10 pr-4 py-3 text-lg bg-white text-gray-800 border-none focus:outline-none"
                        required
                    />
                </div>

                {/* SignUp Button */}
                <div className='flex items-center justify-center mt-10'>
                    <button
                        type="submit"
                        className="w-52 bg-purple text-white pt-3 pb-2 px-6  transform -skew-x-12 border-2 border-black shadow-lg hover:bg-purple transition-colors duration-300"
                        aria-label="Login"
                        style={{ boxShadow: '3px 3x 0px rgba(0, 0, 0)' }}
                    >
                        <span className="inline-block transform skew-x-12 tracking-wider text-4xl uppercase font-popfun">SIGNUP</span>
                    </button>
                </div>

                {/* "or Login" link */}
                <div className="text-center text-gray-700 text-base mt-4">
                    <button onClick={handleGoToLogin} className="hover:underline">or Login</button>
                </div>
            </form>
        </div>
    );
}
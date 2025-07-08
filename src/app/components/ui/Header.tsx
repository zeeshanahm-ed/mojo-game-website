'use client'
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
//icons
import GiftIcon from "../../assets/icons/gift-icon.svg";
import FileIcon from "../../assets/icons/file-icon.svg";
import GampadIcon from "../../assets/icons/gamepad-icon.svg";
import { FaPlus } from "react-icons/fa";
import AuthModal from '@/app/auth/AuthModal';
import { useAuthModalStore } from '@/app/store/useAuthModalStore';

const userAvatar = "https://placehold.co/40x40/FFD700/000000?text=HI";

const Header: React.FC = () => {
    const { user } = useAuth();
    const { openModal } = useAuthModalStore();

    const handleAuthModal = () => {
        openModal("signin");
    };

    return (
        <header className="w-full overflow-hidden font-sans  h-20 flex items-center">
            <nav className="flex items-center justify-between w-full p-4">
                {/* Left section: User avatar and name */}
                <div className="flex items-center gap-5">
                    <div className='flex items-center'>
                        {user ?
                            <>
                                <div className="w-10 h-10 overflow-hidden border border-black skew-x-[-2deg] skew-y-0">
                                    <img src={userAvatar} alt="User Avatar" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-gray-800 text-lg font-semibold ml-3">Hamza Iqbal</span>
                            </>
                            :
                            <button className='btn btn-soft skew-x-[-2deg] skew-y-0 h-9' onClick={handleAuthModal}>SignIn</button>
                        }
                    </div>
                    <div className="flex items-center space-x-6 text-gray-700">
                        <div className="p-2 h-9 border border-black skew-x-[-2deg] skew-y-0 shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
                            <GiftIcon />
                        </div>
                        <div className="relative p-2 h-9 border border-black skew-x-[-2deg] skew-y-0 shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
                            <FileIcon />
                            <span className="absolute -top-1 -right-1 bg-red text-white rounded-full w-4 h-4 flex justify-center items-center font-semibold">
                                <FaPlus className='text-xs' />
                            </span>
                        </div>
                        <div className="p-2 h-9 border border-black skew-x-[-2deg] skew-y-0 shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
                            <GampadIcon />
                        </div>
                    </div>
                </div>

                {/* Middle section: Icons and MOJO logo */}
                <div className="flex items-center">
                    <h1 className="text-5xl text-gray-900 font-bulletproof mt-2">
                        MOJO
                    </h1>
                </div>

                {/* Right section: Navigation links */}
                <div className="flex items-center space-x-8 text-gray-800 text-lg font-medium">
                    <Link href="#" className="hover:text-dark-gray transition-colors">My Games</Link>
                    <Link href="#" className="hover:text-dark-gray transition-colors">Contact us</Link>
                </div>
            </nav>
            <AuthModal />
        </header>
    );
};

export default Header;
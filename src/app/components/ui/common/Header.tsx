'use client'
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import AuthModal from '@/app/auth/AuthModal';
import { useAuthModalStore } from '@/app/store/useAuthModalStore';
import LanguageSwitcher from '@/app/components/ui/Language-Switcher';
import { useTranslation } from 'react-i18next';
//icons
import GiftIcon from "@/app/assets/icons/gift-icon.svg";
import FileIcon from "@/app/assets/icons/file-icon.svg";
import GampadIcon from "@/app/assets/icons/gamepad-icon.svg";
import { FaPlus } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Wrapper from './Wrapper';

const userAvatar = "https://placehold.co/40x40/FFD700/000000?text=HI";

const Header: React.FC = () => {
    const { user } = useAuth();
    const { openModal } = useAuthModalStore();
    const { t } = useTranslation();
    const router = useRouter();

    const handleAuthModal = () => {
        openModal("signin");
    };

    return (
        <header className="w-full overflow-hidden font-sans h-20 flex items-center px-4 md:px-10 2xl:px-0">
            <Wrapper>
                <nav className="flex items-center justify-between w-full py-4">
                    {/* Left section: User avatar and name */}
                    <div className=" items-center gap-5 hidden md:flex">
                        <div className='flex items-center'>
                            {user ?
                                <>
                                    <div className="w-10 h-10 overflow-hidden border border-black skew-custom">
                                        <img src={userAvatar} alt="User Avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-gray-800 text-lg font-semibold ml-3">Hamza Iqbal</span>
                                </>
                                :
                                <button className='btn btn-soft skew-custom h-9' onClick={handleAuthModal}>SignIn</button>
                            }
                        </div>
                        <div className="flex items-center space-x-6 text-gray-700">
                            <div className="p-2 h-9 border border-black skew-custom shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
                                <GiftIcon />
                            </div>
                            <div className="relative p-2 h-9 border border-black skew-custom shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
                                <FileIcon />
                                <span className="absolute -top-1 -right-1 bg-red text-white rounded-full w-4 h-4 flex justify-center items-center font-semibold">
                                    <FaPlus className='text-xs' />
                                </span>
                            </div>
                            <div className="p-2 h-9 border border-black skew-custom shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
                                <GampadIcon />
                            </div>
                        </div>
                    </div>

                    {/* Middle section: Icons and MOJO logo */}
                    <div className="flex items-center">
                        <h1 className="text-3xl md:text-5xl text-gray-900 font-bulletproof mt-2 uppercase cursor-pointer" onClick={() => router.push('/')}>
                            {t("brand")}
                        </h1>
                    </div>

                    {/* Right section: Navigation links */}
                    <div className="flex items-center space-x-2 md:space-x-8 text-gray-800 text-sm md:text-lg font-medium w-fit text-nowrap">
                        <Link href="/my-games" className="hover:text-dark-gray transition-colors">{t("my_games")}</Link>
                        <Link href="/contactus" className="hover:text-dark-gray transition-colors">{t("contact_us")}</Link>
                        {/* <LanguageSwitcher /> */}
                    </div>
                </nav>
                <AuthModal />
                <AuthModal />
            </Wrapper>
        </header>
    );
};

export default Header;
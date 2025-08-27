'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { useAuthModalStore } from '@/app/store/useAuthModalStore';
import { useTranslation } from 'react-i18next';
//components
import Wrapper from './Wrapper';
import BuyNewGameModal from '../../modals/buy-new-game-modal';
import WalletModal from '../../modals/wallet-modal';
import MobileDrawer from '../MobileDrawer';
import AuthModal from '@/app/auth/AuthModal';
import Image from 'next/image';
import LanguageSwitcher from '../Language-Switcher';
//icons
import GiftIcon from "@/app/assets/icons/gift-icon.svg";
import FileIcon from "@/app/assets/icons/file-icon.svg";
import GampadIcon from "@/app/assets/icons/gamepad-icon.svg";
import FallBackProfileImage from '@/app/assets/images/fallback-profile-image.jpg';
import { FaPlus } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import LoginIcon from "@/app/assets/icons/login-icon.svg";



const Header: React.FC = () => {
    const { user } = useAuth();
    const { openModal } = useAuthModalStore();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [openNewGameModal, setOpenNewGameModal] = useState(false);
    const [openWalletModal, setOpenWalletModal] = useState(false);
    const { t } = useTranslation();

    const handleAuthModal = () => {
        openModal("signin");
    };

    return (
        <header className="w-full font-sans h-20 flex items-center px-4 lg:px-10 md:px-6">
            <Wrapper>
                <nav className="flex items-center justify-between w-full py-4 gap-x-5">
                    {/* Left section: User avatar and name */}
                    <div className="flex-1 items-center gap-2 lg:gap-5 hidden md:flex">
                        <div className='flex items-center'>
                            {user ?
                                <Link href="/profile" className='w-44 flex items-center'>
                                    <div className="w-10 h-10 overflow-hidden border border-black skew-custom">
                                        <Image
                                            src={(typeof FallBackProfileImage === 'string' ? FallBackProfileImage : FallBackProfileImage.src)}
                                            width={40}
                                            height={40}
                                            alt="User Avatar"
                                            className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-gray-800 text-lg font-semibold ml-3 max-w-[90%] truncate">{user.data.firstName} {user.data.lastName}</span>
                                </Link>
                                :
                                <button className="skew-custom">
                                    <div
                                        className="flex items-center gap-2 "
                                        onClick={handleAuthModal}
                                    >
                                        <div className="bg-yellow p-2 h-1/2 border border-black skew-custom   ">
                                            <LoginIcon />
                                        </div>
                                        <span className="text-lg font-medium text-black">{t("loginSignup")}</span>
                                    </div>
                                </button>
                            }
                        </div>
                        <div className="flex items-center space-x-3 lg:space-x-4 text-gray-700">
                            <div className="p-2 border border-black skew-custom shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
                                <GiftIcon />
                            </div>
                            <div role='button' onClick={() => setOpenNewGameModal(true)} className="relative p-2 h-9 border border-black skew-custom shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
                                <GampadIcon />
                                <span className="absolute -top-1 -right-1 bg-red text-white rounded-full w-4 h-4 flex justify-center items-center font-semibold">
                                    <FaPlus className='text-xs' />
                                </span>
                            </div>
                            <div role='button' onClick={() => setOpenWalletModal(true)} className="p-2 h-9 border border-black skew-custom shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
                                <FileIcon />
                            </div>
                        </div>
                    </div>

                    {/* Middle section: Icons and MOJO logo */}
                    <div className="flex items-center">
                        <div className='md:hidden' role='button' onClick={() => setIsDrawerOpen(true)}>
                            <FiMenu className='text-3xl sm:text-4xl' />
                        </div>
                        <Link href="/" className="text-3xl sm:text-4xl ml-3 md:ml-0 md:text-5xl text-gray-900 font-bulletproof mt-1 uppercase cursor-pointer">
                            {t("mojo")}
                        </Link>
                    </div>

                    {/* Right section: Navigation links */}
                    <div className="flex-1 hidden justify-end md:flex items-center space-x-2 font-secondary md:space-x-4  text-gray-800 text-sm sm:text-base md:text-lg font-medium w-fit text-nowrap">
                        <div className='hidden md:block'><LanguageSwitcher /></div>
                        <Link href="/my-games" className="hover:text-dark-gray transition-colors">{t("myGames")}</Link>
                        <Link href="/subscription" className="hover:text-dark-gray transition-colors">{t("subscription")}</Link>
                        <Link href="/contactus" className="hover:text-dark-gray transition-colors">{t("contactUs")}</Link>
                    </div>
                    <div className="md:hidden flex items-center space-x-3 lg:space-x-4 text-gray-700">
                        <div className="p-2 border border-black skew-custom shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
                            <GiftIcon />
                        </div>
                        <div role='button' onClick={() => setOpenNewGameModal(true)} className="relative p-2 h-9 border border-black skew-custom shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
                            <GampadIcon />
                            <span className="absolute -top-1 -right-1 bg-red text-white rounded-full w-4 h-4 flex justify-center items-center font-semibold">
                                <FaPlus className='text-xs' />
                            </span>
                        </div>
                        <div role='button' onClick={() => setOpenWalletModal(true)} className="p-2 h-9 border border-black skew-custom shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
                            <FileIcon />
                        </div>
                    </div>
                </nav>
                <AuthModal />
                <BuyNewGameModal open={openNewGameModal} onClose={() => setOpenNewGameModal(false)} />
                <WalletModal open={openWalletModal} onClose={() => setOpenWalletModal(false)} />
                <MobileDrawer
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                />
            </Wrapper>
        </header>
    );
};

export default Header;
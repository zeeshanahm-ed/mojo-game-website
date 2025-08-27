import React from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useAuthModalStore } from '@/app/store/useAuthModalStore';
import Image from 'next/image';

//icons
import GiftIcon from "@/app/assets/icons/gift-icon.svg";
import FileIcon from "@/app/assets/icons/file-icon.svg";
import GampadIcon from "@/app/assets/icons/gamepad-icon.svg";
import LoginIcon from "@/app/assets/icons/login-icon.svg";
import FallBackProfileImage from '@/app/assets/images/fallback-profile-image.jpg';
import { FaPlus } from "react-icons/fa";
import { MdClose } from 'react-icons/md';
import LanguageSwitcher from './Language-Switcher';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';



interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    setOpenNewGameModal: (v: boolean) => void;
    setOpenWalletModal: (v: boolean) => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, setOpenWalletModal, setOpenNewGameModal }) => {
    const { user } = useAuth();
    const { openModal } = useAuthModalStore();
    const name = "Zeeshan Ahmed";
    const { t } = useTranslation();


    const handleModales_Navigation = (key: string) => {
        switch (key) {
            case "auth":
                openModal("signin");
                break;
            default:
                break;
        }
        onClose();
    };

    const handleLogout = () => {
        // logout();
        onClose();
    };

    return (
        <div className="drawer z-50">
            <input
                id="mobile-drawer"
                type="checkbox"
                className="drawer-toggle"
                checked={isOpen}
                onChange={onClose}
            />

            <div className="drawer-side">
                <label
                    htmlFor="mobile-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                    onClick={onClose}
                ></label>

                {/* Drawer Content */}
                <aside className="bg-white min-h-full w-80 p-0">
                    {/* Frame ID */}
                    <div className=' flex justify-end p-5'>
                        <button
                            type="button"
                            className="bg-light-gray focus:outline-none w-8 h-8 flex items-center justify-center rounded-full text-white "
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <MdClose className='text-2xl' />
                        </button>
                    </div>

                    <div className="menu w-full px-0">
                        {/* Conditional Profile Section */}
                        {user && (
                            <div className="menu-item border-b border-border-gray">
                                <div
                                    className="flex items-center gap-4 py-4 px-6 "
                                    onClick={() => handleModales_Navigation('/profile')}
                                >
                                    <div className="relative w-9 h-9 border border-black skew-custom   ">
                                        <Image
                                            src={(typeof FallBackProfileImage === 'string' ? FallBackProfileImage : FallBackProfileImage.src)}
                                            width={36}
                                            height={36}
                                            alt="User Avatar"
                                            className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-lg font-medium text-black">{name}</span>
                                </div>
                            </div>
                        )}

                        {/* Login/Signup (Only when not authenticated) */}
                        {!user && (
                            <>
                                <div className="menu-item border-b border-border-gray">
                                    <div
                                        className="flex items-center gap-4 py-4 px-6 "
                                        onClick={() => handleModales_Navigation('auth')}
                                    >
                                        <div className="bg-yellow p-2 h-1/2 border border-black skew-custom   ">
                                            <LoginIcon />
                                        </div>
                                        <span className="text-lg font-medium text-black">Login/Signup</span>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="menu-item border-b border-border-gray">
                            <div className="flex items-center gap-4 py-4 px-6 ">
                                <LanguageSwitcher />
                            </div>
                        </div>


                        <Link href="/my-games" className="menu-item border-b border-border-gray">
                            <div className="flex items-center gap-4 py-4 px-6 ">
                                <span className="text-lg font-medium text-black">{t("myGames")}</span>
                            </div>
                        </Link>
                        <Link href="/subscription" className="menu-item border-b border-border-gray">
                            <div className="flex items-center gap-4 py-4 px-6 ">
                                <span className="text-lg font-medium text-black">{t("subscription")}</span>
                            </div>
                        </Link>
                        <Link href="/contactus" className="menu-item border-b border-border-gray">
                            <div className="flex items-center gap-4 py-4 px-6 ">
                                <span className="text-lg font-medium text-black">{t("contactUs")}</span>
                            </div>
                        </Link>

                        {/* Logout (Only when authenticated) */}
                        {user && (
                            <div className="menu-item w-full border-t border-border-gray absolute bottom-0">
                                <div
                                    className="flex items-center gap-4 py-4 px-6 "
                                    onClick={handleLogout}
                                >
                                    <div className="p-2 h-1/2 border border-black skew-custom   ">
                                        <LoginIcon className="rotate-180" />
                                    </div>
                                    <span className="text-lg font-medium text-black">Logout</span>
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default MobileDrawer;


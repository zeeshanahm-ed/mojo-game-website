import React from 'react';
import { useAuth } from '@/app/context/AuthContext';

//icons
import GiftIcon from "@/app/assets/icons/gift-icon.svg";
import FileIcon from "@/app/assets/icons/file-icon.svg";
import GampadIcon from "@/app/assets/icons/gamepad-icon.svg";
import LoginIcon from "@/app/assets/icons/login-icon.svg";
import LogoutIcon from "@/app/assets/icons/logout-icon.svg";
import { FaPlus } from "react-icons/fa";
import { MdClose } from 'react-icons/md';



interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    setOpenNewGameModal: (v: boolean) => void;
    setOpenWalletModal: (v: boolean) => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, setOpenWalletModal, setOpenNewGameModal }) => {
    const { user } = useAuth();
    const name = "Zeeshan Ahmed";
    const profileUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;


    const handleModales_Navigation = (key: string) => {
        switch (key) {
            case "buy-a-new-game":
                setOpenNewGameModal(true);
                break;
            case "wallet":
                setOpenWalletModal(true);
                break;
            case "gift-centre":

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
                                    <div className="relative w-9 h-1/2 border border-black skew-custom   ">
                                        <img src={profileUrl} alt="User Avatar" className="w-full h-full object-cover" />
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
                            <div
                                className="flex items-center gap-4 py-4 px-6 "
                                onClick={() => handleModales_Navigation('gift-centre')}
                            >
                                <div className="p-2 h-1/2 border border-black skew-custom   ">
                                    <GiftIcon />
                                </div>
                                <span className="text-lg font-medium text-black">Gift centre</span>
                            </div>
                        </div>

                        {/* Buy a New Game */}
                        <div className="menu-item border-b border-border-gray">
                            <div
                                role='button'
                                className="flex items-center gap-4 py-4 px-6  relative"
                                onClick={() => handleModales_Navigation("buy-a-new-game")}
                            >
                                <div className="relative p-2 h-1/2 border border-black skew-custom   ">
                                    <GampadIcon />
                                    <span className="absolute -top-1 -right-1 bg-red text-white rounded-full w-4 h-4 flex justify-center items-center font-semibold">
                                        <FaPlus className='text-xs' />
                                    </span>
                                </div>
                                <span className="text-lg font-medium text-black">Buy a new game</span>
                            </div>
                        </div>

                        {/* Wallet */}
                        <div className="menu-item border-b border-border-gray">
                            <div
                                className="flex items-center gap-4 py-4 px-6 "
                                role='button'
                                onClick={() => handleModales_Navigation("wallet")}
                            >
                                <div className="p-2 h-1/2 border border-black skew-custom   ">
                                    <FileIcon />
                                </div>
                                <span className="text-lg font-medium text-black">Wallet</span>
                            </div>
                            {user && <div className="divider my-0"></div>}
                        </div>

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


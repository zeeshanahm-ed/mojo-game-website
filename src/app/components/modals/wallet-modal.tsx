import React from 'react';
import Button from '../ui/common/Button';
import Image from 'next/image';
import Select from '../ui/common/Select';
import { useTranslation } from 'react-i18next';

//icons
import CartImage from "@/app/assets/images/cart-image.png";
import CreditImage from "@/app/assets/images/credit-image.png";
import SarFlagImage from "@/app/assets/images/saudia-flag-image.png";
import { MdClose } from 'react-icons/md';
import { Currency_Options } from '@/app/constants/constant';
import { useDirection } from '@/app/hooks/useGetDirection';


interface WalletModalProps {
    open: boolean;
    onClose: () => void;
}

function WalletModal({ open, onClose }: WalletModalProps) {
    const { t } = useTranslation();
    const direction = useDirection();

    const handleNavigate = (type: string) => {
        if (type === 'recharge') {
            console.log('Navigate to recharge wallet');
        } else if (type === 'history') {
            console.log('Navigate to purchase history');
        }
    };

    return (
        <dialog id="wallet_modal" className={` modal ${open ? 'modal-open' : ''}`}>
            <div className="max-w-4xl modal-box px-0 bg-white items-center rounded-none border-2 border-black">
                <form method="dialog " className="flex items-center justify-center relative">
                    <h2 className="text-5xl md:text-6xl font-popfun uppercase">
                        {t("wallet")}
                    </h2>
                    <button
                        type="button"
                        className="absolute right-2 top-0 bg-light-gray focus:outline-none w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-dark-gray transition-colors duration-300"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <MdClose className='text-2xl' />
                    </button>
                </form>
                <div className="divider before:bg-gray-400 after:bg-gray-400 m-0"></div>

                {/* Wallet Content */}
                <div className="flex flex-col md:flex-row items-baseline w-full justify-between gap-y-10 gap-x-10 py-5 px-5 sm:px-10 font-popfun">

                    {/* Game Credits Card */}
                    <div className="flex md:flex-col items-start gap-4">
                        <div className="w-20 sm:w-28 md:w-28 md:h-1/2 relative">
                            <Image src={CreditImage} alt='Credits' className='w-full h-full' />
                        </div>

                        <div className='space-y-2 w-full'>
                            <h3 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl">
                                {t("credits")}
                            </h3>
                            <p className="text-sm max-w-xs font-Product_sans">
                                {t("creditsInfo")}
                            </p>
                            <Button className='text-2xl sm:text-3xl w-36 sm:w-48' onClick={() => handleNavigate("recharge")}>
                                {t("rechargeWallet")}
                            </Button>
                        </div>
                    </div>

                    {/* SAR Currency Card */}
                    <div className="flex md:flex-col items-start gap-4">
                        <div className="w-20 sm:w-28 md:w-24 md:h-1/2 relative">
                            <Image src={SarFlagImage} alt='Saudia Flag' className='w-full h-full' />
                        </div>

                        <div className='space-y-2 w-full'>
                            <h3 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl">
                                SAR
                            </h3>
                            <p className="text-sm font-Product_sans max-w-xs">
                                {t("currencyInfo")}
                            </p>

                            {/* Currency Selection Placeholder */}
                            <Select
                                className="!h-12 !w-40 sm:!w-48 md:!w-52"
                                iconBgColor="!bg-white"
                                selectClassName='!pl-5 !text-2xl !sm:text-3xl'
                                options={Currency_Options}
                                value='SAR' />
                        </div>
                    </div>

                    {/* History Card */}
                    <div className="flex md:flex-col items-start gap-4">
                        <div className="w-20 sm:w-28 h-auto md:w-20 md:h-1/2 relative">
                            <Image src={CartImage} alt='Cart' className='w-full h-full' />
                        </div>

                        <div className='space-y-2 w-full'>
                            <h3 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl">
                                {t("history")}
                            </h3>
                            <p className="text-sm font-Product_sans max-w-xs">
                                {t("purchaseHistory")}
                            </p>
                            <Button className={`text-2xl ${direction === "rtl" ? "" : "md:!mt-1"} sm:text-3xl w-36 sm:w-48`} onClick={() => handleNavigate("history")}>
                                {t("viewHistory")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </dialog >
    )
}

export default WalletModal;
import React, { useState } from 'react';
import Image from 'next/image';
import Select from '../ui/common/Select';
import { useTranslation } from 'react-i18next';

//icons
import CartImage from "@/app/assets/images/cart-image.png";
import CreditImage from "@/app/assets/images/credit-image.png";
import SarFlagImage from "@/app/assets/images/saudia-flag-image.png";
import { MdClose } from 'react-icons/md';
import { Currency_Options } from '@/app/constants/constant';
import Link from 'next/link';


interface WalletModalProps {
    open: boolean;
    onClose: () => void;
}

function WalletModal({ open, onClose }: WalletModalProps) {
    const { t } = useTranslation();
    const [currency, setCurrency] = useState('SAR');

    const handleCurrencyChange = (value: string) => {
        setCurrency(value);
    };

    return (
        <dialog id="wallet_modal" className={` modal ${open ? 'modal-open' : ''}`}>
            <div className="max-w-4xl font-primary modal-box customModalStyle bg-white items-center rounded-none border-2 border-black">
                <form method="dialog " className="flex items-center justify-center relative">
                    <h2 className="text-5xl md:text-6xl  uppercase">
                        {t("wallet")}
                    </h2>
                    <button
                        type="button"
                        className="absolute right-3 -top-0 bg-light-gray focus:outline-none w-5 h-5 md:w-8 md:h-8 flex items-center justify-center rounded-full text-white hover:bg-dark-gray transition-colors duration-300"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <MdClose className='text-base md:text-2xl' />
                    </button>
                </form>
                <div className="divider before:bg-gray-400 after:bg-gray-400 m-0"></div>

                {/* Wallet Content */}
                <div className="flex flex-col md:flex-row items-baseline w-full justify-between gap-y-10 gap-x-10 py-5 px-5 sm:px-10 ">

                    {/* Game Credits Card */}
                    <div className="flex md:flex-col items-start gap-4">
                        <div className="w-20 sm:w-28 md:w-28 md:h-1/2 relative">
                            <Image src={CreditImage} alt='Credits' className='w-full h-full' />
                        </div>

                        <div className='space-y-2 w-full'>
                            <h3 className="text-4xl md:text-5xl">
                                {t("credits")}
                            </h3>
                            <p className="text-sm max-w-xs font-secondary">
                                {t("creditsInfo")}
                            </p>
                            {/* <Button className='text-2xl sm:text-3xl w-36 sm:w-48' onClick={() => handleNavigate("recharge")}>
                                {t("rechargeWallet")}
                            </Button> */}
                        </div>
                    </div>

                    {/* SAR Currency Card */}
                    <div className="flex md:flex-col items-start gap-4">
                        <div className="w-20 sm:w-28 md:w-24 md:h-1/2 relative">
                            <Image src={SarFlagImage} alt='Saudia Flag' className='w-full h-full' />
                        </div>

                        <div className='space-y-2 w-full'>
                            <h3 className="text-4xl md:text-5xl">
                                SAR
                            </h3>
                            <p className="text-sm font-secondary max-w-xs">
                                {t("currencyInfo")}
                            </p>

                            {/* Currency Selection Placeholder */}
                            <Select
                                className="!h-12 !w-40 sm:!w-48 md:!w-52"
                                iconBgColor="!bg-white"
                                selectClassName='!pl-5 !text-xl'
                                options={Currency_Options}
                                onChange={(e) => handleCurrencyChange(e.target.value)}
                                value={currency}
                            />
                        </div>
                    </div>

                    {/* History Card */}
                    <div className="flex md:flex-col items-start gap-4">
                        <div className="w-20 sm:w-28 h-auto md:w-20 md:h-1/2 relative">
                            <Image src={CartImage} alt='Cart' className='w-full h-full' />
                        </div>

                        <div className='space-y-2 w-full'>
                            <h3 className="text-4xl md:text-5xl">
                                {t("history")}
                            </h3>
                            <p className="text-sm font-secondary max-w-xs">
                                {t("purchaseHistory")}
                            </p>
                            {/* <Button className={`text-2xl ${direction === "rtl" ? "" : "md:!mt-1"} sm:text-3xl w-36 sm:w-48`} onClick={() => handleNavigate("history")}>
                                {t("viewHistory")}
                            </Button> */}
                            <Link
                                href='/profile'
                                onClick={onClose}
                                className='boxShadow-custom bg-purple text-white flex-centered pt-2 w-36 sm:w-48 text-4xl px-4 transform font-primary -skew-x-6 md:-skew-x-12 border-2 border-black shadow-lg '>
                                {t("viewHistory")}
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </dialog >
    )
}

export default WalletModal;
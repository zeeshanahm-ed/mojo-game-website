import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/app/hooks/useGetDirection';
//icon
import RoyalRoundedIcon from "@/app/assets/icons/riyal-rounded-icon.svg"
import RoyalWalletIcon from "@/app/assets/icons/riyal-wallet-icon.svg"

interface PaymentOption {
    count: string;
    price: string;
    bgColor: string;
}

const Options: PaymentOption[] = [
    { count: '10', price: "17", bgColor: "bg-[#FA1960]" },
    { count: '5', price: "10", bgColor: "bg-[#197BFA]" },
    { count: '3', price: "08", bgColor: "bg-[#FA8219]" },
    { count: '2', price: "05", bgColor: "bg-[#FA2C19]" },
]

interface NewGameModalProps {
    open: boolean;
    onClose: () => void;
}

function BuyNewGameModal({ open, onClose }: NewGameModalProps) {
    const [discountCode, setDiscountCode] = useState('');
    const { t } = useTranslation();
    const direction = useDirection();

    const [selectedOption, setSelectedOption] = useState<PaymentOption>({
        count: '10',
        price: "17",
        bgColor: "bg-[#FA1960]"
    })

    const handleSelectOption = (option: PaymentOption) => {
        setSelectedOption(option)
    }

    return (
        <dialog id="buy_a_new_game_modal" className={` modal ${open ? 'modal-open' : ''}`}>
            <div className="modal-box px-0 pb-0 font-primary  bg-white items-center max-w-2xl rounded-none border-2 border-black">
                <form method="dialog " className="px-4 md:px-10 flex items-center justify-start relative">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl  uppercase flex flex-row sm:flex-row sm:items-center ">
                        {t("buyNewGame")} <span className='ml-4 sm:ml-8 flex items-center gap-1 sm:gap-3'><RoyalWalletIcon className="mb-1 sm:w-10 sm:h-10" /> 10.00</span>
                    </h2>
                    <button
                        type="button"
                        className="absolute right-3 -top-3 bg-light-gray focus:outline-none w-5 h-5 md:w-8 md:h-8 flex items-center justify-center rounded-full text-white hover:bg-dark-gray transition-colors duration-300"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <MdClose className='text-base md:text-2xl' />
                    </button>
                </form>
                <div className="divider before:bg-light-gray after:bg-light-gray m-0"></div>
                {/* Main content */}
                <div className="w-full">
                    <div className='flex px-5 md:px-10 items-center flex-col w-full text-white justify-between py-5 uppercase  space-y-5'>
                        {Options.map((option, index) => {
                            return (
                                <div key={index} onClick={() => handleSelectOption(option)} className={`${selectedOption?.count === option.count && "text-gray-200"} w-full cursor-pointer hover:text-gray-200 transition-all duration-300 ${option.bgColor} flex items-center justify-between  px-4 md:px-10 pt-4 pb-2 -skew-x-12`}>
                                    <div dir={direction} className=' text-3xl  md:text-5xl skew-x-12'>{option.count} {t("games")}</div>
                                    <div className=' text-3xl  md:text-5xl flex items-center gap-3 skew-x-12'>{option.price} SAR <RoyalRoundedIcon className="w-8 h-8" /></div>
                                </div>
                            )
                        })}
                        <div className="bg-white border-2 border-black -skew-x-12 w-full">
                            <div className="px-4 md:px-10 pt-3 pb-1 flex skew-x-12 items-center justify-between" >
                                <div className="flex-shrink-0 ">
                                    <label className="text-black uppercase text-3xl  md:text-5xl">
                                        {t("discountCode")}
                                    </label>
                                </div>
                                <div className="flex-1 ml-8">
                                    <input
                                        type="text"
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value)}
                                        placeholder="1F380H5000"
                                        className="w-full text-gray-400 text-3xl  md:text-5xl bg-transparent border-none outline-none placeholder-gray-400 text-right"
                                        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple px-4 md:px-10 pt-4 pb-2 flex items-center justify-between ">
                        <div className="">
                            <button className="bg-transparent border-none text-white text-3xl md:text-5xl  uppercase hover:text-gray-200 transition-colors">
                                BUY A NEW GAME
                            </button>
                        </div>

                        <div className="w-px bg-white h-12"></div>

                        <div className="flex items-center gap-3 sm:gap-6">
                            <div className="text-white text-3xl md:text-4xl ">
                                {selectedOption.price} SAR
                            </div>
                            <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 ${selectedOption.bgColor} mb-1 rounded-full border border-white`}></div>
                                <span className="text-white text-2xl md:text-3xl ">
                                    {selectedOption.count} GAMES
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </dialog>
    )
}

export default BuyNewGameModal;
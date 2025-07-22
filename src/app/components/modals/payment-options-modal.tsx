import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';
//icon
import RoyalRoundedIcon from "@/app/assets/icons/riyal-rounded-icon.svg"
import RoyalWalletIcon from "@/app/assets/icons/riyal-wallet-icon.svg"

const Options = [
    { count: '10', price: "17", bgColor: "bg-[#FA1960]" },
    { count: '5', price: "10", bgColor: "bg-[#197BFA]" },
    { count: '3', price: "08", bgColor: "bg-[#FA8219]" },
    { count: '2', price: "05", bgColor: "bg-[#FA2C19]" },
]

interface PaymentOptionModalProps {
    open: boolean;
    onClose: () => void;
}

interface PaymentMethod {
    id: string;
    name: string;
    icon: string;
    route: string;
}

// Static amount - can be made dynamic later
const payableAmount = 176.00;

const paymentMethods: PaymentMethod[] = [
    {
        id: 'knet',
        name: 'KNET',
        icon: '💳', // You can replace with actual icon components
        route: '/payment/knet'
    },
    {
        id: 'credit-card',
        name: 'Credit Card',
        icon: '💳',
        route: '/payment/credit-card'
    },
    {
        id: 'apple-pay',
        name: 'Apple Pay',
        icon: '🍎',
        route: '/payment/apple-pay'
    },
    {
        id: 'google-pay',
        name: 'Google Pay',
        icon: '🟡',
        route: '/payment/google-pay'
    }
];

function PaymentOptionModal({ open, onClose }: PaymentOptionModalProps) {

    const handleNavigation = (paymentMethod: PaymentMethod) => {
        console.log(`Navigating to: ${paymentMethod.route}`);
        console.log(`Selected payment method: ${paymentMethod.name}`);
        console.log(`Amount to pay: ${payableAmount} SAR`);
    };

    return (
        <dialog id="buy_a_new_game_modal" className={` modal ${open ? 'modal-open' : ''}`}>
            <div className="modal-box p-0  bg-white items-center max-w-2xl rounded-none border-2 border-black">
                <form method="dialog " className="px-4 md:px-10 pt-5 flex items-center justify-center relative">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-popfun uppercase flex flex-row items-center ">
                        Choose a payment
                    </h2>
                    <button
                        type="button"
                        className="absolute right-3 top-3 bg-light-gray focus:outline-none w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-dark-gray transition-colors duration-300"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <MdClose className='text-2xl' />
                    </button>
                </form>
                <div className="divider before:bg-light-gray after:bg-light-gray m-0"></div>
                {/* Main content */}
                <div className="w-full">
                    <div className="max-w-md mx-auto py-6">
                        {/* Payment Methods */}
                        <div className="space-y-3 mb-8">
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => handleNavigation(method)}
                                    className={`w-full group relative transition-all duration-200`}
                                >
                                    <div className="-skew-x-12 relative bg-white border-2 border-gray-300 h-14 group-hover:border-gray-400 transition-colors duration-200">

                                        <div className="flex items-center justify-between h-full px-6">
                                            {/* Icon and Name */}
                                            <div className="flex items-center gap-3">
                                                {method.icon}
                                                <span className="font-medium text-gray-800 text-lg">
                                                    {method.name}
                                                </span>
                                            </div>

                                            {/* Arrow */}
                                            <div className="text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="transform group-hover:translate-x-1 transition-transform duration-200"
                                                >
                                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Payable Amount */}
                        <div className="text-center">
                            <div className="inline-flex items-center gap-3 text-xl">
                                <span className="font-medium text-gray-800">Payable Amount :</span>
                                <span className="font-bold text-gray-900">
                                    {payableAmount.toFixed(2)} SAR
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default PaymentOptionModal;
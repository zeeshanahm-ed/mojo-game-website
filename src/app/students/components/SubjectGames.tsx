"use client"
import React, { useState } from 'react'
import Input from '@/app/components/ui/common/Input';

import GamesSection, { GamesCardInterface } from '@/app/private-game/components/GamesSec';
import { MdClose } from 'react-icons/md';
import Button from '@/app/components/ui/common/Button';
import PaymentOptionModal from '@/app/components/modals/payment-options-modal';


const Data = [
    {
        id: "1",
        title: 'english 9',
        position: "third",
        image: 'https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png',
        questions: 10,
        price: 1.5,
        isSelected: false
    },
    {
        id: "2",
        position: "first",
        title: 'english 9',
        image: 'https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png',
        questions: 10,
        price: 1.5,
        isSelected: false
    },
    {
        id: "3",
        position: "second",
        title: 'english 9',
        image: 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo.png',
        questions: 10,
        price: 1.5,
        isSelected: false
    },
    {
        id: "4",
        title: 'english 9',
        position: "forth",
        image: 'https://logos-world.net/wp-content/uploads/2020/06/Barcelona-Logo.png',
        questions: 11,
        price: 1.5,
        isSelected: false
    },
    {
        id: "5",
        title: 'english 9',
        position: "fifth",
        image: 'https://logos-world.net/wp-content/uploads/2020/06/Barcelona-Logo.png',
        questions: 11,
        price: 1.5,
        isSelected: false
    }
];


function SubjectGames() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGames, setSelectedGames] = useState<GamesCardInterface[]>([])
    const [discountCode, setDiscountCode] = useState<string>('');
    const [discountApplied, setDiscountApplied] = useState<boolean>(false);

    const subtotal = selectedGames.reduce((sum, card) => sum + card.price, 0);
    const discountAmount = discountApplied ? subtotal * 0.1 : 0; // 10% discount example
    const total = subtotal - discountAmount;

    const handleRemoveCard = (id: string) => {
        setSelectedGames(prev => prev.filter(card => card.id !== id));
    };

    const handleApplyDiscount = () => {
        if (discountCode.toLowerCase() === 'save10') {
            setDiscountApplied(true);
        }
    };

    return (
        <div className='text-center flex flex-col items-center justify-center mt-10'>
            <h2 className="md:text-7xl text-5xl font-popfun text-black mb-2 uppercase">list of games</h2>
            <p className="text-sm sm:text-base md:text-lg text-black">Review your study of the material through the five available games.</p>
            <p className="text-sm sm:text-base md:text-lg text-black">You can choose one or more games.</p>
            <div className='h-auto mt-10'>
                <GamesSection data={Data} selectedGames={selectedGames} setSelectedGames={setSelectedGames} />
            </div>

            <h2 className="md:text-7xl text-5xl font-popfun text-black mb-4 mt-10 uppercase">Selected Games</h2>

            {/* Game Cards */}
            <div className="w-full flex flex-col items-center">
                <div className="flex gap-4 flex-wrap justify-center mb-6">
                    {selectedGames.map((card, index) => (
                        <div key={card.id} className="relative">
                            <div className="w-32 h-20 border-4 border-black rounded-sm overflow-hidden bg-gray-100">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button
                                type="button"
                                className="absolute -right-2 -top-2 bg-light-gray focus:outline-none w-6 h-6 flex items-center justify-center rounded-full text-white hover:bg-dark-gray transition-colors duration-300"
                                onClick={() => handleRemoveCard(card.id)}
                                aria-label="Close"
                            >
                                <MdClose className='text-xl' />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Discount Code */}
                <div className="bg-white border-2 border-black -skew-x-12 w-full sm:w-3/4 md:w-1/2 mb-6">
                    <div className="flex skew-x-12 items-center justify-between" >
                        <div className="flex-shrink-0 -skew-x-12 bg-black py-2 px-2 sm:px-4">
                            <label className="text-white text-sm tracking-normal">
                                Discount Code
                            </label>
                        </div>
                        <div className="flex-1 ml-4 sm:ml-6 md:ml-8">
                            <input
                                type="text"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                placeholder="Enter discount code"
                                className="w-full text-base tracking-normal bg-transparent border-none outline-none placeholder-gray-400"
                            />
                            {/* <button
                                onClick={handleApplyDiscount}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue text-white px-3 py-1 text-xs font-bold hover:bg-blue-600 transition-colors"
                            >
                                APPLY
                            </button> */}
                        </div>
                    </div>
                </div>

                {/* Pricing Details */}
                <div className="space-y-3 mb-6 w-full sm:w-3/4 md:w-3/5">
                    {selectedGames.map((card, index) => (
                        <div key={card.id} className="flex justify-between items-center text-sm">
                            <span className="text-black">{card.title}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 text-xs">SAR</span>
                                <span className="text-black font-medium">{card.price.toFixed(1)}</span>
                            </div>
                        </div>
                    ))}

                    <hr className="border-gray-200" />

                    <div className="flex justify-between items-center text-sm">
                        <span className="text-black font-medium">sub total</span>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-xs">SAR</span>
                            <span className="text-black font-medium">{subtotal.toFixed(1)}</span>
                        </div>
                    </div>

                    {discountApplied && (
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-green-600">Discount (10%)</span>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 text-xs">SAR</span>
                                <span className="text-green-600 font-medium">-{discountAmount.toFixed(1)}</span>
                            </div>
                        </div>
                    )}

                    <hr className="border-gray-300 border-t-2 mt-1" />

                    <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total</span>
                        <div className="flex items-center gap-2">
                            <span className=" text-sm">SAR</span>
                            <span>
                                {total < 100 ? total.toFixed(1) : Math.round(total).toString().padStart(4, '0')}
                            </span>
                        </div>
                    </div>
                    <hr className="border-gray-300 border-t-2" />
                </div>

                {/* Pay Now Button */}
                <Button boxShadow={false} onClick={() => setIsModalOpen(true)} className='text-3xl sm:text-4xl w-44 sm:w-64'>Pay Now</Button>
            </div>
            <PaymentOptionModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}

export default SubjectGames;

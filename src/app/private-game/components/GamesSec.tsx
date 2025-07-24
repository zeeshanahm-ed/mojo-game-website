
import React from 'react';
//icons
import ReyalIcon from "@/app/assets/icons/riyal-rounded-icon.svg";
import { SelectedGamesPaymentDetailsInterface } from '@/app/utils/Interfaces';
import Image from 'next/image';

interface GamesSectionProps {
    data: SelectedGamesPaymentDetailsInterface[];
    selectedGames: SelectedGamesPaymentDetailsInterface[];
    setSelectedGames: React.Dispatch<React.SetStateAction<SelectedGamesPaymentDetailsInterface[]>>;
}


const GamesSection: React.FC<GamesSectionProps> = ({ data, selectedGames, setSelectedGames }) => {


    const handleCardSelect = (card: SelectedGamesPaymentDetailsInterface) => {
        setSelectedGames((prev: SelectedGamesPaymentDetailsInterface[]) => {
            const isSelected = prev.some((game) => game.id === card.id);

            if (isSelected) {
                // Remove the card
                return prev.filter((game) => game.id !== card.id);
            } else {
                // Add the card
                return [...prev, card];
            }
        });

    };

    return (
        <div className="font-popfun">
            {/* Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-2 sm:gap-x-4 gap-y-8 md:gap-x-6 mb-8">
                {data?.map((card) => {
                    const isSelected = selectedGames.find((v: SelectedGamesPaymentDetailsInterface) => v.id === card.id) ? true : false
                    return (
                        <div
                            key={card.id}
                            onClick={() => handleCardSelect(card)}
                            className={`relative cursor-pointer -skew-x-2 md:-skew-x-3 sm:h-80 h-64 md:w-80`}
                        >
                            <div className={` ${isSelected ? 'border-red' : 'border-dark-orange'} border-4 sm:border-8 bg-white overflow-hidden w-full h-full flex flex-col`}>
                                <div className='flex-1 flex flex-col'>
                                    {/* Team Logo */}
                                    <div className="flex justify-center items-center w-full h-1/2 sm:h-40 p-4">
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            width={100}
                                            height={100}
                                            className="h-full w-full object-contain"
                                            onError={(e) => {
                                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjMwIiBzdHJva2U9IiM5Q0E5QjAiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K';
                                            }}
                                        />
                                    </div>

                                    {/* Team Name */}
                                    <div className="px-1 sm:px-4 pb-2 mt-auto text-start">
                                        <div className={`flex items-center text-2xl sm:text-3xl md:text-4xl ${isSelected ? 'text-red' : 'text-dark-orange'} `}>
                                            {card.title}{card.position && <div className={`w-[2px] h-5 sm:h-7 mb-1 mx-1 sm:mx-3 ${isSelected ? 'bg-red' : 'bg-dark-orange'}`}></div>}{card.position && card.position}
                                        </div>
                                        <div className='flex text-light-gray flex-wrap text-sm sm:text-base xl:text-lg items-center gap-x-2'>
                                            <p className="">
                                                page 69 - page 75
                                            </p>
                                            <p className="">
                                                ? QUESTIONS-{card.questions}
                                            </p>
                                            <p className="">
                                                unit 10-11
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Section */}
                                <div className={`${isSelected ? 'bg-red' : 'bg-dark-orange'} flex items-center justify-between px-1 sm:px-4 pt-2 md:pt-3`}>
                                    <span className="text-white text-3xl sm:text-3xl md:text-4xl">BUY</span>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-white text-xl md:text-2xl">{card.price} SAR</span>
                                        <div className="w-8 h-8 flex items-center justify-center">
                                            <ReyalIcon className="text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default GamesSection;
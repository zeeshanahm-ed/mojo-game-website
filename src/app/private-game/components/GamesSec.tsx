
import React, { useState } from 'react';
//icons
import ReyalIcon from "@/app/assets/icons/riyal-rounded-icon.svg";

interface TeamCard {
    id: number;
    teamName: string;
    image: string;
    questions: number;
    price: number;
    borderColor: string;
    bgColor: string;
}

const teamCards: TeamCard[] = [
    {
        id: 1,
        teamName: 'MANCHESTER UNITED',
        image: 'https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png',
        questions: 10,
        price: 1.5,
        borderColor: 'border-red',
        bgColor: 'bg-red'
    },
    {
        id: 1,
        teamName: 'MANCHESTER UNITED',
        image: 'https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png',
        questions: 10,
        price: 1.5,
        borderColor: 'border-red',
        bgColor: 'bg-red'
    },
    {
        id: 1,
        teamName: 'MANCHESTER UNITED',
        image: 'https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png',
        questions: 10,
        price: 1.5,
        borderColor: 'border-red',
        bgColor: 'bg-red'
    },
    {
        id: 1,
        teamName: 'MANCHESTER UNITED',
        image: 'https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png',
        questions: 10,
        price: 1.5,
        borderColor: 'border-red',
        bgColor: 'bg-red'
    },
    {
        id: 1,
        teamName: 'MANCHESTER UNITED',
        image: 'https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png',
        questions: 10,
        price: 1.5,
        borderColor: 'border-red',
        bgColor: 'bg-red'
    },
    {
        id: 2,
        teamName: 'LIVERPOOL',
        image: 'https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png',
        questions: 10,
        price: 1.5,
        borderColor: 'border-yellow',
        bgColor: 'bg-yellow'
    },
    {
        id: 3,
        teamName: 'REAL MADRID',
        image: 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo.png',
        questions: 10,
        price: 1.5,
        borderColor: 'border-yellow',
        bgColor: 'bg-yellow'
    },
    {
        id: 4,
        teamName: 'BARCELONA',
        image: 'https://logos-world.net/wp-content/uploads/2020/06/Barcelona-Logo.png',
        questions: 11,
        price: 1.5,
        borderColor: 'border-red',
        bgColor: 'bg-red'
    }
];

const GamesSection: React.FC = () => {
    const [selectedCards, setSelectedCards] = useState<number[]>([]);


    const handleCardSelect = (cardId: number) => {
        setSelectedCards(prev =>
            prev.includes(cardId)
                ? prev.filter(id => id !== cardId)
                : [...prev, cardId]
        );
    };

    const getTotalPrice = () => {
        return selectedCards.reduce((total, cardId) => {
            const card = teamCards.find(card => card.id === cardId);
            return total + (card?.price || 0);
        }, 0).toFixed(1);
    };

    return (
        <div className="font-popfun">
            {/* Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2 sm:gap-x-4 gap-y-8 md:gap-x-6 mb-8">
                {teamCards.map((card) => (
                    <div
                        key={card.id}
                        onClick={() => handleCardSelect(card.id)}
                        className={`relative cursor-pointer -skew-x-2 md:-skew-x-3`}
                    >
                        <div className={` ${selectedCards.includes(card.id) ? 'border-red' : 'border-dark-orange'} border-2 sm:border-4 lg:border-8 bg-white overflow-hidden w-full aspect-auto flex flex-col`}>
                            <div className='flex-1 flex flex-col'>
                                {/* Team Logo */}
                                <div className="flex justify-center items-center flex-1 p-4">
                                    <img
                                        src={card.image}
                                        alt={card.teamName}
                                        className="max-h-full max-w-full object-contain"
                                        onError={(e) => {
                                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjMwIiBzdHJva2U9IiM5Q0E5QjAiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K';
                                        }}
                                    />
                                </div>

                                {/* Team Name */}
                                <div className="px-1 sm:px-4 pb-2 mt-auto">
                                    <h3 className={`text-3xl sm:text-4xl lg:text-5xl ${selectedCards.includes(card.id) ? 'text-red' : 'text-dark-orange'} `}>
                                        {card.teamName}
                                    </h3>
                                    <p className="text-xl">
                                        ? QUESTIONS-{card.questions}
                                    </p>
                                </div>
                            </div>

                            {/* Footer Section */}
                            <div className={`${selectedCards.includes(card.id) ? 'bg-red' : 'bg-dark-orange'} flex items-center justify-between px-4 pt-5`}>
                                <span className="text-white text-3xl sm:text-4xl lg:text-5xl">BUY</span>
                                <div className="flex items-center space-x-2">
                                    <span className="text-white text-xl lg:text-3xl">{card.price} SAR</span>
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        <ReyalIcon className="text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GamesSection;
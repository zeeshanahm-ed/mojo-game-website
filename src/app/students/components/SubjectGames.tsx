"use client"
import React, { useState } from 'react'

import GamesSection from '@/app/private-game/components/GamesSec';
import SelectedGamesPaymentDetails from '@/app/components/ui/common/SelectedGamesPaymentDetails';
import { SelectedGamesPaymentDetailsInterface } from '@/app/utils/Interfaces';


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
    const [selectedGames, setSelectedGames] = useState<SelectedGamesPaymentDetailsInterface[]>([])

    const handleRemoveSelectedGame = (id: string) => {
        setSelectedGames((prev) => prev.filter(card => card.id !== id));
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
            <SelectedGamesPaymentDetails selectedGames={selectedGames} handleRemoveSelectedGame={handleRemoveSelectedGame} />
        </div>
    )
}

export default SubjectGames;

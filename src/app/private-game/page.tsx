"use client"
import React, { useState } from 'react'
import Banner from './components/Banner'
import Wrapper from '@/app/components/ui/common/Wrapper';
import Input from '@/app/components/ui/common/Input';
import Button from '@/app/components/ui/common/Button';
import Image from 'next/image';
import CategoriesSection from './components/CategoriesSec';

//icons
import SearchIcon from '@/app/assets/icons/search-icon.svg';
import GameIcon from '@/app/assets/images/quiz-app.png';
import GamesSection from './components/GamesSec';



function PrivateGames() {
    const [searchByName, setSearchByName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

    return (
        <section>
            <Banner />
            <Wrapper>
                <div className='h-auto px-4 md:px-10'>
                    <div className='flex-center gap-y-10 w-full mt-10 mb-20 flex-wrap'>
                        <div className='flex-center flex-col sm:flex-row justify-between w-full gap-5'>
                            <Input
                                icon={<SearchIcon />}
                                type="text"
                                placeholder="Search by name "
                                value={searchByName}
                                className=''
                                onChange={(e) => setSearchByName(e.target.value)}
                            />
                        </div>
                        <CategoriesSection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    </div>
                    <GamesSection />
                </div>
            </Wrapper>
        </section >
    )
}

export default PrivateGames;


const GameCard = () => {
    return (
        <div className="relative flex flex-col items-center justify-center w-64 sm:w-56 md:w-64 lg:w-72 h-80 p-2 px-2 lg:p-4 bg-white border-[6px] border-black skew-custom shadow-md">
            {/* Badge */}
            <div className="absolute w-48 text-center -top-1 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-5 py-2 -skew-x-6">
                No of times played :05
            </div>

            {/* Content */}
            <div className="flex flex-col items-center text-center gap-y-2 lg:mt-4">
                <Image src={GameIcon} alt="Game Icon" width={100} height={80} className='w-20 md:w-28' />

                <h2 className="text-5xl lg:text-7xl font-popfun text-dark-blue">GAME 12</h2>

                <p className="text-sm text-black">
                    Answer correctly, and deduct the number of points you won from the other team's points.
                </p>
            </div>
        </div>
    );
};
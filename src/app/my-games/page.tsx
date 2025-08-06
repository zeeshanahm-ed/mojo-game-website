"use client"
import React, { useState } from 'react'
import Banner from './components/Banner'
import Wrapper from '@/app/components/ui/common/Wrapper';
import Input from '@/app/components/ui/common/Input';
import Button from '@/app/components/ui/common/Button';
import Image from 'next/image';
import Pagination from '../components/ui/common/Pagination';
import { useTranslation } from 'react-i18next';

//icons
import SearchIcon from '@/app/assets/icons/search-icon.svg';
import GameIcon from '@/app/assets/images/quiz-app.png';


function MyGames() {
    const [searchByName, setSearchByName] = useState('');
    const [searchByCategory, setSearchByCategory] = useState('');
    const { t } = useTranslation();

    return (
        <section>
            <Banner />
            <Wrapper>
                <div className='flex items-center justify-center flex-col h-auto py-16 px-4 md:px-10'>
                    <div className='flex items-center lg:flex-row flex-col gap-y-10 w-full mb-20 gap-5'>
                        <div className='flex-center flex-col sm:flex-row w-full lg:w-[79%] justify-between gap-5'>
                            <Input
                                icon={<SearchIcon />}
                                type="text"
                                placeholder={t("searchByName")}
                                value={searchByName}
                                className='w-full h-14'
                                onChange={(e) => setSearchByName(e.target.value)}
                            />
                            <Input
                                icon={<SearchIcon />}
                                type="text"
                                placeholder={t("searchByCategory")}
                                value={searchByCategory}
                                className='w-full h-14'
                                onChange={(e) => setSearchByCategory(e.target.value)}
                            />
                        </div>
                        <Button boxShadow={false} className='md:text-4xl text-3xl w-64 py-[6px]'>
                            {t("buyNewGame")}
                        </Button>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center'>
                        <GameCard />
                        <GameCard />
                        <GameCard />
                        <GameCard />
                        <GameCard />
                        <GameCard />
                    </div>
                    <Pagination totalPages={10} />
                </div>
            </Wrapper>
        </section >
    )
}

export default MyGames;


const GameCard = () => {
    const { t } = useTranslation();
    return (
        <div className="relative flex flex-col items-center justify-center w-64 sm:w-56 md:w-64 lg:w-72 h-80 p-2 px-2 lg:p-4 bg-white border-[6px] border-black -skew-x-1 md:-skew-x-3 shadow-md">
            {/* Badge */}
            <div
                style={{ clipPath: "polygon(0 0, 100% 0%, 97% 100%, 7% 100%)" }}
                className="absolute font-secondary w-48 text-center -top-1 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-5 py-2">
                {t("timesPlayed")} : 05
            </div>

            {/* Content */}
            <div className="flex flex-col items-center text-center gap-y-4 md:gap-y-1 lg:mt-4">
                <Image src={GameIcon} alt="Game Icon" width={100} height={80} className='w-20 md:w-28' />

                <h2 className="text-5xl lg:text-7xl  text-dark-blue">GAME 12</h2>

                <p className="text-sm text-black font-secondary">
                    {"Answer correctly, and deduct the number of points you won from the other team's points."}
                </p>
            </div>
        </div>
    );
};
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
import GamesSection, { GamesCardInterface } from './components/GamesSec';


const Data = [
    {
        id: "1",
        title: 'MANCHESTER UNITED',
        image: 'https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png',
        questions: 10,
        price: 1.5,
        isSelected: false
    },
    {
        id: "2",
        title: 'LIVERPOOL',
        image: 'https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png',
        questions: 10,
        price: 1.5,
        isSelected: false
    },
    {
        id: "3",
        title: 'REAL MADRID',
        image: 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo.png',
        questions: 10,
        price: 1.5,
        isSelected: false
    },
    {
        id: "4",
        title: 'BARCELONA',
        image: 'https://logos-world.net/wp-content/uploads/2020/06/Barcelona-Logo.png',
        questions: 11,
        price: 1.5,
        isSelected: false
    }
];


function PrivateGames() {
    const [searchByName, setSearchByName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
    const [selectedGames, setSelectedGames] = useState<GamesCardInterface[]>([])


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
                    <GamesSection data={Data} selectedGames={selectedGames} setSelectedGames={setSelectedGames} />
                </div>
            </Wrapper>
        </section >
    )
}

export default PrivateGames;

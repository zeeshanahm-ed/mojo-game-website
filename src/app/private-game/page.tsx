"use client"
import React, { useState } from 'react'
import Banner from './components/Banner'
import Wrapper from '@/app/components/ui/common/Wrapper';
import Input from '@/app/components/ui/common/Input';
import CategoriesSection from './components/CategoriesSec';
import GamesSection from './components/GamesSec';
import SelectedGamesPaymentDetails from '../components/ui/common/SelectedGamesPaymentDetails';
import { SelectedGamesPaymentDetailsInterface } from '../utils/Interfaces';
import { useTranslation } from 'react-i18next';

//icons
import SearchIcon from '@/app/assets/icons/search-icon.svg';


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
    const { t } = useTranslation();
    const [searchByName, setSearchByName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
    const [selectedGames, setSelectedGames] = useState<SelectedGamesPaymentDetailsInterface[]>([])


    const handleRemoveSelectedGame = (id: string) => {
        setSelectedGames((prev) => prev.filter(card => card.id !== id));
    };

    return (
        <section>
            <Banner />
            <Wrapper>
                <div className='flex items-center justify-center flex-col h-auto py-16 px-4 md:px-10'>
                    <div className='flex-center gap-y-10 w-full mb-20 flex-wrap'>
                        <div className='flex-center flex-col sm:flex-row justify-between w-full gap-5'>
                            <Input
                                icon={<SearchIcon />}
                                type="text"
                                placeholder={t("searchByName")}
                                value={searchByName}
                                className=''
                                onChange={(e) => setSearchByName(e.target.value)}
                            />
                        </div>
                        <CategoriesSection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    </div>
                    <div className='h-auto mt-1'>
                        <GamesSection data={Data} selectedGames={selectedGames} setSelectedGames={setSelectedGames} />
                        <div className='mt-20'>
                            <h2 className="md:text-7xl text-5xl text-center font-popfun text-black mb-4 mt-10 uppercase">{t("selectedGames")}</h2>
                            <SelectedGamesPaymentDetails selectedGames={selectedGames} handleRemoveSelectedGame={handleRemoveSelectedGame} />
                        </div>
                    </div>

                </div>
            </Wrapper>
        </section >
    )
}

export default PrivateGames;

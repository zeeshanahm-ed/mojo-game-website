"use client"
import React, { useEffect, useState } from 'react'
import Input from '@/app/components/ui/common/Input';
import Image from 'next/image';
import { GamesCategoryInterface } from '@/app/utils/Interfaces';

//icons
import SearchIcon from "@/app/assets/icons/search-icon.svg"

interface CategoriesSectionProps {
    data: GamesCategoryInterface[];
    selectedCategories: GamesCategoryInterface[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<GamesCategoryInterface[]>>;
    mode: 'offline' | 'online';
    currentPlayer?: 1 | 2;
    onSelect?: () => void;
}


function CategoriesSection({ data, selectedCategories, onSelect, setSelectedCategories, mode, currentPlayer }: CategoriesSectionProps) {
    const [search, setSearch] = useState('');
    const [filteredCategories, setFilteredCategories] = useState<GamesCategoryInterface[]>(data);
    const MAX_SELECTION = 6;
    const MAX_PER_PLAYER = 3;

    const [player1Categories, setPlayer1Categories] = useState<GamesCategoryInterface[]>([]);
    const [player2Categories, setPlayer2Categories] = useState<GamesCategoryInterface[]>([]);

    useEffect(() => {
        const modifyCategories = data?.map((item) => {
            return {
                ...item,
                selected: false
            }
        });
        setFilteredCategories(modifyCategories);
    }, [])

    const handleSearch = (value: string) => {
        setSearch(value)
    };

    const handleCategoriesClick = (value: GamesCategoryInterface) => {
        const isAlreadySelected = value.selected;

        if (mode === 'offline') {
            if (isAlreadySelected) {
                // Deselect logic for offline mode
                const updated = filteredCategories.map(item =>
                    item.name === value.name ? { ...item, selected: false } : item
                );
                setFilteredCategories(updated);

                setSelectedCategories(prev => prev.filter(cat => cat.name !== value.name));
                return;
            }

            const alreadySelectedCount = filteredCategories.filter(c => c.selected).length;
            if (alreadySelectedCount >= MAX_SELECTION) return;

            const updated = filteredCategories.map(item =>
                item.name === value.name ? { ...item, selected: true } : item
            );
            setFilteredCategories(updated);
            setSelectedCategories(prev => [...prev, value]);
            onSelect?.();
        } else if (mode === 'online') {
            // Don't allow deselect in online mode
            if (isAlreadySelected) return;

            const alreadySelectedCount = filteredCategories.filter(c => c.selected).length;
            if (alreadySelectedCount >= MAX_SELECTION) return;

            const updated = filteredCategories.map(item =>
                item.name === value.name ? { ...item, selected: true } : item
            );
            setFilteredCategories(updated);

            if (currentPlayer === 1 && player1Categories.length < MAX_PER_PLAYER) {
                setPlayer1Categories(prev => [...prev, value]);
            } else if (currentPlayer === 2 && player2Categories.length < MAX_PER_PLAYER) {
                setPlayer2Categories(prev => [...prev, value]);
            }

            onSelect?.();
        }
    };


    const isCategoryDisabled = (category: GamesCategoryInterface): boolean => {
        const selectedCount = filteredCategories.filter(c => c.selected).length;

        if (category.selected) return false;
        if (selectedCount >= MAX_SELECTION) return true;

        if (mode === 'online') {
            if (currentPlayer === 1 && player1Categories.length >= MAX_PER_PLAYER) return true;
            if (currentPlayer === 2 && player2Categories.length >= MAX_PER_PLAYER) return true;
        }

        return false;
    };

    return (
        <div className='flex items-center justify-center flex-col w-full'>
            <div className='my-10'>
                <Input
                    icon={<SearchIcon />}
                    type="text"
                    value={search}
                    placeholder="Search by category Name"
                    className='md:w-96 w-full'
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            <div className="text-center flex flex-col items-center justify-center">
                <h2 className="sm:text-6xl text-5xl lg:text-7xl font-popfun text-black mb-2 uppercase">
                    Select your categories
                </h2>
                <p className="text-sm sm:text-base md:text-lg leading-6 text-black max-w-2xl">
                    3 categories for your team, and 3 categories for the opposing team, for a total of 6 categories with 36 different questions. Choose the categories carefully to ensure the greatest chance of
                </p>
            </div>
            <div className='my-14 w-full max-h-[800px] min-h-[600px] overflow-hidden overflow-y-scroll'>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
                    {filteredCategories?.map((cat, idx) => (
                        <CategoryCard key={idx} category={cat} handleCategoriesClick={handleCategoriesClick} isDisabled={isCategoryDisabled(cat)} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoriesSection;

interface Props {
    category: GamesCategoryInterface;
    handleCategoriesClick: (category: GamesCategoryInterface) => void;
    isDisabled: boolean;
}

const CategoryCard = ({ category, handleCategoriesClick, isDisabled }: Props) => {
    return (
        <div className={`flex cursor-pointer flex-col justify-center items-center ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`} onClick={() => handleCategoriesClick(category)}>
            <div className={`relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full border-[12px] border-orange ${category.selected ? "border-red" : "border-orange"} flex items-center justify-center`}>
                <Image src={category.icon} alt={category.name} width={100} height={100} className='w-1/2 h-1/2' />
            </div>
            <div className={`w-full mt-6 relative pb-1 pt-2 text-center text-white font-popfun text-2xl sm:text-3xl md:text-4xl uppercase ${category.selected ? "bg-red" : "bg-orange"} 
            before:w-3 before:bg-orange before:h-8 before:absolute before:-top-8 before:left-[47%] `}>
                {category.name}
                {/* Left Triangle */}
                <div className="absolute -top-[5px] -left-[11px] md:-top-[5px] md:-left-[15px] w-0 h-0 -rotate-[44deg] lg:border-l-[20px] lg:border-r-[20px] lg:border-b-[20px] border-l-[15px] border-r-[15px] border-b-[15px] border-l-transparent border-r-transparent border-b-white" />
                {/* Right Triangle */}
                <div className="absolute -top-[4px] md:-top-[5px] -right-[11px] rotate-[47deg] md:-right-[15px] w-0 h-0 lg:border-l-[20px] lg:border-r-[20px] lg:border-b-[20px]  border-l-[15px] border-r-[15px] border-b-[15px] border-l-transparent border-r-transparent border-b-white" />
            </div>
        </div>
    );
};
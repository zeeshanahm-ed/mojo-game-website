"use client"
import React, { useState } from 'react'
import Input from '@/app/components/ui/common/Input';
import Image from 'next/image';
import { Category } from '@/app/utils/Interfaces';
import { categories } from '@/app/constants/constant';

//icons
import SearchIcon from "../../../assets/icons/search-icon.svg"




function CategoriesSection() {
    const [search, setSearch] = useState('');

    const handleSearch = (value: string) => {
        setSearch(value)
    };

    return (
        <div className='flex items-center justify-center flex-col w-full px-10'>
            <div className='my-10'>
                <Input
                    icon={<SearchIcon />}
                    type="text"
                    value={search}
                    placeholder="Search by category Name"
                    className='w-96'
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            <div className="text-center flex flex-col items-center justify-center">
                <h2 className="lg:text-8xl text-6xl font-popfun text-black mb-2 uppercase">
                    Select your categories
                </h2>
                <p className="text-lg leading-6 text-black max-w-2xl">
                    3 categories for your team, and 3 categories for the opposing team, for a total of 6 categories with 36 different questions. Choose the categories carefully to ensure the greatest chance of
                </p>
            </div>
            <div className='my-14 w-full'>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
                    {categories.map((cat, idx) => (
                        <CategoryCard key={idx} category={cat} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoriesSection;

interface Props {
    category: Category;
}

const CategoryCard = ({ category }: Props) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="relative w-44 h-44 rounded-full border-[12px] border-orange flex items-center justify-center">
                <Image src={category.icon} alt={category.name} width={100} height={100} />
            </div>
            <div className={`w-full mt-6 relative px-4 pb-1 pt-2 text-center text-white font-popfun text-2xl md:text-4xl uppercase tracking-wide ${category.color} 
            before:w-3 before:bg-orange before:h-8 before:absolute before:-top-8 before:left-[47%] `}>
                {category.name}
            </div>
        </div>
    );
};
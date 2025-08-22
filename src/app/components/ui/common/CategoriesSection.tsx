"use client"
import React, { useState } from 'react'
import Input from '@/app/components/ui/common/Input';
import Image from 'next/image';
import { GamesCategoryInterface } from '@/app/utils/Interfaces';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/app/hooks/useGetDirection';

//icons
import SearchIcon from "@/app/assets/icons/search-icon.svg"
import Button from './Button';
import SuggestCategoryNQuestionModal from '../../modals/suggest-category-N-question-modal';

interface CategoriesSectionProps {
    data: GamesCategoryInterface[];
    selectedCategories: GamesCategoryInterface[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<GamesCategoryInterface[]>>;
    mode: 'offline' | 'online';
    currentPlayer?: 1 | 2;
    onSelect?: () => void;
    title?: boolean;
    subTitle?: boolean;
    showInput?: boolean;
    suggestCategoryNQuestions: boolean;
    year?: string;
}


function CategoriesSection({ data, year, suggestCategoryNQuestions, onSelect, selectedCategories, setSelectedCategories, mode, currentPlayer, title = true, subTitle = true, showInput = true }: CategoriesSectionProps) {
    const [suggestCategoryModal, setsuggestCategoryModal] = useState(false);
    const { t } = useTranslation();
    const direction = useDirection();
    const [search, setSearch] = useState('');
    const filteredCategories = data.map((item) => ({
        ...item,
        selected: selectedCategories.some((cat) => cat.name === item.name),
    }));
    const MAX_SELECTION = 6;
    const MAX_PER_PLAYER = 3;

    const [player1Categories, setPlayer1Categories] = useState<GamesCategoryInterface[]>([]);
    const [player2Categories, setPlayer2Categories] = useState<GamesCategoryInterface[]>([]);


    const handleSearch = (value: string) => {
        setSearch(value)
    };

    const handleCategoriesClick = (value: GamesCategoryInterface) => {
        const isAlreadySelected = selectedCategories.some((cat) => cat.name === value.name);

        if (mode === 'offline') {
            if (isAlreadySelected) {
                setSelectedCategories(prev => prev.filter(cat => cat.name !== value.name));
                return;
            }

            if (selectedCategories.length >= MAX_SELECTION) return;

            setSelectedCategories(prev => [...prev, value]);

        } else if (mode === 'online') {
            // Don't allow deselect in online mode
            if (isAlreadySelected) return;

            const alreadySelectedCount = filteredCategories.filter(c => c.selected).length;
            if (alreadySelectedCount >= MAX_SELECTION) return;

            // const updated = filteredCategories.map(item =>
            //     item.name === value.name ? { ...item, selected: true } : item
            // );
            // setFilteredCategories(updated);

            if (currentPlayer === 1 && player1Categories.length < MAX_PER_PLAYER) {
                setPlayer1Categories(prev => [...prev, value]);
            } else if (currentPlayer === 2 && player2Categories.length < MAX_PER_PLAYER) {
                setPlayer2Categories(prev => [...prev, value]);
            }

            onSelect?.();
        }
    };


    const isCategoryDisabled = (category: GamesCategoryInterface): boolean => {
        const isSelected = selectedCategories.some((c) => c.name === category.name);

        if (isSelected) return false;
        if (selectedCategories.length >= MAX_SELECTION) return true;

        return false;
    };


    const handleSuggestCategoryModal = () => {
        setsuggestCategoryModal(true);
    };


    return (
        <div className='flex items-center justify-center flex-col w-full'>
            {showInput && <div className='my-10'>
                <Input
                    icon={<SearchIcon />}
                    type="text"
                    value={search}
                    placeholder={t("searchCategory")}
                    className='md:w-96 w-full'
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>}
            <div className="text-center flex flex-col items-center justify-center">
                {title && <h2 className="sm:text-6xl text-5xl lg:text-7xl  text-black mb-2 uppercase">
                    {t("selectCategories")}
                </h2>}
                {subTitle && <p className="text-sm font-secondary sm:text-base md:text-lg leading-6 text-black max-w-2xl">
                    {t("categoryInstructions")}
                </p>}
                <Button className='text-white md:w-72 w-64 sm:w-64 my-8 text-4xl md:text-5xl' onClick={() => handleSuggestCategoryModal()}>Suggest A Category</Button>

            </div>
            {year &&
                <div dir={direction} className='border-2 font-secondary flex-center text-xl md:text-2xl border-black h-12 w-40 md:h-16 md:w-48 my-10 -skew-x-6'>
                    {`${year} ${t("years")}`}
                </div>}
            <div className='my-14 w-full max-h-[800px] overflow-hidden overflow-y-auto'>
                <div className="flex-center flex-wrap  gap-6 gap-y-10">
                    {filteredCategories?.map((cat, idx) => (
                        <CategoryCard key={idx} category={cat} handleCategoriesClick={handleCategoriesClick} isDisabled={isCategoryDisabled(cat)} />
                    ))}
                </div>
            </div>
            {suggestCategoryNQuestions && <SuggestCategoryNQuestionModal mode={mode} open={suggestCategoryModal} onClose={() => setsuggestCategoryModal(false)} />}

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
        <div role='button' className={`w-32 xsm:w-40 sm:w-52 xl:w-64 flex cursor-pointer flex-col justify-center items-center ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`} onClick={() => handleCategoriesClick(category)}>
            <div className={`relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full border-[8px]  lg:border-[12px] border-orange ${category.selected ? "border-red" : "border-orange"} flex items-center justify-center`}>
                <Image src={category.icon} alt={category.name} width={100} height={100} className='w-1/2 h-1/2' />
            </div>
            <div className={`w-full mt-6 relative pb-0 pt-1 text-center text-white  text-2xl md:text-3xl xl:text-4xl uppercase ${category.selected ? " bg-red before:bg-red" : " bg-orange before:bg-orange"} before:w-2 lg:before:w-3 before:h-8 before:absolute before:-top-8 before:left-[48%] `}>
                {category.name}
                {/* Left Triangle */}
                <div className="absolute -top-[3px] -left-[10px]  md:-top-[3px] lg:-top-[5px] md:-left-[10px] lg:-left-[15px] w-0 h-0 -rotate-[45deg] lg:border-l-[20px] lg:border-r-[20px] lg:border-b-[20px] border-l-[15px] border-r-[15px] border-b-[15px] border-l-transparent border-r-transparent border-b-white" />
                {/* Right Triangle */}
                <div className="absolute -top-[3px] -right-[10px] md:-top-[3px]  lg:-top-[5px]  rotate-[45deg] md:-right-[10px] lg:-right-[15px] w-0 h-0 lg:border-l-[20px] lg:border-r-[20px] lg:border-b-[20px]  border-l-[15px] border-r-[15px] border-b-[15px] border-l-transparent border-r-transparent border-b-white" />
            </div>
        </div>
    );
};
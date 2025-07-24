
import React, { ReactNode } from 'react';

//icon
import MoonIcon from "@/app/assets/icons/moon-icon.svg";
import MaterialsIcon from "@/app/assets/icons/mojo-icon.svg";
import QuranIcon from "@/app/assets/icons/quran-icon.svg";
import SoccerIcon from "@/app/assets/icons/football-icon.svg"

interface CategoryItem {
    id: number;
    name: string;
    iconPlaceholder: ReactNode;
}

interface PropsInter {
    setSelectedCategory: (v: number | null) => void;
    selectedCategory: number | null;
}

const categories: CategoryItem[] = [
    {
        id: 1,
        name: 'Islamic',
        iconPlaceholder: <MoonIcon />
    },
    {
        id: 2,
        name: 'Materials',
        iconPlaceholder: <MaterialsIcon />
    },
    {
        id: 3,
        name: 'Soccer',
        iconPlaceholder: <SoccerIcon />
    },
    {
        id: 4,
        name: 'Quran',
        iconPlaceholder: <QuranIcon />
    }
];

const CategoriesSection: React.FC<PropsInter> = ({ setSelectedCategory, selectedCategory }) => {


    const handleCategorySelect = (categoryId: number) => {
        setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex gap-4 flex-wrap justify-center">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`relative bg-purple cursor-pointer ${selectedCategory === category.id ? '  border-2 border-dark-green ' : ' border-2 border-black '} -skew-x-6 md:-skew-x-12 overflow-hidden w-72 h-16`}>
                        {/* Main colored background */}
                        <div className={` h-full flex items-center justify-between px-6 relative `}>
                            {/* Category name */}
                            <span className="text-white text-xl md:text-2xl skew-x-12 font-medium">
                                {category.name}
                            </span>

                            {/* Icon container with white background */}
                            <div className="w-12 h-12 bg-white flex items-center justify-center shadow-sm">
                                <span className="text-2xl">{category.iconPlaceholder}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesSection;
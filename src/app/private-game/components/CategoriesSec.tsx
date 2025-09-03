// import React, { ReactNode } from 'react';
// import { useTranslation } from 'react-i18next';
// import Image from 'next/image';

// interface CategoryItem {
//     id: number;
//     name: string;
//     iconPlaceholder: ReactNode;
// }

// interface PropsInter {
//     setSelectedCategory: (v: number | null) => void;
//     selectedCategory: number | null;
// }

// const categories: CategoryItem[] = [
//     {
//         id: 1,
//         name: 'islamic',
//         iconPlaceholder: <Image src="/images/icons/moon-icon.svg" alt='moon-icon' width={100} height={100} />
//     },
//     {
//         id: 2,
//         name: 'materials',
//         iconPlaceholder: <Image src="/images/icons/mojo-icon.svg" alt='mojo-icon' width={100} height={100} />
//     },
//     {
//         id: 3,
//         name: 'soccer',
//         iconPlaceholder: <Image src="/images/icons/football-icon.svg" alt='football-icon' width={100} height={100} />
//     },
//     {
//         id: 4,
//         name: 'quran',
//         iconPlaceholder: <Image src="/images/icons/quran-icon.svg" alt='quran-icon' width={100} height={100} />
//     }
// ];

// const CategoriesSection: React.FC<PropsInter> = ({ setSelectedCategory, selectedCategory }) => {
//     const { t } = useTranslation();

//     const handleCategorySelect = (categoryId: number) => {
//         setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
//     };

//     return (
//         <div className="flex flex-col items-center justify-center font-secondary">
//             <div className="flex gap-4 flex-wrap justify-center">
//                 {categories.map((category) => (
//                     <div
//                         key={category.id}
//                         onClick={() => handleCategorySelect(category.id)}
//                         className={`relative bg-purple cursor-pointer ${selectedCategory === category.id ? '  border-2 border-dark-green ' : ' border-2 border-black '} -skew-x-6 md:-skew-x-12 overflow-hidden w-72 h-16`}>
//                         {/* Main colored background */}
//                         <div className={` h-full flex items-center justify-between px-6 relative `}>
//                             {/* Category name */}
//                             <span className="text-white text-xl md:text-2xl skew-x-12 font-medium">
//                                 {t(category.name)}
//                             </span>

//                             {/* Icon container with white background */}
//                             <div className="w-12 h-12 bg-white flex items-center justify-center shadow-sm">
//                                 <span className="text-2xl">{category.iconPlaceholder}</span>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default CategoriesSection;
'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import { useDirection } from '@/app/hooks/useGetDirection';

interface PaginationProps {
    totalPages?: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { t } = useTranslation();
    const direction = useDirection();

    const getPagination = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            const showLeftDots = currentPage > 3;
            const showRightDots = currentPage < totalPages - 3;

            pages.push(1);

            if (showLeftDots) {
                pages.push('...');
            }

            const startPage = showLeftDots ? Math.max(currentPage - 1, 2) : 2;
            const endPage = showRightDots ? Math.min(currentPage + 1, totalPages - 1) : totalPages - 1;

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (showRightDots) {
                pages.push('...');
            }

            pages.push(totalPages);
        }

        return pages;
    };

    const handlePageChange = (page: number | string) => {
        if (typeof page === 'number') {
            setCurrentPage(page);
        }
    };

    return (
        <div className="w-full bg-white mt-20 gap-8 flex items-center justify-center flex-col md:flex-row">
            {/* Prev */}
            <button
                className={`${direction === "rtl" ? "font-arabic" : "font-secondary"} text-xl md:mr-5 cursor-pointer hover:text-dark-gray`}
                onClick={() => currentPage > 1 && setCurrentPage((prev) => prev - 1)}
            >
                {t("prev")}
            </button>

            {/* Pages */}
            <div className="flex items-center gap-2">
                {getPagination().map((page, idx) => (
                    <div key={idx}>
                        {page === '...' ? (
                            <span className="px-2 text-xl text-gray-500">...</span>
                        ) : (

                            <Button
                                onClick={() => handlePageChange(page)}
                                className="text-xl"
                                bgClass={currentPage === page ? 'bg-black' : 'bg-white'}
                                textClass={currentPage === page ? 'text-white' : 'text-black'}
                            >{page}</Button>
                        )}
                    </div>
                ))}
            </div>

            {/* Next */}
            <button
                className={`${direction === "rtl" ? "font-arabic" : "font-secondary"} text-xl md:ml-5 cursor-pointer hover:text-dark-gray`}
                onClick={() => currentPage < totalPages && setCurrentPage((prev) => prev + 1)}
            >
                {t("next")}
            </button>
        </div>
    );
};

export default Pagination;

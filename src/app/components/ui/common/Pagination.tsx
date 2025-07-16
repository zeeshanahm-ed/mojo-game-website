'use client';

import React, { useState } from 'react';
import Button from './Button';

interface PaginationProps {
    totalPages?: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const getPagination = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            const showLeftDots = currentPage > 4;
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
        <div className="w-full bg-white my-20 gap-8 flex items-center justify-center flex-row">
            {/* Prev */}
            <div
                className="text-xl md:mr-10 cursor-pointer hover:text-dark-gray"
                onClick={() => currentPage > 1 && setCurrentPage((prev) => prev - 1)}
            >
                Prev
            </div>

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
            <div
                className="text-xl md:ml-10 cursor-pointer hover:text-dark-gray"
                onClick={() => currentPage < totalPages && setCurrentPage((prev) => prev + 1)}
            >
                Next
            </div>
        </div>
    );
};

export default Pagination;

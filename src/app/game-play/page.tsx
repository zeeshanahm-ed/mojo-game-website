"use client"
import React, { useState } from 'react'
import Wrapper from '@/app/components/ui/common/Wrapper';
import Input from '@/app/components/ui/common/Input';
import CategoriesSection from '@/app/components/ui/common/CategoriesSection';

//icons
import RedTraingaleBgImage from '@/app/assets/images/Rectangle 12.png';
import BlueTraingaleBgImage from '@/app/assets/images/Rectangle 8.png';
import Image from 'next/image';
import Header from './components/Header';

function GamePlay() {

    const team1Lifelines = { eye: true, peace: false, phone: false };
    const team2Lifelines = { eye: true, peace: false, phone: false };


    // Helper function to render a lifeline icon with disabled state
    const renderLifelineIcon = (iconType: 'eye' | 'peace' | 'phone', isEnabled: boolean) => {
        const iconClasses = `h-8 w-8 ${isEnabled ? 'text-black' : 'text-gray-400'}`;
        const circleClasses = `w-12 h-12 rounded-full border-2 border-black flex items-center justify-center ${isEnabled ? 'bg-white' : 'bg-gray-200 opacity-60'}`;

        let iconSvg;
        switch (iconType) {
            case 'eye':
                iconSvg = (
                    <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                );
                break;
            case 'peace':
                iconSvg = (
                    <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m-3-3l6-6m-6 0l6 6" />
                    </svg>
                );
                break;
            case 'phone':
                iconSvg = (
                    <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                );
                break;
        }

        return (
            <div className={circleClasses}>
                {iconSvg}
            </div>
        );
    };

    return (
        <section className='w-full'>
            <Header />
            <Wrapper>
                <div className='flex justify-center flex-col h-auto pt-32 px-4 md:px-10'>
                    <div className='text-start mb-10'>
                        <h2 className="md:text-8xl text-5xl font-popfun text-black mb-2 uppercase">
                            Questions
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg leading-6 text-black max-w-2xl">
                            and 3 categories for the opposing team.
                        </p>
                    </div>
                    <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 gap-y-10'>
                        <ScoreCard />
                        <ScoreCard />
                        <ScoreCard />
                        <ScoreCard />
                        <ScoreCard />
                        <ScoreCard />
                    </div>
                    <div className="mt-20 relative z-10 flex flex-col md:flex-row items-center justify-between w-full space-y-8 md:space-y-0 md:space-x-12">
                        {/* H1 Team Section (Red) */}
                        <div className="text-white p-6 md:p-8 bg-[url('/images/red-rectangle.png')] bg-no-repeat bg-cover w-full md:w-1/2">
                            <div className='flex items-center  justify-between w-full md:w-3/4'>
                                <div className="flex flex-col items-start">
                                    <h3 className="text-3xl md:text-7xl font-popfun uppercase" >
                                        {"Team 1"}
                                    </h3>
                                    <p className="text-lg md:text-3xl font-popfun uppercase" >
                                        SCORE: {"200".toString().padStart(2, '0')}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="text-2xl mb-2">Life lines</p>
                                    <div className="flex space-x-2">
                                        {renderLifelineIcon('eye', team1Lifelines.eye)}
                                        {renderLifelineIcon('peace', team1Lifelines.peace)}
                                        {renderLifelineIcon('phone', team1Lifelines.phone)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* H2 Team Section (Blue) */}
                        <div
                            className="text-white p-6 md:p-8 bg-[url('/images/blue-rectangle.png')] bg-cover bg-no-repeat flex items-center justify-end w-full  md:w-1/2"
                        >
                            <div className='flex items-center  justify-between w-full md:w-3/4'>
                                <div className="flex flex-col items-start">
                                    <p className="text-2xl mb-2">Life lines</p>
                                    <div className="flex space-x-2">
                                        {renderLifelineIcon('eye', team2Lifelines.eye)}
                                        {renderLifelineIcon('peace', team2Lifelines.peace)}
                                        {renderLifelineIcon('phone', team2Lifelines.phone)}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <h3 className="text-3xl md:text-7xl font-popfun uppercase" >
                                        {"Team 2"}
                                    </h3>
                                    <p className="text-lg md:text-3xl font-popfun uppercase" >
                                        SCORE: {"400".toString().padStart(2, '0')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </section >
    )
}

export default GamePlay;

type ScoreCardProps = {
    imageSrc?: string;
    title?: string;
    scores?: number[]; // Should be 3 scores
    onScoreClick?: (value: number) => void;
};

const ScoreCard: React.FC<ScoreCardProps> = ({ imageSrc, title, scores, onScoreClick }) => {
    return (
        <div className="flex-1 flex items-center justify-center font-popfun">
            <div className="relative w-full">
                <div className='w-full'>
                    <div className='flex items-center justify-between'>
                        <div className='border border-black h-16 w-[200px] cursor-pointer hover:bg-gray-200  -skew-x-12  text-4xl flex items-center justify-start px-4'>200</div>
                        <div className='border border-black h-16 w-[200px] cursor-pointer hover:bg-gray-200 -skew-x-12  text-4xl flex items-center justify-end px-4'>200</div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='border border-black h-16 w-[200px] cursor-pointer hover:bg-gray-200  -skew-x-12  text-4xl flex items-center justify-start px-4'>400</div>
                        <div className='border border-black h-16 w-[200px] cursor-pointer hover:bg-gray-200 -skew-x-12  text-4xl flex items-center justify-end px-4'>400</div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='border border-black h-16 w-[200px] cursor-pointer  hover:bg-gray-200 -skew-x-12  text-4xl flex items-center justify-start px-4'>600</div>
                        <div className='border border-black h-16 w-[200px] cursor-pointer  hover:bg-gray-200 -skew-x-12  text-4xl flex items-center justify-end px-4'>600</div>
                    </div>
                </div>

                <div className="absolute -top-4 left-[30%] w-fit flex cursor-pointer flex-col justify-center items-center">
                    <div className={`w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-white rounded-full border-[12px] border-orange flex items-center justify-center`}>
                        <Image src={"/categories-images/horror-movies.png"} alt={"hallo"} width={100} height={100} className='w-1/2 h-1/2' />
                    </div>
                    <div className={`relative -mt-1 pb-1 pt-2 px-4 text-center text-white font-popfun text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide bg-orange`}
                    >
                        {"Horror Movies"}
                    </div>
                </div>
            </div>
        </div>
    );
};

import React from 'react';
import Image from 'next/image';

import BlackStarImage from "@/app/assets/images/black-star.png"
import OfflinePlayImage from "@/app/assets/images/offlinemode-image.png"
import QuizAppImage from "@/app/assets/images/quiz-app-image.png"
import Wrapper from '@/app/components/ui/common/Wrapper';

const Banner: React.FC = () => {
    return (
        <section className="w-full bg-yellow py-16 pb-28 md:pb-16 px-1 md:px-10 flex flex-col items-center justify-center relative overflow-hidden border-b-4 border-black">
            {/* Main Content */}
            <Wrapper>
                <div className="relative z-10 flex flex-row items-center justify-center w-full text-center ">
                    {/* Left Side - Icon and Star */}
                    <div className="hidden lg:flex left-10 top-0 absolute items-center justify-center flex-col lg:justify-start space-x-4 mb-8 lg:mb-0">
                        <Image src={BlackStarImage} alt='Star' className='w-12 h-12 mr-10' />
                    </div>
                    <div className="flex items-start left-0 -top-10 sm:top-0 lg:top-20 absolute justify-end">
                        <Image src={OfflinePlayImage} alt='Offline Play' className='w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32' />
                    </div>

                    {/* Middle Section - Heading and Description */}
                    <div className="flex flex-col text-center items-center lg:w-2/4 px-4">
                        <h2 className="text-6xl md:text-8xl lg:text-9xl leading-tight uppercase font-popfun">
                            PLAY LOCAL
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg max-w-xl">
                            An interactive group game in which we test your knowledge and culture
                        </p>
                    </div>

                    {/* Right Side - Question Mark Icon */}
                    <div className="flex right-0 sm:-top-8 top-0  absolute items-center justify-end lg:w-52 lg:h-52 md:w-32 md:h-32 sm:w-24 sm:h-24 w-16 h-16">
                        <Image src={QuizAppImage} alt='Quiz App' className='w-full h-full' />
                    </div>
                </div>
            </Wrapper>
        </section>
    );
};

export default Banner;
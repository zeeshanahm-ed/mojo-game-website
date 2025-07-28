import React from 'react';
import Image from 'next/image';
import Wrapper from '@/app/components/ui/common/Wrapper';

import BlackStarImage from "@/app/assets/images/black-star.png"
import OnlinePlayImage from "@/app/assets/images/onlinemode-image.png"
import QuizAppImage from "@/app/assets/images/quiz-app-image.png"

const Banner: React.FC = () => {

    return (
        <section className="w-full bg-yellow py-20 px-1 md:px-10 flex flex-col items-center justify-center relative overflow-hidden border-b-4 border-black">
            {/* Main Content */}
            <Wrapper>
                <div className="relative z-10 flex flex-row items-center justify-center w-full text-center ">
                    {/* Left Side - Icon and Star */}
                    <div className="md:left-10 right-28 -top-12 md:top-0 absolute md:w-12 md:h-12 w-8 h-8">
                        <Image src={BlackStarImage} alt='Star' className='w-full h-full object-contain' />
                    </div>
                    <div className="flex items-start left-0 -top-10 sm:-top-5 md:top-20 absolute justify-end sm:w-20 sm:h-20 w-16 h-16 lg:w-32 lg:h-32">
                        <Image src={OnlinePlayImage} alt='Offline Play' className='s-full h-full' />
                    </div>

                    {/* Middle Section - Heading and Description */}
                    <div className="flex flex-col text-center items-center lg:w-2/4 px-4">
                        <h2 className="text-6xl md:text-8xl lg:text-9xl leading-tight uppercase font-popfun">
                            Play global
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg max-w-xl">
                            An interactive group game in which we test your knowledge and culture
                        </p>
                    </div>

                    {/* Right Side - Question Mark Icon */}
                    <div className="flex right-0 -top-10 absolute items-center justify-end lg:w-52 lg:h-52 md:w-32 md:h-32 sm:w-24 sm:h-24 w-16 h-16">
                        <Image src={QuizAppImage} alt='Quiz App' className='w-full h-full' />
                    </div>
                </div>
            </Wrapper>
        </section>
    );
};

export default Banner;
import React from 'react';
import Image from 'next/image';
import Wrapper from '@/app/components/ui/common/Wrapper';
import { useTranslation } from 'react-i18next';

import BlackStarImage from "@/app/assets/images/black-star.png"
import OnlinePlayImage from "@/app/assets/images/onlinemode-image.png"
import QuizAppImage from "@/app/assets/images/quiz-app-image.png"

const Banner: React.FC = () => {
    const { t } = useTranslation();
    return (
        <section className="w-full bg-yellow py-16 px-1 md:px-10 flex flex-col items-center justify-center relative overflow-hidden border-b-4 border-black">
            {/* Main Content */}
            <Wrapper>
                <div className="relative z-10 flex flex-row items-center justify-center w-full text-center ">
                    {/* Left Side - Icon and Star */}
                    <div className="md:left-10 right-28 -top-12 md:-top-10 absolute w-5 h-5 md:w-8 md:h-8">
                        <Image src={BlackStarImage} alt='Star' className='w-full h-full object-contain' />
                    </div>
                    <div className="flex items-start left-3 -top-8 md:top-14 absolute justify-end w-12 h-12 md:w-20 md:h-20">
                        <Image src={OnlinePlayImage} alt='Offline Play' className='w-full h-full' />
                    </div>

                    {/* Middle Section - Heading and Description */}
                    <div className="flex flex-col text-center items-center lg:w-2/4 px-4">
                        <h2 className="text-6xl md:text-8xl leading-tight uppercase ">
                            {t("playGlobal")}
                        </h2>
                        <p className="text-sm font-secondary sm:text-base  max-w-xl">
                            {t("playLocalNote")}
                        </p>
                    </div>

                    {/* Right Side - Question Mark Icon */}
                    <div className="flex right-3 -top-5 md:-top-5 absolute items-center justify-end lg:w-36 lg:h-36 md:w-32 md:h-32  w-16 h-16">
                        <Image src={QuizAppImage} alt='Quiz App' className='w-full h-full' />
                    </div>
                </div>
            </Wrapper>
        </section>
    );
};

export default Banner;
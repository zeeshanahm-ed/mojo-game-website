import React from 'react';
import Image from 'next/image';
import Wrapper from '@/app/components/ui/common/Wrapper';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/app/hooks/useGetDirection';

const Banner: React.FC = () => {

    const { t } = useTranslation();
    const direction = useDirection();

    return (
        <section className="w-full bg-yellow py-16 px-1 md:px-10 flex flex-col items-center justify-center relative overflow-hidden border-b-4 border-black">
            {/* Main Content */}
            <Wrapper>
                <div className="relative z-10 flex flex-row items-center justify-center w-full text-center ">
                    {/* Left Side - Icon and Star */}
                    <div className="hidden md:flex left-10 -top-10 absolute items-center justify-center flex-col lg:justify-start space-x-4 mb-8 lg:mb-0">
                        <Image src="/images/black-star.png" alt='Star' className='w-8 h-8 mr-10 object-contain' width={100} height={100} />
                    </div>
                    <div className="flex items-start left-0 -top-5 md:top-10 absolute justify-end">
                        <Image src="/images/offlinemode-image.png" alt='Offline Play' className='w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24' width={100} height={100} />
                    </div>

                    {/* Middle Section - Heading and Description */}
                    <div className="flex flex-col text-center items-center px-4">
                        <h2 className={` text-nowrap leading-tight uppercase ${direction === "rtl" ? "text-4xl md:text-6xl" : "text-6xl md:text-8xl"}`}>
                            {t("playLocal")}
                        </h2>
                        <p className={`text-sm ${direction === "rtl" ? "font-arabic mt-7" : "font-secondary"} sm:text-base max-w-xl`}>
                            {t("playLocalNote")}
                        </p>
                    </div>

                    {/* Right Side - Question Mark Icon */}
                    <div className="flex right-0 sm:-top-10 md:-top-5 top-0  absolute items-center justify-end lg:w-36 lg:h-36 md:w-32 md:h-32 sm:w-24 sm:h-24 w-16 h-16">
                        <Image src="/images/quiz-app-image.png" alt='Quiz App' className='w-full h-full' width={100} height={100} />
                    </div>
                </div>
            </Wrapper>
        </section>
    );
};

export default Banner;
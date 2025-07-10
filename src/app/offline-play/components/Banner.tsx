import React from 'react';
import Image from 'next/image';

import StarImage from "@/app/assets/images/star.png"
import OfflinePlayImage from "@/app/assets/images/offlinemode-image.png"
import QuizAppImage from "@/app/assets/images/quiz-app-image.png"

const Banner: React.FC = () => {
    return (
        <section className="w-full bg-yellow py-16 px-10 flex flex-col items-center justify-center relative overflow-hidden border-b-4 border-black">
            {/* Main Content */}
            <div className="relative z-10 flex flex-row items-center justify-between w-full text-center ">
                {/* Left Side - Icon and Star */}
                <div className="flex items-center justify-center flex-col lg:justify-start space-x-4 mb-8 lg:mb-0 lg:w-1/4">
                    <Image src={StarImage} alt='Star' className='w-12 h-12 mr-10' />
                    <Image src={OfflinePlayImage} alt='Offline Play' className='w-32 h-32 mt-10' />
                </div>

                {/* Middle Section - Heading and Description */}
                <div className="flex flex-col text-center items-center lg:w-2/4 px-4">
                    <h2 className="text-6xl md:text-8xl lg:text-9xl leading-tight mb-4 uppercase font-popfun">
                        PLAY LOCAL
                    </h2>
                    <p className="text-base md:text-lg max-w-xl">
                        An interactive group game in which we test your knowledge and culture
                    </p>
                </div>

                {/* Right Side - Question Mark Icon */}
                <div className="flex items-center justify-end mt-8 lg:mt-0 lg:w-1/4">
                    <Image src={QuizAppImage} alt='Quiz App' className='lg:w-60 lg:h-60 w-40 h-40' />
                </div>
            </div>
        </section>
    );
};

export default Banner;
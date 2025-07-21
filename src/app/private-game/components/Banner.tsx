import React from 'react';
import Image from 'next/image';
import Wrapper from '@/app/components/ui/common/Wrapper';

import PrivateGameImage from "@/app/assets/images/private-games-images.png"

const Banner: React.FC = () => {
    return (
        <section className="w-full bg-purple py-16 px-4 md:px-10 flex flex-col items-center justify-center relative overflow-hidden border-b-4 border-black">
            {/* Main Content */}
            <Wrapper>
                <div className="relative z-10 flex flex-row items-center justify-start md:justify-center w-full text-center ">
                    {/* Middle Section - Heading and Description */}
                    <div className="flex flex-col text-start items-start justify-start md:items-center md:text-center lg:w-2/4">
                        <h2 className="text-6xl text-white  md:text-8xl lg:text-9xl leading-tight mb-4 uppercase font-popfun">
                            Private game
                        </h2>
                        <p className="text-sm sm:text-base text-white md:text-lg">
                            Game library, each game has a different field.
                        </p>
                        <p className="text-sm sm:text-base text-white md:text-lg">
                            The questions in these games are divided into 3 different levels.
                        </p>
                    </div>

                    {/* Right Side - Question Mark Icon */}
                    <div className="-right-5 -top-6 md:right-0 lg:-top-4 md:-top-10 absolute lg:w-44 lg:h-44 md:w-40 w-24 xsm:w-28 xsm:h-28 sm:w-32 sm:h-32 md:h-40 h-24">
                        <Image src={PrivateGameImage} alt='Private Games' className='w-full h-full object-contain' />
                    </div>
                </div>
            </Wrapper>
        </section>
    );
};

export default Banner;
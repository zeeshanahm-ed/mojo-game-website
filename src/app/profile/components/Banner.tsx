import React from 'react';
import Image from 'next/image';
//icons
import StarImage from "@/app/assets/images/star.png"
import Wrapper from '@/app/components/ui/common/Wrapper';


const Banner: React.FC = () => {

    return (
        <div className="w-full bg-black py-16 px-4 md:px-10 flex flex-col items-center justify-center relative overflow-hidden border-b-4 border-black">
            {/* Main Content */}
            <Wrapper>
                <div className="relative z-10 flex flex-row items-center justify-center w-full text-center ">
                    <div className="flex left-0 sm:left-10 top-0 absolute items-center justify-center">
                        <Image src={StarImage} alt='Star' className='object-contain md:w-12 w-8 h-12' />
                    </div>

                    <div className="flex flex-col text-center items-center lg:w-2/4 px-4 text-white">
                        <h2 className="text-6xl md:text-8xl lg:text-9xl leading-tight mb-4 uppercase ">
                            My account
                        </h2>
                        <p className="text-base text-white md:text-lg">
                            Your personal profile on mojo system .
                        </p>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default Banner;
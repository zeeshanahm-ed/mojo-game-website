import React from 'react';
import Image from 'next/image';
import Wrapper from '@/app/components/ui/common/Wrapper';
//icons
import QuestionImage from "/images/question-image-colorful.png";
import CrownImage from "/images/crown-image.png";


const Banner: React.FC = () => {

    return (
        <div className="w-full bg-white py-10 px-1 md:px-10 flex flex-col items-center justify-center relative overflow-hidden border-y-2 border-border-gray">
            {/* Main Content */}
            <Wrapper>
                <div className="relative z-10 flex flex-row items-center justify-center w-full text-center ">
                    <div className="md:w-48 w-20 sm:w-28 flex left-0  top-0 absolute items-center justify-center">
                        <Image src={QuestionImage} alt='Question' className='object-contain w-full h-full' />
                    </div>

                    <div className="flex flex-col text-center items-center lg:w-2/4 px-4">
                        <p className="text-sm text-light-gray font-secondary sm:text-base lg:text-lg">
                            Explore our
                        </p>
                        <h2 className="text-6xl text-black md:text-8xl leading-tight uppercase ">
                            Subscription
                        </h2>
                        <p className="text-sm text-black font-secondary sm:text-base ">
                            One simple plan giving you full access to every premium feature.
                        </p>
                    </div>
                    <div className="md:w-24 w-16 flex -right-0 -top-0  absolute items-center justify-center">
                        <Image src={CrownImage} alt='Crown' className='object-contain w-full h-full' />
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default Banner;
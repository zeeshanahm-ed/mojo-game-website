import React from 'react';
import Image from 'next/image';
//icons
import QuestionImage from "@/app/assets/images/question-image-colorful.png";
import CrownImage from "@/app/assets/images/crown-image.png";
import Wrapper from '@/app/components/ui/common/Wrapper';


const Banner: React.FC = () => {

    return (
        <div className="w-full bg-white py-10 sm:py-16 px-1 md:px-10 flex flex-col items-center justify-center relative overflow-hidden border-y-2 border-border-gray">
            {/* Main Content */}
            <Wrapper>
                <div className="relative z-10 flex flex-row items-center justify-center w-full text-center ">
                    <div className="md:w-56 w-20 sm:w-28 flex left-0  top-0 absolute items-center justify-center">
                        <Image src={QuestionImage} alt='Question' className='object-contain w-full h-full' />
                    </div>

                    <div className="flex flex-col text-center items-center lg:w-2/4 px-4">
                        <p className="text-sm text-light-gray font-secondary sm:text-base mb-3 lg:text-lg">
                            Explore our
                        </p>
                        <h2 className="text-6xl text-black md:text-8xl lg:text-9xl leading-tight uppercase ">
                            Subscription
                        </h2>
                        <p className="text-sm text-black font-secondary sm:text-base  lg:text-lg">
                            One simple plan giving you full access to every premium feature.
                        </p>
                    </div>
                    <div className="md:w-32 w-16 flex -right-0 -top-0  absolute items-center justify-center">
                        <Image src={CrownImage} alt='Crown' className='object-contain w-full h-full' />
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default Banner;
import React from 'react';
import Image from 'next/image';

import StarImage from "@/app/assets/images/star.png"
import QuizAppImage from "@/app/assets/images/question-image-colorful.png"
import Button from '@/app/components/ui/common/Button';
import Wrapper from '@/app/components/ui/common/Wrapper';

const Banner: React.FC = () => {
    return (
        <section className="w-full bg-blue py-16 px-10 flex flex-col items-center justify-center relative overflow-hidden border-b-4 border-black">
            {/* Main Content */}
            <Wrapper>
                <div className="relative z-10 flex flex-row items-center justify-center w-full text-center ">
                    {/* Left Side - Icon and Star */}
                    <div className="hidden md:flex left-10 top-0 absolute items-center justify-center flex-col lg:justify-start space-x-4 mb-8 lg:mb-0">
                        <Image src={StarImage} alt='Star' className='w-12 h-12 mr-10' />
                    </div>

                    {/* Middle Section - Heading and Description */}
                    <div className="flex flex-col text-center items-center lg:w-2/4 px-4">
                        <h2 className="text-7xl text-white  md:text-8xl lg:text-9xl leading-tight mb-4 uppercase font-popfun">
                            My games
                        </h2>
                        <p className="text-base text-white md:text-lg">
                            An interactive group game in which we test your knowledge and culture.
                        </p>
                        <div className='w-full my-10'>
                            <Button className='lg:text-6xl w-72 text-4xl' bgClass="bg-yellow" textClass="text-black">
                                New Game
                            </Button>
                        </div>
                    </div>

                    {/* Right Side - Question Mark Icon */}
                    <div className="flex right-0 lg:top-0 -bottom-14 absolute items-center justify-end mt-8 lg:mt-0 lg:w-1/4">
                        <Image src={QuizAppImage} alt='Quiz App' className='lg:w-80 lg:h-64 w-24 h-24' />
                    </div>
                </div>
            </Wrapper>
        </section>
    );
};

export default Banner;
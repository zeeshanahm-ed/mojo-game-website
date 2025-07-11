import React, { useState } from 'react';
import Image from 'next/image';

import BlackStarImage from "@/app/assets/images/black-star.png"
import OnlinePlayImage from "@/app/assets/images/onlinemode-image.png"
import QuizAppImage from "@/app/assets/images/quiz-app-image.png"
import Button from '@/app/components/ui/common/Button';
import JoinRoomModal from '@/app/components/modals/join-room-modal';

const Banner: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
    };


    return (
        <section className="w-full bg-yellow py-16 px-10 flex flex-col items-center justify-center relative overflow-hidden border-b-4 border-black">
            {/* Main Content */}
            <div className="relative z-10 flex flex-row items-center justify-center w-full text-center ">
                {/* Left Side - Icon and Star */}
                <div className="hidden lg:flex left-10 top-0 absolute items-center justify-center flex-col lg:justify-start space-x-4 mb-8 lg:mb-0">
                    <Image src={BlackStarImage} alt='Star' className='w-12 h-12 mr-10' />
                </div>
                <div className="flex items-start left-0 -top-10 lg:top-0 absolute justify-end space-x-4 mb-8 lg:mb-0 lg:w-1/4">
                    <Image src={OnlinePlayImage} alt='Offline Play' className='w-20 h-20 lg:w-32 lg:h-32' />
                </div>

                {/* Middle Section - Heading and Description */}
                <div className="flex flex-col text-center items-center lg:w-2/4 px-4">
                    <h2 className="text-7xl md:text-8xl lg:text-9xl leading-tight mb-4 uppercase font-popfun">
                        Play global
                    </h2>
                    <p className="text-base md:text-lg max-w-xl">
                        An interactive group game in which we test your knowledge and culture
                    </p>
                    <div className='w-full my-10'>
                        <Button className='xl:w-1/2 lg:text-6xl w-72 text-4xl' onClick={() => setShowModal(true)}>
                            Join online game
                        </Button>
                    </div>
                    <div className='lg:text-6xl uppercase font-popfun text-4xl'>OR</div>
                </div>

                {/* Right Side - Question Mark Icon */}
                <div className="flex right-0 lg:top-0 -bottom-10 absolute items-center justify-end mt-8 lg:mt-0 lg:w-1/4">
                    <Image src={QuizAppImage} alt='Quiz App' className='lg:w-60 lg:h-60 w-24 h-24' />
                </div>
            </div>
            <JoinRoomModal open={showModal} onClose={handleClose} />
        </section>
    );
};

export default Banner;
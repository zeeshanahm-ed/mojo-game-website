import React from 'react';
import Image from 'next/image';
import Button from '@/app/components/ui/common/Button';
import Wrapper from '@/app/components/ui/common/Wrapper';
import { useTranslation } from 'react-i18next';
import CreateGameModal from '@/app/components/modals/create-game-modal';
import { useCreateGameModalStore } from '@/app/store/useCreateGameModalStore';


const Banner: React.FC = () => {
    const { t } = useTranslation();
    const { openModal } = useCreateGameModalStore();
    return (
        <section className="w-full bg-[#1078FF] pb-5 py-10 px-4 md:px-10 flex flex-col items-center justify-center relative overflow-hidden border-b-4 border-black">
            {/* Main Content */}
            <Wrapper>
                <div className="relative z-10 flex flex-row items-center justify-center w-full text-center ">
                    {/* Left Side - Icon and Star */}
                    <div className="flex left-0 md:left-10 -top-5 absolute items-center justify-center">
                        <Image src="/images/star.png" alt='Star' width={100} height={100} className='object-contain md:w-10 w-5 h-10' />
                    </div>

                    {/* Middle Section - Heading and Description */}
                    <div className="flex flex-col text-center items-center lg:w-2/4">
                        <h2 className="text-6xl text-white  md:text-8xl leading-tight uppercase ">
                            {t("myGames")}
                        </h2>
                        <p className="text-sm font-secondary sm:text-base text-white max-w-lg">
                            {t("playLocalNote")}
                        </p>
                        <div className='w-full my-10'>
                            <Button onClick={openModal} className='md:text-4xl w-44 sm:w-52 md:w-72 text-3xl' bgClass="bg-yellow" boxShadow={false} textClass="text-black">
                                {t("newGame")}
                            </Button>
                        </div>
                    </div>

                    {/* Right Side - Question Mark Icon */}
                    <div className="flex -right-10 -top-6 md:right-0 lg:-top-4 md:-top-10 absolute items-center justify-center">
                        <Image src="/images/question-image-colorful.png" alt='Quiz App' width={100} height={100} className='lg:w-52 xl:w-64 md:h-auto md:w-44 w-24 xsm:w-28 sm:w-32 h-1/2' />
                    </div>
                </div>
            </Wrapper>
            <CreateGameModal />
        </section>
    );
};

export default Banner;
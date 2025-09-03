import React from 'react';
import Image from 'next/image';
import Wrapper from '@/app/components/ui/common/Wrapper';
import { useTranslation } from 'react-i18next';



const Banner: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full bg-black py-10 px-4 md:px-10 flex flex-col items-center justify-center relative overflow-hidden border-b-4 border-black">
            {/* Main Content */}
            <Wrapper>
                <div className="relative z-10 flex flex-row items-center justify-center w-full text-center ">
                    <div className="flex left-0 sm:left-10 top-0 absolute items-center justify-center">
                        <Image src="/images/star.png" alt='Star' width={100} height={100} className='object-contain md:w-12 w-8 h-12' />
                    </div>

                    <div className="flex flex-col text-center items-center lg:w-2/4 px-4 text-white">
                        <h2 className="text-6xl md:text-8xl leading-tight mb-4 uppercase ">
                            {t("contactUs")}
                        </h2>
                        <p className="text-sm font-secondary sm:text-base text-white">
                            {t("playLocalNote")}
                        </p>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default Banner;
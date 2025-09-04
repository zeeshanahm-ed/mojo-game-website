import React from 'react';
import Image from 'next/image';
import Wrapper from '@/app/components/ui/common/Wrapper';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/app/hooks/useGetDirection';


const Banner: React.FC = () => {

    const { t } = useTranslation();
    const direction = useDirection();

    return (
        <div className="w-full bg-white py-10 px-1 md:px-10 flex flex-col items-center justify-center relative overflow-hidden border-y-2 border-border-gray">
            {/* Main Content */}
            <Wrapper>
                <div className="relative z-10 flex flex-row items-center justify-center w-full text-center ">
                    <div className="md:w-48 w-20 sm:w-28 flex left-0  top-0 absolute items-center justify-center">
                        <Image src="/images/question-image-colorful.png" alt='question-image' className='object-contain w-full h-full' width={100} height={100} />
                    </div>

                    <div className="flex flex-col text-center items-center lg:w-2/4 px-4">
                        <p className={`text-sm text-light-gray  sm:text-base lg:text-lg ${direction === "rtl" ? "font-arabic" : "font-secondary"}`}>
                            {t("exploreOur")}
                        </p>
                        <h2 className={` text-nowrap leading-tight uppercase ${direction === "rtl" ? "text-4xl md:text-7xl" : "text-6xl md:text-8xl"}`}>
                            {t("subscription")}
                        </h2>
                        <p className={`text-sm text-black sm:text-base ${direction === "rtl" ? "font-arabic mt-3" : "font-secondary"}`}>
                            {t("subscriptionDescription")}
                        </p>
                    </div>
                    <div className="md:w-24 w-16 flex -right-0 -top-0  absolute items-center justify-center">
                        <Image src="/images/crown-image.png" alt='crown-image' className='object-contain w-full h-full' width={100} height={100} />
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default Banner;
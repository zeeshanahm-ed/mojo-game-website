import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Wrapper from '@/app/components/ui/common/Wrapper';
import Button from '@/app/components/ui/common/Button';
//icons
import { IoIosArrowBack } from "react-icons/io";
import kidsToy from "@/app/assets/images/kids-toy.png";
import kidsToy2 from "@/app/assets/images/kids-toy2.png";
import Bucket from "@/app/assets/images/bucket.png";
import Spiner from "@/app/assets/images/spiner.png";
import Horse from "@/app/assets/images/horse.png";
import Train from "@/app/assets/images/train.png";


interface BannerProps {

}


const Banner: React.FC<BannerProps> = () => {
    const router = useRouter();
    const handleGoBack = () => {
        router.push("/");
    };

    return (
        <div className="w-full bg-[#DBFF10] md:py-24 py-14 h-80 md:h-auto px-4 sm:px-6 md:px-10 flex flex-col items-center justify-center relative overflow-hidden border-b-4 border-black">
            {/* Main Content */}
            <Wrapper>
                <div className="relative z-10 flex flex-row items-start justify-start md:justify-center w-full text-center ">
                    <div className="flex left-0 -top-20 md:-top-20 absolute items-center justify-center">
                        <Button
                            boxShadow={false}
                            onClick={handleGoBack}
                            prefixElement={<IoIosArrowBack className='text-xl lg:text-3xl lg:mb-2 mb-1 mr-0' />}
                            className='text-xl lg:text-4xl w-28 lg:w-40 flex items-center'>Main page</Button>
                    </div>
                    <div className="flex left-1/2 md:left-0 -bottom-[100px] md:-bottom-[50px] absolute items-center justify-center w-24 h-24 md:w-20 md:h-16 lg:w-28 lg:h-20">
                        <Image src={kidsToy} alt='Tube Image' className='object-contain w-full h-full' />
                    </div>
                    <div className="flex left-[10%] -bottom-[85px] md:-top-5  lg:-top-2 md:left-0 lg:left-5 absolute items-center justify-center w-20 h-20 md:h-16 lg:w-28 lg:h-20">
                        <Image src={kidsToy2} alt='Electron Image' className='object-contain w-full h-full' />
                    </div>

                    <div className="flex right-[40%] md:left-24 lg:left-36 -top-0 md:top-20 lg:top-14 absolute items-center justify-center w-20 h-20 md:w-20 md:h-16 lg:w-32 lg:h-24">
                        <Image src={Spiner} alt='Electron Image' className='object-contain w-full h-full' />
                    </div>
                    <div className="flex  -top-5  -right-0 md:-bottom-[50px] absolute items-center justify-center w-20 h-20 md:h-16 lg:w-28 lg:h-24">
                        <Image src={Train} alt='Train ' className='object-contain w-full h-full' />
                    </div>
                    <div className="flex -bottom-[45px] md:-bottom-[65px] right-0  absolute items-center justify-center w-20 h-16 lg:w-28 lg:h-24">
                        <Image src={Bucket} alt='Bucket' className='object-contain w-full h-full' />
                    </div>
                    <div className="flex right-24 lg:right-36 top-6 lg:top-14 absolute items-center justify-center w-20 h-16 lg:w-28 lg:h-20">
                        <Image src={Horse} alt='Horse' className='object-contain w-full h-full' />
                    </div>


                    <div className="flex flex-col items-start md:items-center lg:w-2/4 text-black -top-5 md:-top-0 relative ">
                        <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-tight uppercase font-popfun">
                            kids section
                        </h2>
                        <p className="text-xs text-start md:text-center sm:text-sm md:text-base max-w-64 lg:text-lg md:max-w-lg lg:max-w-max">
                            A special interface for children. We test their knowledge according to their ages.
                        </p>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default Banner;
import React from 'react';
import Image from 'next/image';
import Wrapper from '@/app/components/ui/common/Wrapper';
import Button from '@/app/components/ui/common/Button';
//icons
import BoildTubeImage from "@/app/assets/images/boild-tube-image.png";
import ElectronImage from "@/app/assets/images/electron-image.png";
import ScientistImage from "@/app/assets/images/scientist-image.png";
import TubImage from "@/app/assets/images/tube-image.png";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';

interface BannerProps {
    title: string;
    isSubject: boolean;
    clearState: () => void;
}


const Banner: React.FC<BannerProps> = ({ title = "students", isSubject, clearState }) => {
    const router = useRouter();
    const handleGoBack = () => {
        if (isSubject) {
            clearState();
        } else {
            router.push("/")
        }
    };

    return (
        <div className="w-full bg-yellow md:py-20 py-10 h-80 md:h-auto px-4 md:px-10 flex flex-col items-center justify-center relative overflow-hidden border-b-4 border-black">
            {/* Main Content */}
            <Wrapper>
                <div className="relative -top-8 z-10 flex flex-row items-start justify-start md:justify-center w-full text-center ">
                    <div className="flex left-0 -top-16 md:-top-8 absolute items-center justify-center">
                        <Button
                            boxShadow={false}
                            onClick={handleGoBack}
                            prefixElement={<IoIosArrowBack className='text-xl lg:text-3xl lg:mb-2 mb-1 mr-0' />}
                            className='text-xl lg:text-4xl w-28 lg:w-40 flex items-center'>{isSubject ? "Subjects" : "Main page"}</Button>
                    </div>

                    <div className="flex md:-left-8 -left-5 -bottom-[145px] md:-bottom-[115px] absolute items-center justify-center w-28 lg:w-36">
                        <Image src={BoildTubeImage} alt='Tube Image' className='object-contain w-full h-full' />
                    </div>
                    <div className="flex left-0 md:left-36 lg:left-48 md:-bottom-16 lg:-bottom-12 absolute items-center justify-center w-14 lg:w-20">
                        <Image src={ElectronImage} alt='Electron Image' className='object-contain w-full h-full' />
                    </div>
                    <div className="flex right-0 md:-right-8 -bottom-32 absolute items-center justify-center w-32 lg:w-40">
                        <Image src={ScientistImage} alt='Electron Image' className='object-contain w-full h-full' />
                    </div>
                    <div className="flex right-44 md:right-40 -bottom-28 absolute items-center justify-center w-16 lg:w-20">
                        <Image src={TubImage} alt='Electron Image' className='object-contain w-full h-full' />
                    </div>

                    <div className="flex flex-col items-start md:items-center lg:w-2/4 text-black ">
                        <h2 className="text-6xl md:text-8xl lg:text-9xl leading-tight uppercase font-popfun">
                            {title}
                        </h2>
                        <p className="text-sm md:text-xl">
                            A series of questions for students of every age group.
                        </p>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default Banner;
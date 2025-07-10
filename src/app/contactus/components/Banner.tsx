import React from 'react';
import Image from 'next/image';
//icons
import StarImage from "@/app/assets/images/star.png"


const Banner: React.FC = () => {

    return (
        <section className="w-full bg-black py-16 px-10 flex flex-col items-center justify-center relative overflow-hidden border-b-4 border-black">
            {/* Main Content */}
            <div className="relative z-10 flex flex-row items-center justify-center w-full text-center ">
                <div className="flex left-0 top-0 absolute items-center justify-center flex-col lg:justify-start space-x-4 mb-8 lg:mb-0 lg:w-1/4">
                    <Image src={StarImage} alt='Star' className='w-12 h-12 mr-10' />
                </div>

                <div className="flex flex-col text-center items-center lg:w-2/4 px-4 text-white">
                    <h2 className="text-6xl md:text-8xl lg:text-9xl leading-tight mb-4 uppercase font-popfun">
                        Contact us
                    </h2>
                    <p className="text-base md:text-lg max-w-xl">
                        An interactive group game in which we test your knowledge and culture
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Banner;
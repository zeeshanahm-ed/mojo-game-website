'use client';

import Image from 'next/image';
import Wrapper from '../common/Wrapper';
import AboutMojoImage from '../../../assets/images/about-mojo-image.png';

export default function AboutMojoSection() {
    return (
        <section className="relative w-full bg-white py-20 overflow-hidden">
            <div className="relative z-10 w-full">
                <div className="skew-y-[-1deg] bg-[#F7F623] w-full px-4 md:px-10 py-16 overflow-hidden">
                    <Wrapper>
                        <div className="relative skew-y-[1deg] w-full">
                            {/* Left Text */}
                            <div className=" flex items-center justify-between flex-col sm:flex-row">
                                <div className='text-center sm:text-left'>
                                    <h2 className="text-6xl md:text-7xl lg:text-8xl font-popfun text-black mb-4">
                                        ABOUT MOJO
                                    </h2>
                                    <p className="max-w-full sm:max-w-xs md:max-w-md lg:max-w-xl text-sm md:text-base text-black leading-6 ">
                                        Lorem ipsum dolor sit amet consectetur. Magna convallis magna
                                        pretium morbi at ut ut adipiscing. Posuere iaculis iaculis etiam
                                        ultrices lectus. Morbi in at blandit potenti vulputate
                                        scelerisque metus imperdiet purus. Lacus mauris pharetra gravida.
                                    </p>
                                </div>

                                <div className="w-[240px] lg:w-[350px] relative top-[75px]">
                                    <Image
                                        src={AboutMojoImage}
                                        alt="About Mojo"
                                        className="w-full object-cover h-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </Wrapper>
                </div>
            </div>
        </section>
    );
}

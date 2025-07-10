'use client';

import Image from 'next/image';
import BrainImage from '../../../assets/images/brain-image.png';
import QuestionImage from '../../../assets/images/question-image.png';

export default function AboutMojoSection() {
    return (
        <section className="relative w-full bg-white py-20 overflow-hidden">
            <div className="relative z-10 w-full">
                <div className="skew-y-[-1deg] bg-[#F7F623] w-full px-10 lg:py-0 pt-16 overflow-hidden">
                    <div className="skew-y-[1deg] flex flex-col lg:flex-row items-center w-full justify-between gap-10">
                        {/* Left Text */}
                        <div className="max-w-xl text-center md:text-left">
                            <h2 className="lg:text-8xl text-6xl font-popfun text-black mb-4">
                                ABOUT MOJO
                            </h2>
                            <p className="text-lg text-black leading-6 ">
                                Lorem ipsum dolor sit amet consectetur. Magna convallis magna
                                pretium morbi at ut ut adipiscing. Posuere iaculis iaculis etiam
                                ultrices lectus. Morbi in at blandit potenti vulputate
                                scelerisque metus imperdiet purus. Lacus mauris pharetra gravida.
                            </p>
                        </div>

                        {/* Right Image */}
                        <div className="relative h-[250px] lg:h-[400px] w-full flex items-center justify-center">
                            <div className="relative w-full h-full -mb-5">
                                {/* Question Image */}
                                <Image
                                    src={QuestionImage}
                                    alt="Question Icon"
                                    className="absolute w-[280px] -top-10 lg:w-[350px] lg:top-8 left-[22%] lg:left-[18%] z-10"
                                />
                                {/* Brain Image */}
                                <Image
                                    src={BrainImage}
                                    alt="Brain"
                                    className="absolute w-[250px] lg:w-[350px] bottom-0 left-[35%] z-30"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

"use client"
import React from 'react'

import Wrapper from '@/app/components/ui/common/Wrapper';
import Banner from './components/Banner';

//icons
import CrownIcon from "@/app/assets/icons/crown-icon.svg";
import { MdOutlineInfo } from "react-icons/md";
import Button from '../components/ui/common/Button';



function Subscription() {

    return (
        <section>
            <Banner />
            <Wrapper>
                <div className='flex items-center justify-center flex-col h-auto py-10 pb-20 px-4 md:px-10'>
                    <div className="font-secondary">
                        <div className="flex justify-start mb-4">
                            <CrownIcon className="md:w-16 md:h-16 w-10 h-10" />
                        </div>

                        <h2 className="text-4xl md:text-6xl font-primary">
                            ENJOY UNLIMITED{" "}
                            <span className="text-light-gray">CATEGORIES AND QUESTIONS</span>
                        </h2>

                        <p className="text-light-gray mt-3 text-sm md:text-base">
                            Lorem ipsum dolor sit amet consectetur. Nisi scelerisque vitae viverrami. Elit dictum sollicitudin massa eget egestas sed.
                        </p>

                        {/* Features */}
                        <ul className="mt-6 text-sm sm:text-base md:text-lg space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <span className="text-black mr-3">●</span>
                                Play as many games as you want, anytime.
                            </li>
                            <li className="flex items-start">
                                <span className="text-black mr-3">●</span>
                                Unlock premium-level questions not available in the free version.
                            </li>
                            <li className="flex items-start">
                                <span className="text-black mr-3">●</span>
                                Auto-renewal keeps quizzes going nonstop.
                            </li>
                            <li className="flex items-start">
                                <span className="text-black mr-3">●</span>
                                Be the first to try new features and updates.
                            </li>
                        </ul>

                        {/* Pricing */}
                        <div className="mt-8 border-t pt-6 flex justify-between items-center">
                            <p className="text-4xl md:text-5xl font-primary">
                                10 RIVALS <span className="text-light-gray text-2xl md:text-3xl">/ MONTHLY</span>
                            </p>

                            {/* Buy Now Button */}
                            <Button boxShadow={false} className="!skew-x-0 text-3xl md:text-4xl w-36" bgClass='bg-dark-orange'>
                                BUY NOW
                            </Button>
                        </div>

                        {/* Footer note */}
                        <div className="mt-6 flex items-center text-light-gray ">
                            <MdOutlineInfo className='w-10 h-10 sm:w-6 sm:h-6' />
                            <span className='ml-4 text-sm sm:text-base'>
                                Lorem ipsum dolor sit amet consectetur. Nisi scelerisque vitae viverrami. Elit
                            </span>

                        </div>
                    </div>
                </div>
            </Wrapper>
        </section >
    )
}

export default Subscription;
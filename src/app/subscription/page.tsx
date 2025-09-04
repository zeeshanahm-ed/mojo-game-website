"use client"
import React from 'react'

import Wrapper from '@/app/components/ui/common/Wrapper';
import Banner from './components/Banner';
import Button from '../components/ui/common/Button';
import PaymentOptionModal from '../components/modals/payment-options-modal';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useDirection } from '../hooks/useGetDirection';

//icons
import { MdOutlineInfo } from "react-icons/md";



function Subscription() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const { t } = useTranslation();
    const direction = useDirection();

    return (
        <section>
            <Banner />
            <Wrapper>
                <div dir={direction} className='flex items-center justify-center flex-col h-auto py-10 pb-20 px-4 md:px-10'>
                    <div className={`${direction === "rtl" ? "font-arabic" : "font-secondary"}`}>
                        <div className="flex justify-start mb-4">
                            <Image src="/images/icons/crown-icon.svg" alt='crown-icon' width={100} height={100} className="md:w-16 md:h-16 w-10 h-10" />
                        </div>

                        {direction === "rtl" ?
                            <h2 className="text-4xl md:text-5xl">
                                استمتع بفئات وأسئلة غير محدودة
                            </h2> :
                            <h2 className="text-4xl md:text-6xl font-primary">
                                ENJOY UNLIMITED{" "}
                                <span className="text-light-gray">CATEGORIES AND QUESTIONS</span>
                            </h2>
                        }

                        <p className={`text-light-gray text-sm md:text-base ${direction === "rtl" ? "mt-5" : "mt-3"}`}>
                            {t("loremText")}
                        </p>

                        {/* Features */}
                        <ul className="mt-6 text-sm sm:text-base md:text-lg space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <span className="text-black mr-3">●</span>
                                {t("playAnytime")}
                            </li>
                            <li className="flex items-start">
                                <span className="text-black mr-3">●</span>
                                {t("unlockPremium")}
                            </li>
                            <li className="flex items-start">
                                <span className="text-black mr-3">●</span>
                                {t("autoRenewal")}
                            </li>
                            <li className="flex items-start">
                                <span className="text-black mr-3">●</span>
                                {t("earlyAccess")}
                            </li>
                        </ul>

                        {/* Pricing */}
                        <div className="mt-8 border-t pt-6 flex justify-between items-center">
                            <p className={` uppercase ${direction === "rtl" ? "font-arabic text-3xl md:text-4xl" : "font-primary text-4xl md:text-5xl"}`}>
                                {t("price", { count: 10 })} <span className="text-light-gray text-2xl md:text-3xl">/ {t("monthly")}</span>
                            </p>

                            {/* Buy Now Button */}
                            <Button onClick={() => setIsModalOpen(true)} boxShadow={false} className="!skew-x-0 text-3xl md:text-4xl w-fit px-5" bgClass='bg-dark-orange'>
                                {t("buyNow")}
                            </Button>
                        </div>

                        {/* Footer note */}
                        <div className="mt-6 flex items-center text-light-gray ">
                            <MdOutlineInfo className='w-10 h-10 sm:w-6 sm:h-6' />
                            <span className='ms-4 text-sm sm:text-base'>
                                Lorem ipsum dolor sit amet consectetur. Nisi scelerisque vitae viverrami. Elit
                            </span>

                        </div>
                    </div>
                </div>
            </Wrapper>
            <PaymentOptionModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section >
    )
}

export default Subscription;
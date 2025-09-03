import React from 'react';
import Image from 'next/image';
import Wrapper from '../common/Wrapper';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/app/hooks/useGetDirection';

const LifeLineSection: React.FC = () => {
    const { t } = useTranslation();
    const direction = useDirection();
    return (
        <section className="w-full bg-white">
            <Wrapper>
                <div className='py-10 px-4 md:px-10 flex flex-col items-center justify-center relative'>
                    <div className="relative z-10 flex flex-col items-center max-w-5xl text-center">
                        <h2 className="text-black text-6xl md:text-7xl uppercase mb-2 ">
                            {t("lifeLines")}
                        </h2>
                        <p className={`text-black ${direction === "rtl" ? "font-arabic mt-2" : "font-secondary "} text-sm md:text-base mb-12`}>
                            {t("lifeLinesNote")}
                        </p>

                        {/* Life Line Cards Container */}
                        <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                            <div className="lg:w-72 w-60 h-72 bg-white border-2 md:border-[6px] border-purple skew-custom flex flex-col items-center justify-center p-4 md:p-6 text-center gap-3">
                                <Image src="/images/call-image.png" width={100} height={100} alt={t("callFriend")} className='w-16 md:w-20 h-1/2 object-contain' />
                                <p className={`text-purple uppercase ${direction === "rtl" ? "text-2xl md:text-4xl " : "text-4xl md:text-5xl "}`}>
                                    {t("callFriend")}
                                </p>
                                <p className={`text-sm  ${direction === "rtl" ? "font-arabic" : "font-secondary "}`}>
                                    {t("callFriendNote")}
                                </p>
                            </div>

                            <div className="lg:w-72 w-60 h-72 bg-white border-2 md:border-[6px] skew-custom border-fanta flex flex-col items-center justify-center p-4 md:p-6 text-center gap-3" >
                                <Image src="/images/second-chance-image.png" width={100} height={100} alt={t("secondChance")} className='w-16 md:w-20 h-1/2 object-contain' />
                                <p className={`text-fanta ${direction === "rtl" ? "text-2xl md:text-4xl " : "text-4xl md:text-5xl "} uppercase`}>
                                    {t("secondChance")}
                                </p>
                                <p className={`text-sm ${direction === "rtl" ? "font-arabic" : "font-secondary "}`}>
                                    {t("secondChanceNote")}
                                </p>
                            </div>

                            {/* Score Steal Card */}
                            <div className="lg:w-72 w-60 h-72 bg-white border-2 md:border-[6px] skew-custom border-blue flex flex-col items-center justify-center p-4 md:p-6 text-center gap-3">
                                <Image src="/images/score-steal-image.png" width={100} height={100} alt={t("scoreSteal")} className='w-16 md:w-20 h-1/2 object-contain' />
                                <p className={`text-blue ${direction === "rtl" ? "text-2xl md:text-4xl " : "text-4xl md:text-5xl "} uppercase`}>
                                    {t("scoreSteal")}
                                </p>
                                <p className={`text-sm ${direction === "rtl" ? "font-arabic" : "font-secondary "}`}>
                                    {t("scoreStealNoteLine1")} <br />
                                    {t("scoreStealNoteLine2")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </section>
    );
};

export default LifeLineSection;
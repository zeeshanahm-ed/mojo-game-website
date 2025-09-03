import Image from 'next/image';
import Wrapper from '../common/Wrapper';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/app/hooks/useGetDirection';

export default function AboutMojoSection() {
    const { t } = useTranslation();
    const direction = useDirection();
    return (
        <section className="relative w-full bg-white py-10 overflow-hidden">
            <div className="relative w-full">
                <div className="skew-y-[-1deg] bg-[#F7F623] w-full px-4 md:px-10 py-8 overflow-hidden">
                    <Wrapper>
                        <div className="relative skew-y-[1deg] w-full">
                            {/* Left Text */}
                            <div className=" flex items-center justify-between flex-col 580px:flex-row">
                                <div className='text-center 580px:text-start' dir={direction}>
                                    <h2 className="text-6xl md:text-7xl uppercase  text-black">
                                        {t("aboutMojo")}
                                    </h2>
                                    <p className={`max-w-full 580px:max-w-xs md:max-w-md lg:max-w-xl text-sm ${direction === "rtl" ? "font-arabic mt-5" : "font-secondary "} md:text-base text-black leading-6`}>
                                        {t("aboutMojoDescription")}
                                    </p>
                                </div>

                                <div className="w-[240px] lg:w-[350px] relative top-[70px]">
                                    <Image
                                        src="/images/about-mojo-image.png"
                                        width={100}
                                        height={100}
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

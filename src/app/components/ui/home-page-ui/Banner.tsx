'use client';

import Image, { StaticImageData } from 'next/image';
import WorldImage from '../../../assets/images/world.png';
import RocketImage from '../../../assets/images/rocket.png';
import StarImage from '../../../assets/images/star.png';
import LightBulbImage from '../../../assets/images/light-bulb.png';
import BookImage from '../../../assets/images/book.png';
import PrivateGameImage from '../../../assets/images/private-game.png';
import KidsGameImage from '../../../assets/images/kids-quest.png';
import StudentGameImage from '../../../assets/images/student-quest.png';
import CreateGameImage from '../../../assets/images/create-game.png';
import RamadanGameImage from '../../../assets/images/ramadan-quest.png';
import { useTranslation } from 'react-i18next';

export default function Banner() {
    const { t } = useTranslation();
    return (
        <section className="w-full bg-red text-white px-4 md:px-10 lg:py-10 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 relative">
                <div className="lg:hidden flex left-0 -top-10 absolute items-center justify-center flex-col lg:justify-start space-x-4 mb-8 lg:mb-0 lg:w-1/4">
                    <Image src={StarImage} alt='Star' className='w-12 h-12 mr-10' />
                </div>
                <div>
                    <h1 className="text-7xl md:text-8xl lg:text-start text-center lg:text-9xl font-popfun leading-tight uppercase">
                        {t("slogan_line_1")} <br />
                        <span className="text-yellow">{t("slogan_line_2")}</span> {t("withUltimate")} {t("quizExperience")}
                    </h1>
                    <p className="text-sm md:text-base lg:text-start text-center">{t("slogan_sub")}</p>

                    <div className="mt-10 flex gap-5 flex-col md:flex-row justify-center lg:justify-start items-center">
                        <div className={`relative cursor-pointer text-black skew-custom w-[auto] h-auto md:w-[240px] md:h-[210px] md:gap-0 gap-5 py-2 md:py-4 px-6 border-[6px] border-black bg-yellow flex-row items-center justify-between md:items-start md:flex-col flex md:justify-center`}>
                            <div className='font-popfun text-6xl md:text-8xl uppercase'>{t("create")}</div>
                            <div className='font-popfun text-4xl md:text-[60px] mt-3 uppercase'> {t("aGame")}</div>
                            <Image src={CreateGameImage} alt="CREATE" className="md:absolute w-8 h-8 md:w-14 md:h-14 inline-block bottom-6 right-2" />
                        </div>
                        <div className='space-y-2 flex md:gap-0 gap-8 flex-row md:flex-col md:items-start items-baseline'>
                            <GameCard image={StudentGameImage} title={t("brand")} subtitle={t("students")} bgColor="bg-orange" />
                            <GameCard image={RamadanGameImage} title={t("brand")} subtitle={t("ramadan")} bgColor="bg-light-green" className="-ml-2" />
                        </div>
                        <div className='space-y-2 flex md:gap-0 gap-8 flex-row md:flex-col md:items-start items-baseline'>
                            <GameCard image={KidsGameImage} title={t("brand")} subtitle={t("kids_quest")} bgColor="bg-green" />
                            <GameCard image={PrivateGameImage} title={t("brand")} subtitle={t("private_game")} bgColor="bg-light-blue" className="-ml-2" />
                        </div>
                    </div>
                </div>

                {/* Right: Images */}
                <div className="relative h-full hidden lg:block">
                    <Image
                        src={WorldImage}
                        alt="World"
                        className="absolute -right-10 -top-14 w-[200px] lg:w-[300px]"
                    />
                    <Image
                        src={StarImage}
                        alt="Star"
                        className="w-[45px] h-[55px]"
                    />
                    <div className='flex mt-20'>
                        <Image
                            src={RocketImage}
                            alt="Rocket"
                            className="w-[200px] h-[200px]"
                        />
                        <Image
                            src={LightBulbImage}
                            alt="Rocket"
                            width={180}
                            height={180}
                            className="w-[180px] h-[180px] self-end"
                        />
                    </div>
                    <Image
                        src={BookImage}
                        alt="Book"
                        className="absolute right-[10%] lg:right-[20%] bottom-[5%] w-[120px] lg:w-[220px]"
                    />
                </div>
            </div>
        </section>
    );
}

interface GameCardProps {
    image: StaticImageData;
    bgColor: string;
    title: string;
    subtitle: string;
    centered?: boolean;
    onClick?: () => void;
    className?: string;
}

function GameCard({
    image,
    bgColor,
    title,
    subtitle,
    onClick,
    className
}: GameCardProps) {
    return (
        <div
            onClick={onClick}
            className={`relative cursor-pointer text-black skew-custom w-[220px] h-[100px] py-4 px-6 border-[6px] border-black ${bgColor} ${className} flex-col flex`}
        >

            <div className='font-bulletproof text-base uppercase'>{title}</div>
            <div className='font-popfun text-5xl uppercase'>
                {subtitle}
            </div>
            <Image src={image} alt={title} className="absolute w-6 h-6 inline-block mt-auto top-2 right-2" />
        </div>
    );
}
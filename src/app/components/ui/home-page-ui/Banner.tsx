'use client';
import { useTranslation } from 'react-i18next';
import Wrapper from '../common/Wrapper';
import { useRouter } from 'next/navigation';

import Image, { StaticImageData } from 'next/image';
import WorldImage from '../../../assets/images/world.png';
import RocketImage from '../../../assets/images/rocket.png';
import StarImage from '../../../assets/images/star.png';
import LightBulbImage from '../../../assets/images/light-bulb.png';
// import BookImage from '../../../assets/images/book.png';
import PrivateGameImage from '../../../assets/images/private-game.png';
import KidsGameImage from '../../../assets/images/kids-quest.png';
import StudentGameImage from '../../../assets/images/student-quest.png';
import CreateGameImage from '../../../assets/images/create-game.png';
import RamadanGameImage from '../../../assets/images/ramadan-quest.png';

export default function Banner() {
    const { t } = useTranslation();
    const router = useRouter()

    const handleGoTo = (type: string) => {
        switch (type) {
            case "students":
                router.push("/students")
                break;
            case "private":
                router.push("/private-game")
                break;

            default:
                break;
        }
    }

    return (
        <section className="w-full bg-red text-white px-4 md:px-10 py-10">
            <Wrapper>
                <div className='relative h-[27.5rem] md:h-[37rem] lg:h-[44rem]'>
                    <div className="hidden sm:block 2xl:right-0 -right-[4%] md:-right-[40px] top-3 md:top-5 absolute md:w-[150px] md:h-[220px] w-[100px] h-[150px]">
                        <Image
                            src={WorldImage}
                            alt="World"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="xsm:left-64 left-52 sm:left-[50%] md:left-[60%] top-3 md:top-5 relative md:w-12 md:h-12 w-8 h-8">
                        <Image src={StarImage} alt='Star' className='w-full h-full object-contain' />
                    </div>
                    <h1 className="xsm:text-6xl text-5xl -mt-8 md:text-8xl text-start lg:text-9xl font-popfun leading-tight uppercase">
                        {t("slogan_line_1")} <br />
                        <span className="text-yellow">{t("slogan_line_2")}</span> {t("withUltimate")} <br /> {t("quizExperience")}
                    </h1>
                    <p className="text-sm md:text-base text-start">{t("slogan_sub")}</p>

                    <div className="mt-10 flex space-x-3 flex-row justify-start items-center">
                        <div className={`relative cursor-pointer text-black skew-custom w-[110px]  md:w-[240px] h-[145px] md:h-[210px] md:gap-0 gap-0 py-2 md:py-4 px-2 border-[3px] md:border-[6px] border-black bg-yellow items-start flex-col flex justify-center`}>
                            <div className='font-popfun text-4xl sm:text-5xl md:text-8xl uppercase'>{t("create")}</div>
                            <div className='font-popfun text-nowrap w-full flex items-center justify-between text-2xl sm:3xl md:text-[60px] md:mt-3 uppercase'>
                                {t("aGame")}
                                <Image src={CreateGameImage} alt="CREATE" className=" ml-1 w-5 h-5 sm:w-8 sm:h-8 md:w-14 md:h-14" />
                            </div>
                        </div>
                        <div className='space-y-1 md:space-y-2 flex flex-col items-start'>
                            <GameCard type={"students"} image={StudentGameImage} title={t("brand")} subtitle={t("students")} bgColor="bg-orange" onClick={(v: string) => handleGoTo(v)} />
                            <GameCard type={"ramadan"} image={RamadanGameImage} title={t("brand")} subtitle={t("ramadan")} bgColor="bg-light-green" className="-ml-2" />
                        </div>
                        <div className='space-y-1 md:space-y-2 flex flex-col items-start'>
                            <GameCard type={"kidsQuest"} image={KidsGameImage} title={t("brand")} subtitle={t("kids_quest")} bgColor="bg-green" />
                            <GameCard type={"privateGame"} image={PrivateGameImage} title={t("brand")} subtitle={t("private_game")} bgColor="bg-light-blue" className="-ml-2" />
                        </div>
                    </div>
                    <div className="-rotate-45 w-20 h-20 md:w-44 md:h-44 left-[80%] sm:left-[60%] md:-top-[70%] md:left-[60%] -top-[370px] relative">
                        <Image
                            src={RocketImage}
                            alt="Rocket"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-20 h-20 md:w-44 md:h-44 left-[75%] sm:left-[70%] md:-top-[90%] md:left-[80%] -top-[370px] relative">
                        <Image
                            src={LightBulbImage}
                            alt="Rocket"
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </Wrapper>
            {/* Right: Images */}
            {/* <Image
                                src={WorldImage}
                                alt="World"
                                className="absolute -right-10 -top-14 w-[200px] lg:w-[300px]"
                            /> */}
            {/* <Image
                        src={BookImage}
                        alt="Book"
                        className="absolute right-[10%] lg:right-[20%] bottom-[5%] w-[120px] lg:w-[220px]"
                    /> */}
        </section>
    );
}

interface GameCardProps {
    image: StaticImageData;
    bgColor: string;
    title: string;
    subtitle: string;
    centered?: boolean;
    onClick?: (v: string) => void;
    className?: string;
    type: string;
}

function GameCard({
    image,
    bgColor,
    title,
    subtitle,
    onClick,
    type,
    className
}: GameCardProps) {
    return (
        <div
            onClick={() => onClick?.(type)}
            className={`relative cursor-pointer text-black skew-custom md:w-[220px] md:h-[100px] w-[100px] sm:w-[120px] h-[70px] py-1 px-1 md:py-4 md:px-6 md:border-[6px] border-[3px] border-black ${bgColor} ${className} flex-col flex`}
        >

            <div className='font-bulletproof text-base uppercase'>{title}</div>
            <div className='font-popfun text-2xl md:text-5xl uppercase'>
                {subtitle}
            </div>
            <Image src={image} alt={title} className="absolute md:w-6 md:h-6 w-5 h-5 inline-block mt-auto top-1 md:top-2 right-2" />
        </div>
    );
}

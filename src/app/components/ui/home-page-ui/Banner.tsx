'use client';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

import Image, { StaticImageData } from 'next/image';
import Wrapper from '../common/Wrapper';
import { useCreateGameModalStore } from '@/app/store/useCreateGameModalStore';
import CreateGameModal from '../../modals/create-game-modal';
import { useDirection } from '@/app/hooks/useGetDirection';
//icon
import WorldImage from '@/app/assets/images/world-imag.png';
import RocketImage from '@/app/assets/images/rocket.png';
import StarImage from '@/app/assets/images/star.png';
import LightBulbImage from '@/app/assets/images/light-bulb.png';
import BookImage from '@/app/assets/images/book.png';
import PrivateGameImage from '@/app/assets/images/private-game.png';
import KidsGameImage from '@/app/assets/images/kids-quest.png';
import StudentGameImage from '@/app/assets/images/student-quest.png';
import CreateGameImage from '@/app/assets/images/create-game.png';
import RamadanGameImage from '@/app/assets/images/ramadan-quest.png';

export default function Banner() {
    const { t } = useTranslation();
    const direction = useDirection();
    const router = useRouter()
    const { openModal } = useCreateGameModalStore();

    const handleGoTo = (type: string) => {
        switch (type) {
            case "students":
                router.push("/students")
                break;
            case "privateGame":
                router.push("/private-game")
                break;
            case "kidsQuest":
                router.push("/kids-quest")
                break;
            case "createAGame":
                openModal();
                break;

            default:
                break;
        }
    }

    return (
        <section dir={direction} className="w-full bg-red text-white px-4 md:px-10 py-8 md:py-10">
            <Wrapper>
                <div className='relative h-[16.5rem] xsm:h-[18.5rem] sm:h-[20rem] md:h-[30.5rem] lg:h-[31.5rem] xl:h-[33.5rem]'>
                    <div className="hidden sm:block md:-end-48 -end-36 -top-5  absolute w-[250px] h-[200px] md:w-[350px] md:h-[280px] xl:w-[400px]">
                        <Image
                            src={WorldImage}
                            alt="World"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="xsm:start-64 start-52 sm:start-[50%] md:start-[55%] -top-5 md:top-0 relative lg:w-10 lg:h-10 sm:w-8 sm:h-8 w-5 h-5">
                        <Image src={StarImage} alt='Star' className='w-full h-full object-contain' />
                    </div>
                    <h1 className="xsm:text-6xl text-5xl -mt-8 text-start md:text-8xl xl:text-[7rem]  !leading-[0.85] uppercase">
                        {t("slogan_line_1")} <br />
                        <span className="text-yellow">{t("slogan_line_2")}</span>  {t("withUltimate")} <br /> {t("quizExperience")}
                    </h1>
                    <p className="text-sm md:text-base text-start font-secondary">{t("slogan_sub")}</p>

                    <div className="mt-5 md:mt-10 flex flex-row justify-start items-center">

                        <button
                            role='button'
                            onClick={() => handleGoTo("createAGame")}
                            className={`relative cursor-pointer text-black skew-custom sm:w-40 w-28  md:w-60 lg:w-56 h-[125px] md:h-[180px] md:gap-0 gap-0 py-2 md:py-4 px-4 border-[3px] md:border-[6px] border-black bg-yellow items-start flex-col flex justify-center`}>
                            <div className=' text-4xl sm:text-5xl skew-x-3 md:text-7xl uppercase'>{t("create")}</div>
                            <div className=' text-nowrap w-full flex skew-x-3 items-center justify-between text-2xl sm:3xl md:text-[50px] -mt-2 uppercase'>
                                {t("aGame")}
                                <Image src={CreateGameImage} alt="CREATE" className=" ml-1 mb-1 w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                            </div>
                        </button>

                        <div className='space-y-1 ms-3 md:space-y-2 flex flex-col items-start'>
                            <GameCard type={"students"} image={StudentGameImage} title={t("mojo")} subtitle={t("students")} bgColor="bg-orange" onClick={(v: string) => handleGoTo(v)} />
                            <GameCard type={"ramadan"} image={RamadanGameImage} title={t("mojo")} subtitle={t("ramadan")} bgColor="bg-light-green" className="-ml-2" />
                        </div>
                        <div className='space-y-1 ms-3 md:space-y-2 flex flex-col items-start'>
                            <GameCard type={"kidsQuest"} image={KidsGameImage} title={t("mojo")} subtitle={t("kids_quest")} onClick={(v: string) => handleGoTo(v)} bgColor="bg-green" />
                            <GameCard type={"privateGame"} image={PrivateGameImage} title={t("mojo")} subtitle={t("private_game")} onClick={(v: string) => handleGoTo(v)} bgColor="bg-light-blue" className="-ml-2" />
                        </div>
                    </div>
                    <div className="-rotate-45 md:rotate-0 w-20 h-20 lg:w-44 lg:h-44 md:w-36 md:h-36 start-[80%] sm:start-[55%]  md:start-[50%] absolute bottom-[70%] sm:bottom-[60%] top-0 xsm:top-[unset] md:bottom-[45%]">
                        <Image
                            src={RocketImage}
                            alt="Rocket"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-36 md:h-36  lg:w-40 lg:h-40 start-[70%] sm:start-[70%] md:start-[70%] absolute bottom-[65%] xsm:bottom-[55%] sm:bottom-[50%] md:bottom-[40%]">
                        <Image
                            src={LightBulbImage}
                            alt="Bulb"
                            className="w-full h-full"
                        />
                    </div>
                    <div className="w-20 hidden lg:flex h-20 lg:w-40 lg:h-40 start-[75%] sm:start-[70%]  lg:start-[80%] xl:start-[70%] absolute lg:bottom-[5%]">
                        <Image
                            src={BookImage}
                            alt="Book"
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </Wrapper>
            <CreateGameModal />
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
            role='button'
            onClick={() => onClick?.(type)}
            className={`relative text-black skew-custom md:w-[220px] md:h-[85px] w-[100px] sm:w-[120px] h-[60px] py-1 px-1 md:py-3 md:px-3 md:border-[6px] border-[3px] border-black ${bgColor} ${className} ${type === "ramadan" ? "cursor-not-allowed" : "cursor-pointer"} flex-col flex`}
        >

            <div className='font-bulletproof skew-x-3  text-base uppercase'>{title}</div>
            <div className=' text-2xl skew-x-3  md:text-4xl uppercase'>
                {subtitle}
            </div>
            <Image src={image} alt={title} className="skew-x-3  absolute md:w-6 md:h-6 w-5 h-5 inline-block mt-auto top-1 md:top-2 end-2" />
        </div>
    );
}

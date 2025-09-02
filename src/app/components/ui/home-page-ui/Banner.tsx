'use client';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import Wrapper from '../common/Wrapper';
import { useCreateGameModalStore } from '@/app/store/useCreateGameModalStore';
import CreateGameModal from '../../modals/create-game-modal';
import { useDirection } from '@/app/hooks/useGetDirection';
//icon
// import PrivateGameImage from '@/app/assets/images/private-game.png';
// import KidsGameImage from '@/app/assets/images/kids-quest.png';
// import StudentGameImage from '@/app/assets/images/student-quest.png';
import CreateGameImage from '/images/create-game.png';
// import RamadanGameImage from '@/app/assets/images/ramadan-quest.png';
// import Link from 'next/link';

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
        <section dir={direction} className="w-full bg-red text-white px-4 md:px-10 py-8 md:py-8 xl:py-10 pb-0 sm:pb-8">
            <Wrapper>
                <div className='relative h-[18rem] sm:h-[18rem] xl:h-[20rem] flex flex-col justify-center'>
                    <div className="hidden 580px:block md:-end-40 -end-36 -top-5  absolute w-[250px] h-[200px] md:w-[250px] md:h-[250px]">
                        <Image
                            src="/images/world-imag.png"
                            width={100}
                            height={100}
                            alt="World"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="hidden 580px:block xsm:start-64 start-52 sm:start-[60%] md:start-[65%] lg:start-[60%] -top-2  relative sm:w-8 sm:h-8 w-5 h-5">
                        <Image src="/images/star.png" width={100} height={100} alt='Star' className='w-full h-full object-contain' />
                    </div>
                    <h1 className="text-6xl -mt-8 text-start sm:text-[4.5rem] md:text-[5.5rem] xl:text-[6.5rem]  !leading-[0.85] uppercase max-w-[20rem] sm:max-w-[25rem] md:max-w-[35rem] xl:max-w-[44rem]">
                        {t("slogan_line_1")}
                        <span className="text-yellow"> {t("slogan_line_2")}</span>  {t("withUltimate")}  {t("quizExperience")}
                    </h1>
                    <p className="text-sm md:text-base text-start font-secondary">{t("slogan_sub")}</p>

                    <div className={`mt-5 md:mt-10 flex ${direction === "rtl" ? "font-bold" : ""} flex-row justify-start items-center`}>

                        <button
                            role='button'
                            onClick={() => handleGoTo("createAGame")}
                            className={`relative cursor-pointer text-black skew-custom pt-3 px-6 border-[2px] md:border-[4px] border-black bg-yellow items-center  flex justify-center`}>
                            <div className=' text-4xl sm:text-5xl skew-x-3 md:text-6xl uppercase'>{t("create")}</div>
                            <div className='text-nowrap w-full flex skew-x-3 mt-3 ml-2 items-center justify-between text-2xl sm:3xl md:text-[40px] uppercase'>
                                {t("aGame")}
                                <Image src="/images/create-game.png" width={100} height={100} alt="CREATE" className=" ml-2 mb-1 w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                        </button>

                        {/* <div className='space-y-1 ms-3 md:space-y-2 flex flex-col items-start'>
                            <GameCard type={"students"} image={StudentGameImage} title={t("mojo")} subtitle={t("students")} bgColor="bg-orange" href='/students' />
                            <GameCard type={"ramadan"} image={RamadanGameImage} title={t("mojo")} subtitle={t("ramadan")} bgColor="bg-light-green" className="-ml-2" href='/' />
                        </div>
                        <div className='space-y-1 ms-3 md:space-y-2 flex flex-col items-start'>
                            <GameCard type={"kidsQuest"} image={KidsGameImage} title={t("mojo")} subtitle={t("kids_quest")} href='/kids-quest' bgColor="bg-green" />
                            <GameCard type={"privateGame"} image={PrivateGameImage} title={t("mojo")} subtitle={t("private_game")} href='/private-game' bgColor="bg-light-blue" className="-ml-2" />
                        </div> */}
                    </div>
                    <div className="-rotate-45 md:rotate-45 w-24 h-24 lg:w-36 lg:h-36  start-[80%] sm:start-[55%]  md:start-[50%] absolute bottom-[45%] sm:bottom-[35%]  md:bottom-[2%] lg:bottom-[20%]">
                        <Image
                            src="/images/rocket.png"
                            width={100}
                            height={100}
                            alt="Rocket"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-16 h-16 sm:w-28 sm:h-28 lg:w-32 lg:h-32 start-[55%] sm:start-[70%] md:start-[70%] absolute top-[33%] sm:top-[5%]">
                        <Image
                            src="/images/light-bulb.png"
                            width={100}
                            height={100}
                            alt="Bulb"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="w-20 flex h-20 lg:w-32 lg:h-32 start-[75%] sm:start-[70%]  lg:start-[80%] xl:start-[70%] absolute top-[65%] md:top-[55%]">
                        <Image
                            src="/images/book.png"
                            width={100}
                            height={100}
                            alt="Book"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </Wrapper>
            <CreateGameModal />
        </section>
    );
}

// interface GameCardProps {
//     image: StaticImageData;
//     bgColor: string;
//     title: string;
//     subtitle: string;
//     centered?: boolean;
//     className?: string;
//     type: string;
//     href: string;
// }

// function GameCard({
//     image,
//     bgColor,
//     title,
//     subtitle,
//     type,
//     href,
//     className
// }: GameCardProps) {
//     return (
//         <Link
//             href={href}
//             className={`relative text-black skew-custom md:w-[220px] md:h-[85px] w-[100px] sm:w-[120px] h-[60px] py-1 px-1 md:py-3 md:px-3 md:border-[6px] border-[3px] border-black ${bgColor} ${className} ${type === "ramadan" ? "cursor-not-allowed" : "cursor-pointer"} flex-col flex`}
//         >

//             <div className='font-bulletproof skew-x-3  text-base uppercase'>{title}</div>
//             <div className=' text-2xl skew-x-3  md:text-4xl uppercase'>
//                 {subtitle}
//             </div>
//             <Image src={image} alt={title} className="skew-x-3  absolute md:w-6 md:h-6 w-5 h-5 inline-block mt-auto top-1 md:top-2 end-2" />
//         </Link>
//     );
// }

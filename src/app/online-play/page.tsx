"use client"
import React, { useEffect, useState } from 'react'
import Wrapper from '@/app/components/ui/common/Wrapper';
import CategoriesSection from '@/app/components/ui/common/CategoriesSection';
import ChooseMode from './components/ChooseMode';
import JoinRoom from './components/JoinRoom';
import Image from 'next/image';
import Banner from './components/Banner';
import Button from '@/app/components/ui/common/Button';
import UserChallengModal from '../components/modals/user-challenging-modal';
import Timer from './components/Timer';
//HOOKS & UTILS
import { useGameSession } from '../store/gameSession';
import { useRouter } from 'next/navigation';
import { GamesCategoryInterface } from '../utils/Interfaces';
import { useTranslation } from 'react-i18next';
import { getLanguage } from '../helpers/helpers-functions';
import useGetAllCategories from '../game-play/core/hooks/useGetAllCategories';
import { useDirection } from '../hooks/useGetDirection';

type GameMode = 'friendly' | 'challenge' | null;
type WhoCanAnswer = 'bothTeams' | 'oneTeamPerTurn' | null;
const WhoCanAnswerType = [
    {
        id: 'bothTeams',
        title: 'bothTeams'
    },
    {
        id: 'oneTeamPerTurn',
        title: 'oneTeamPerTurn'
    }
];

function OnlinePlay() {
    const { t } = useTranslation();
    const setSession = useGameSession(state => state.setSession);
    const router = useRouter();
    const [roomCode] = useState('0540CV98VZ120I');
    const [selectedMode, setSelectedMode] = useState<GameMode>("friendly");
    const [selectedWhoCanAnswer, setSelectedWhoCanAnswer] = useState<WhoCanAnswer>("bothTeams");
    const [isSearching] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<GamesCategoryInterface[]>([]);
    const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const direction = useDirection();
    const [params, setParams] = useState<{ [key: string]: string }>({
        lang: "",
    });
    const { categoriesData, isLoading } = useGetAllCategories(params);



    useEffect(() => {
        const lang = getLanguage();
        setParams({
            lang: lang,
        });
    }, [direction]);

    // handle turn switching
    const handleTurnSwitch = () => {
        setCurrentPlayer(prev => (prev === 1 ? 2 : 1));
    };


    // const handleSearchPlayers = () => {
    //     setIsSearching(true);
    //     // Simulate a search operation
    //     setTimeout(() => {
    //         setIsSearching(false);
    //         console.log("Search complete!");
    //     }, 3000);
    // };


    const handleModeSelect = (mode: GameMode) => {
        setSelectedMode(mode);
    };
    const handleWhoCanAnswerSelect = (whoCanAnswer: WhoCanAnswer) => {
        setSelectedWhoCanAnswer(whoCanAnswer);
    };


    const handleStartGame = () => {
        const session = {
            gameName: 'My Quiz',
            gameData: null,
            mode: "online",
            team1: {
                name: "Zeeshan",
                players: 1,
                score: 0,
                teamTurnOn: true,
                lifelines: {
                    scoreSteal: true,
                    secondChance: true,
                    callAFriend: true,
                },
            },
            team2: {
                name: "Adil Khan",
                players: 1,
                score: 0,
                teamTurnOn: false,
                lifelines: {
                    scoreSteal: true,
                    secondChance: true,
                    callAFriend: true,
                },
            },
        };

        setSession(session);
        router.push("/game-play");
    };

    return (
        <section>
            <Banner />
            <ChooseMode selectedMode={selectedMode} handleModeSelect={handleModeSelect} />
            <Wrapper>
                <div className='flex items-center justify-center flex-col h-auto w-full px-4 md:px-10 pb-16'>
                    <div className=" text-center flex-col items-center justify-center w-full">
                        {selectedMode === "friendly" ?
                            <JoinRoom
                                roomCode={roomCode}
                            />
                            :
                            <Button className={`w-64 md:w-80  ${direction === "rtl" ? "text-xl md:text-2xl" : " text-3xl sm:text-4xl md:text-[2.5rem] "}`} onClick={() => setIsModalOpen(true)}>
                                {t("joinChallenge")}
                            </Button>
                        }
                        <div className={`${direction === "rtl" ? "font-arabic" : "font-secondary"} flex mt-20 flex-col sm:flex-row items-center justify-evenly w-full space-y-14 sm:space-y-0`}>
                            <div className="flex flex-col items-center text-center">
                                <div className="skew-custom md:w-40 md:h-40 w-36 h-36 overflow-hidden border-4 border-black flex items-center justify-center mb-4">
                                    <Image
                                        src="/images/fallback-profile-image.jpg"
                                        alt="User Profile"
                                        width={100}
                                        height={100}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-black text-xl font-semibold tracking-wider">Hamza Iqbal</h3>
                                <p className="text-gray-600 text-base">hamzaiqbal965@gmail.com</p>
                            </div>

                            {/* VS Icon */}
                            <div className="relative w-16 md:w-20 h-1/2 flex items-center justify-center">
                                <Image src="/images/vs.png" alt='vs' className='w-full h-full' width={100} height={100} />
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="skew-custom md:w-40 md:h-40 w-36 h-36 overflow-hidden border-4 border-black flex items-center justify-center mb-4">
                                    {isSearching ? (
                                        <span className="loading loading-spinner loading-lg text-gray-400"></span>
                                    ) : (
                                        <span className="text-gray-400 text-6xl">?</span>
                                    )}
                                </div>
                                <h3 className="text-black text-xl font-semibold">{t("searching")}</h3>
                                <p className="text-gray-600 text-base ">{t("searchingNote")}</p>
                            </div>
                        </div>
                        <Button boxShadow={false} className={`text-white w-64 md:w-80 my-16 ${direction === "rtl" ? "text-xl md:text-2xl" : "text-4xl"}`} bgClass="bg-black">{t("searchPlayers")}</Button>
                        <CategoriesSection
                            data={categoriesData || []}
                            selectedCategories={selectedCategories}
                            suggestCategoryNQuestions={true}
                            setSelectedCategories={setSelectedCategories}
                            mode="online"
                            currentPlayer={currentPlayer}
                            onSelect={handleTurnSwitch}
                            isLoading={isLoading}
                        />
                        <div className='flex items-center md:flex-row flex-col gap-8  justify-between my-10'>
                            {selectedMode === "friendly" ?
                                <div className='flex-1 flex flex-col items-start'>
                                    <h2 className={` ${direction === "rtl" ? "text-3xl md:text-4xl" : "text-3xl md:text-5xl"} text-center md:text-start w-full`}>{t("whoCanAnswer")}</h2>
                                    {/* Mode Selection */}
                                    <div className="flex flex-row flex-wrap items-center justify-center gap-5 mt-5 ">
                                        {WhoCanAnswerType.map((mode) => (
                                            <div
                                                key={mode.id}
                                                onClick={() => handleWhoCanAnswerSelect(mode.id as WhoCanAnswer)}
                                                className={` ${direction === "rtl" ? "py-3" : "py-2 pt-3"} px-4 flex items-center gap-2 cursor-pointer group border border-black justify-center ${selectedWhoCanAnswer === mode.id ? 'bg-yellow' : ''}`}
                                            >
                                                {/* Checkbox */}
                                                <div className={`w-6 h-6 border-2 p-1 border-black bg-white flex items-center justify-center ${direction === "rtl" ? "-mb-2" : "mb-2"}`}>
                                                    {selectedWhoCanAnswer === mode.id && (
                                                        <div className="w-full h-full bg-black"></div>
                                                    )}
                                                </div>

                                                {/* Mode Title */}
                                                <h2 className={` ${direction === "rtl" ? "text-2xl lg:text-3xl tracking-tighter" : "text-2xl md:text-3xl uppercase lg:text-4xl "} ${selectedMode === mode.id ? 'text-black' : 'text-gray-800'}`}>
                                                    {t(mode.title)}
                                                </h2>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                :
                                <Timer showTime={true} />
                            }
                            <div className=' mt-auto '>
                                <Button disabled={selectedCategories.length < 6} className={` text-white md:w-72 ${direction === "rtl" ? "text-2xl lg:text-3xl" : "md:text-4xl lg:text-6xl"} lg:w-96 w-64`} onClick={handleStartGame}>{t("createGame")}</Button>
                                {selectedMode === "challenge" &&
                                    <p className={`text-base mt-3 ${direction === "rtl" ? "font-arabic" : "font-secondary"} md:text-lg text-red text-start md:text-center`}>
                                        <strong className='ms-5 text-black'>{t("note")} </strong> {t("creditInfo")}
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>

            <UserChallengModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section >
    )
}

export default OnlinePlay;
"use client"
import React, { useRef, useState } from 'react'
import Wrapper from '@/app/components/ui/common/Wrapper';
import CategoriesSection from '@/app/components/ui/common/CategoriesSection';
import ChooseMode from './components/ChooseMode';
import JoinRoom from './components/JoinRoom';
import Image from 'next/image';
import Banner from './components/Banner';
import Button from '@/app/components/ui/common/Button';
import { categories } from '../constants/constant';
import { GamesCategoryInterface } from '../utils/Interfaces';
import { useTranslation } from 'react-i18next';

//icons
import VSIcon from '@/app/assets/images/vs.png';
import FallBackProfileImage from '@/app/assets/images/fallback-profile-image.jpg';
import UserChallengModal from '../components/modals/user-challenging-modal';
import Timer from './components/Timer';
import { useGameSession } from '../store/gameSession';
import { useRouter } from 'next/navigation';

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
    const [roomName, setRoomName] = useState('');
    const [isEditingRoomName, setIsEditingRoomName] = useState(false);
    const [roomCode] = useState('0540CV98VZ120I');
    const [selectedMode, setSelectedMode] = useState<GameMode>("friendly");
    const [selectedWhoCanAnswer, setSelectedWhoCanAnswer] = useState<WhoCanAnswer>("bothTeams");
    const [isSearching] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<GamesCategoryInterface[]>([]);
    const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const roomNameInputRef = useRef<HTMLInputElement>(null);


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

    // Function to handle editing room name
    const handleEditRoomName = () => {
        setIsEditingRoomName(true);
        setTimeout(() => {
            roomNameInputRef.current?.focus();
        }, 0);
    };

    // Function to save room name after editing
    const handleSaveRoomName = () => {
        setIsEditingRoomName(false);
    };

    const handleStartGame = () => {
        const session = {
            gameName: roomName || 'My Quiz',
            mode: "online",
            selectedCategories: selectedCategories.map(c => c.name),
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
                                isEditingRoomName={isEditingRoomName}
                                roomName={roomName}
                                setRoomName={setRoomName}
                                handleSaveRoomName={handleSaveRoomName}
                                handleEditRoomName={handleEditRoomName}
                                roomCode={roomCode}
                                roomNameInputRef={roomNameInputRef}
                            />
                            :
                            <Button className='w-64 md:w-80 text-3xl sm:text-4xl md:text-5xl' onClick={() => setIsModalOpen(true)}>
                                {t("joinChallenge")}
                            </Button>
                        }
                        <div className="font-secondary flex mt-20 flex-col sm:flex-row items-center justify-evenly w-full space-y-14 sm:space-y-0">
                            <div className="flex flex-col items-center text-center">
                                <div className="skew-custom md:w-40 md:h-40 w-36 h-36 overflow-hidden border-4 border-black flex items-center justify-center mb-4">
                                    <Image
                                        src={(typeof FallBackProfileImage === 'string' ? FallBackProfileImage : FallBackProfileImage.src)}
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
                            <div className="relative sm:16 md:w-20 h-1/2 flex items-center justify-center">
                                <Image src={VSIcon} alt='vs' className='w-full h-full' />
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
                        <Button boxShadow={false} className='text-white w-64 md:w-80 my-16 text-4xl' bgClass="bg-black">{t("searchPlayers")}</Button>
                        <CategoriesSection
                            data={categories}
                            selectedCategories={selectedCategories}
                            suggestCategoryNQuestions={true}
                            setSelectedCategories={setSelectedCategories}
                            mode="online"
                            currentPlayer={currentPlayer}
                            onSelect={handleTurnSwitch}
                        />
                        <div className='flex items-center md:flex-row flex-col gap-8  justify-between my-10'>
                            {selectedMode === "friendly" ?
                                <div className='flex-1 flex flex-col items-start'>
                                    <h2 className="text-3xl md:text-5xl ">{t("whoCanAnswer")}</h2>
                                    {/* Mode Selection */}
                                    <div className="flex flex-row items-center justify-center gap-5 sm:gap-8 md:gap-16 mt-5 ">
                                        {WhoCanAnswerType.map((mode) => (
                                            <div
                                                key={mode.id}
                                                onClick={() => handleWhoCanAnswerSelect(mode.id as WhoCanAnswer)}
                                                className={`px-4 py-2 pt-3 flex items-center gap-2 cursor-pointer group border border-black justify-center ${selectedWhoCanAnswer === mode.id ? 'bg-yellow' : ''}`}
                                            >
                                                {/* Checkbox */}
                                                <div className={`w-6 h-6 border-2 p-1 border-black bg-white flex items-center justify-center mb-2`}>
                                                    {selectedWhoCanAnswer === mode.id && (
                                                        <div className="w-full h-full bg-black"></div>
                                                    )}
                                                </div>

                                                {/* Mode Title */}
                                                <h2 className={` text-2xl md:text-3xl uppercase lg:text-4xl ${selectedMode === mode.id ? 'text-black' : 'text-gray-800'}`}>
                                                    {t(mode.title)}
                                                </h2>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                :
                                <Timer showTime={true} />
                            }
                            <div>
                                <Button disabled={selectedCategories.length < 6} className=' text-white md:w-72 md:text-4xl lg:w-[450px] w-64 text-3xl lg:text-6xl' onClick={handleStartGame}>{t("startPlaying")}</Button>
                                {selectedMode === "challenge" &&
                                    <p className="text-base mt-3 font-secondary md:text-lg text-red text-start md:text-center">
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
"use client"
import React, { useEffect, useRef, useState } from 'react'
import Wrapper from '@/app/components/ui/common/Wrapper';
import CategoriesSection from '@/app/components/ui/common/CategoriesSection';
import ChooseMode from './components/ChooseMode';
import JoinRoom from './components/JoinRoom';
import Image from 'next/image';
import Timer from './components/Timer';
import Banner from './components/Banner';
import Button from '@/app/components/ui/common/Button';
import { categories } from '../constants/constant';
import { GamesCategoryInterface } from '../utils/Interfaces';
import { useTranslation } from 'react-i18next';

//icons
import VSIcon from '@/app/assets/images/vs.png';
import FallBackProfileImage from '@/app/assets/images/fallback-profile-image.jpg';

type GameMode = 'friendly' | 'challenge' | null;

function OnlinePlay() {
    const { t } = useTranslation();
    const [roomName, setRoomName] = useState('');
    const [isEditingRoomName, setIsEditingRoomName] = useState(false);
    const [roomCode] = useState('0540CV98VZ120I');
    const [selectedMode, setSelectedMode] = useState<GameMode>("friendly");
    const [isSearching] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<GamesCategoryInterface[]>([]);
    const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);

    const [timer, setTimer] = useState(20);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const roomNameInputRef = useRef<HTMLInputElement>(null);


    // handle turn switching
    const handleTurnSwitch = () => {
        setCurrentPlayer(prev => (prev === 1 ? 2 : 1));
    };

    useEffect(() => {
        if (timer === 0) {
            setTimer(0)
        } else {
            timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [timer]);


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
        console.log('Room Name updated to:', roomName);
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
                            <Timer timer={timer} />
                        }
                        <div className="font-secondary flex mt-20 flex-col sm:flex-row items-center justify-evenly w-full space-y-14 sm:space-y-0">
                            <div className="flex flex-col items-center text-center">
                                <div className="skew-custom md:w-48 md:h-48 w-36 h-36 overflow-hidden border-4 border-black flex items-center justify-center mb-4">
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
                                <div className="skew-custom md:w-48 md:h-48 w-36 h-36 overflow-hidden border-4 border-black flex items-center justify-center mb-4">
                                    {isSearching ? (
                                        <span className="loading loading-spinner loading-lg text-gray-400"></span>
                                    ) : (
                                        <span className="text-gray-400 text-6xl">?</span>
                                    )}
                                </div>
                                <h3 className="text-black text-xl font-semibold">Searching</h3>
                                <p className="text-gray-600 text-base ">it may take few seconds</p>
                            </div>
                        </div>
                        <Button boxShadow={false} className='text-white w-64 md:w-80 my-16 text-4xl' bgClass="bg-black">{t("searchPlayers")}</Button>
                        <CategoriesSection
                            data={categories}
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                            mode="online"
                            currentPlayer={currentPlayer}
                            onSelect={handleTurnSwitch}
                        />
                        <Button disabled className='text-white md:w-72 w-52 sm:w-64 my-16 text-4xl md:text-5xl'>{t("startPlaying")}</Button>
                        {selectedMode === "challenge" &&
                            <p className="text-base font-secondary md:text-lg text-red text-start md:text-center">
                                <strong className='ms-5 text-black'>{t("note")} </strong> {t("creditInfo")}
                            </p>}
                    </div>
                </div>
            </Wrapper>
        </section >
    )
}

export default OnlinePlay;
"use client"
import React, { useState } from 'react'
import Banner from './components/Banner'
import Wrapper from '@/app/components/ui/common/Wrapper';
import Input from '@/app/components/ui/common/Input';
import CategoriesSection from '@/app/components/ui/common/CategoriesSection';
import Image from 'next/image';
import Button from '@/app/components/ui/common/Button';
import { useRouter } from 'next/navigation';
import { categories } from '@/app/constants/constant';
import { GamesCategoryInterface } from '../utils/Interfaces';
import { useGameSession } from '../store/gameSession';

//icons
import PlusIcon from '@/app/assets/icons/plus.svg';
import MinusIcon from '@/app/assets/icons/minus.svg';
import VSIcon from '@/app/assets/images/vs.png';


interface TeamState {
    first: { name: string; players: number };
    second: { name: string; players: number };
}

function OfflineMode() {
    const setSession = useGameSession(state => state.setSession);
    const [selectedCategories, setSelectedCategories] = useState<GamesCategoryInterface[]>([]);
    const [gameName, setGameName] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);
    const router = useRouter();

    const [teams, setTeams] = useState<TeamState>({
        first: { name: '', players: 1 },
        second: { name: '', players: 1 },
    });

    const handlePlayerChange = (team: 'first' | 'second', type: 'plus' | 'minus') => {
        setTeams((prev) => {
            const currentPlayers = prev[team].players;
            const newPlayers =
                type === 'plus' ? currentPlayers + 1 : Math.max(1, currentPlayers - 1);

            return {
                ...prev,
                [team]: {
                    ...prev[team],
                    players: newPlayers,
                },
            };
        });
    };

    const handleTeamNameChange = (team: 'first' | 'second', name: string) => {
        setTeams((prev) => ({
            ...prev,
            [team]: {
                ...prev[team],
                name,
            },
        }));
        setErrors(null);
    };


    const handleGameName = (value: string) => {
        setGameName(value);
        setErrors(null);
    };

    const handleStartGame = () => {
        if (gameName.trim() === "") {
            setErrors({ ...errors, gameName: "Game name cannot be empty" });
            return;
        }
        if (teams.first.name.trim() === "") {
            setErrors({ ...errors, firstTeam: "Team name cannot be empty" });
            return;
        }
        if (teams.second.name.trim() === "") {
            setErrors({ ...errors, secondTeam: "Team name cannot be empty" });
            return;
        }
        const session = {
            gameName: gameName || 'My Quiz',
            mode: "offline",
            selectedCategories: selectedCategories.map(c => c.name),
            team1: {
                name: teams.first.name,
                players: teams.first.players,
                score: 0,
                lifelines: {
                    theHole: true,
                    answerToAnswer: true,
                    callAFriend: true,
                },
            },
            team2: {
                name: teams.second.name,
                players: teams.second.players,
                score: 0,
                lifelines: {
                    theHole: true,
                    answerToAnswer: true,
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
            <Wrapper>
                <div className='flex items-center justify-center flex-col h-auto px-4 md:px-10'>
                    <CategoriesSection
                        data={categories}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        mode="offline"
                    />
                    <div className="text-center flex flex-col items-center justify-center mt-10">
                        <h2 className="md:text-6xl text-5xl font-popfun text-black mb-2 uppercase">
                            Specify team information
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg leading-6 text-black max-w-2xl">
                            An interactive group game in which we test your knowledge and culture
                        </p>
                        <div className='w-full flex flex-col items-center'>
                            <Input
                                type="text"
                                placeholder="Type a Game Name"
                                value={gameName}
                                className='mt-10 md:w-1/2 w-full'
                                inputClassName='text-center pl-0'
                                onChange={(e): void => handleGameName(e.target.value)}
                            />
                            <p className="text-sm sm:text-base mt-1 text-red">{errors?.gameName}</p>
                        </div>
                        <div className="py-10 flex flex-col md:flex-row items-center justify-center space-y-20 md:space-y-0 md:space-x-12 lg:space-x-20 w-full">
                            {/* First Team Card */}
                            <div className="w-72 -skew-x-3 md:-skew-x-6 bg-red border-4 border-black flex flex-col items-center py-6 pb-4">
                                <h3 className="text-white text-5xl uppercase mb-4 font-popfun">
                                    First Team
                                </h3>
                                <div className="w-full bg-white border-y-2 border-black p-2 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Your Team Name"
                                        className="input w-full text-lg bg-white border-none focus:outline-none"
                                        value={teams.first.name}
                                        onChange={(e) => handleTeamNameChange("first", e.target.value)}
                                    />
                                    <p className="text-sm sm:text-base mt-1 text-red">{errors?.firstTeam}</p>
                                </div>
                                {/* Player Count Controls */}
                                <div className="flex items-center justify-center w-full space-x-2 px-6">
                                    <CustomButton
                                        handleClick={handlePlayerChange}
                                        ariaLabel="Add player to first team"
                                        icon={<PlusIcon />}
                                        type="plus"
                                        team="first"
                                    />
                                    <span className="text-white text-lg flex-grow text-center">
                                        {teams.first.players} players
                                    </span>
                                    <CustomButton
                                        handleClick={handlePlayerChange}
                                        ariaLabel="Remove player from first team"
                                        icon={<MinusIcon />}
                                        type="minus"
                                        team="first"
                                    />
                                </div>
                            </div>

                            <div className="relative w-24 h-24 flex items-center justify-center">
                                <Image src={VSIcon} alt='vs' className='w-28 h-36' />
                            </div>

                            {/* Second Team Card */}
                            <div className="w-72 bg-blue -skew-x-3 md:-skew-x-6 border-4 border-black flex flex-col items-center py-6 pb-4">
                                <h3 className="text-white text-5xl uppercase mb-4 font-popfun">
                                    Second team
                                </h3>
                                <div className="w-full bg-white border-y-2 border-black p-2 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Your Team Name"
                                        className="input w-full text-lg bg-white text-gray-800 border-none focus:outline-none"
                                        value={teams.second.name}
                                        onChange={(e) => handleTeamNameChange("second", e.target.value)}
                                    />
                                    <p className="text-sm sm:text-base mt-1 text-red">{errors?.secondTeam}</p>
                                </div>
                                {/* Player Count Controls */}
                                <div className="flex items-center justify-center w-full space-x-2 px-6">
                                    <CustomButton
                                        handleClick={handlePlayerChange}
                                        ariaLabel="Add player to second team"
                                        icon={<PlusIcon />}
                                        type="plus"
                                        team="second"
                                    />
                                    <span className="text-white text-lg flex-grow text-center">
                                        {teams.second.players} players
                                    </span>
                                    <CustomButton
                                        handleClick={handlePlayerChange}
                                        ariaLabel="Remove player from second team"
                                        icon={<MinusIcon />}
                                        type="minus"
                                        team="second"
                                    />
                                </div>
                            </div>
                        </div>
                        <Button className='text-white md:w-72 w-52 sm:w-64 my-16 text-4xl md:text-5xl' onClick={() => handleStartGame()}>Start playing</Button>
                    </div>
                </div>
            </Wrapper>
        </section >
    )
}

export default OfflineMode;

interface CustomButtonProps {
    handleClick: (team: 'first' | 'second', type: 'plus' | 'minus') => void;
    icon: React.ReactElement;
    ariaLabel: string;
    team: 'first' | 'second'
    type: 'plus' | 'minus'
}
const CustomButton = ({ handleClick, icon, ariaLabel, team, type }: CustomButtonProps) => {
    return (
        <button
            className="flex justify-center items-center bg-yellow text-black text-xl w-12 h-10 boxShadow-custom border-2 border-black"
            onClick={() => handleClick(team, type)}
            aria-label={ariaLabel}
        >
            {icon}
        </button>
    )
}
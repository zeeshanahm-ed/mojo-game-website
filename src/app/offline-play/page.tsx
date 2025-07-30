"use client"
import React, { useState } from 'react'
import Banner from './components/Banner'
import Wrapper from '@/app/components/ui/common/Wrapper';
import CategoriesSection from '@/app/components/ui/common/CategoriesSection';
import Button from '@/app/components/ui/common/Button';
import { useRouter } from 'next/navigation';
import { categories } from '@/app/constants/constant';
import { GamesCategoryInterface } from '../utils/Interfaces';
import { useGameSession } from '../store/gameSession';
import TeamInfo from '../components/ui/common/TeamInfo';
import { showErrorMessage } from '../utils/messageUtils';


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

    const handleValidation = () => {
        let error = null;
        if (selectedCategories.length === 0 || selectedCategories.length < 6) {
            showErrorMessage("Please select maximum 6 categories.");
            error = true;
        } else if (gameName.trim() === "") {
            setErrors({ ...errors, gameName: "Game name cannot be empty" });
            error = true;
        } else if (teams.first.name.trim() === "") {
            setErrors({ ...errors, firstTeam: "Team name cannot be empty" });
            error = true;
        } else if (teams.second.name.trim() === "") {
            setErrors({ ...errors, secondTeam: "Team name cannot be empty" });
            error = true;
        }
        return error;
    }

    const handleStartGame = () => {
        const error = handleValidation();
        if (error) return;
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
                <div className='flex items-center justify-center flex-col h-auto py-16 px-4 md:px-10'>
                    <CategoriesSection
                        data={categories}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        mode="offline"
                    />
                    <TeamInfo
                        teams={teams}
                        errors={errors}
                        gameName={gameName}
                        handleTeamNameChange={handleTeamNameChange}
                        handlePlayerChange={handlePlayerChange}
                        handleGameName={handleGameName}
                    />
                    <Button className='text-white md:w-72 w-52 sm:w-64 my-16 text-4xl md:text-5xl' onClick={() => handleStartGame()}>Start playing</Button>
                </div>
            </Wrapper>
        </section >
    )
}

export default OfflineMode;
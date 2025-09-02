"use client"
import React, { useState } from 'react'
import Banner from './components/Banner'
import Wrapper from '@/app/components/ui/common/Wrapper';
import CategoriesSection from '@/app/components/ui/common/CategoriesSection';
import Button from '@/app/components/ui/common/Button';
//HOOKS & UTILS
import { showErrorMessage } from '../utils/messageUtils';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { categories } from '@/app/constants/constant';
import { GamesCategoryInterface } from '../utils/Interfaces';
import { useGameSession } from '../store/gameSession';
import TeamInfo from '../components/ui/common/TeamInfo';


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
    const { t } = useTranslation();

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
        if (selectedCategories.length < 6) {
            showErrorMessage(t("errors.maxCategories"));
            error = true;
        } else if (gameName.trim() === "") {
            setErrors({ ...errors, gameName: t("errors.gameNameRequired") });
            error = true;
        } else if (teams.first.name.trim() === "") {
            setErrors({ ...errors, firstTeam: t("errors.teamNameRequired") });
            error = true;
        } else if (teams.second.name.trim() === "") {
            setErrors({ ...errors, secondTeam: t("errors.teamNameRequired") });
            error = true;
        }
        return error;
    };

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
                teamTurnOn: true,
                lifelines: {
                    scoreSteal: true,
                    secondChance: true,
                    callAFriend: true,
                },
            },
            team2: {
                name: teams.second.name,
                players: teams.second.players,
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
            <Wrapper>
                <div className='flex items-center justify-center flex-col h-auto pb-16 px-4 md:px-10'>
                    <CategoriesSection
                        data={categories}
                        suggestCategoryNQuestions={true}
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
                    <Button className='text-white md:w-80 sm:w-64 my-16 sm:text-4xl  md:text-4xl lg:w-[450px] w-64 text-3xl lg:text-5xl' onClick={() => handleStartGame()}>{t("startPlaying")}</Button>
                </div>
            </Wrapper>
        </section >
    )
}

export default OfflineMode;
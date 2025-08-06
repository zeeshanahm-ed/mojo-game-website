"use client"
import React, { useState } from 'react';
import Wrapper from '@/app/components/ui/common/Wrapper';
import Banner from './components/Banner';
import CategoriesSection from '../components/ui/common/CategoriesSection';
import { categories } from '../constants/constant';
import { GamesCategoryInterface } from '../utils/Interfaces';
import TeamInfo from '../components/ui/common/TeamInfo';
import Button from '../components/ui/common/Button';
import { useRouter } from 'next/navigation';
import { useGameSession } from '../store/gameSession';
import { showErrorMessage } from '../utils/messageUtils';
import { useTranslation } from 'react-i18next';

//icons

interface TeamState {
    first: { name: string; players: number };
    second: { name: string; players: number };
}

function KidsQuest() {
    const { setSession } = useGameSession();
    const router = useRouter();
    const { t } = useTranslation();
    const [selectedCategories, setSelectedCategories] = useState<GamesCategoryInterface[]>([]);
    const [gameName, setGameName] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);

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
            showErrorMessage(t("formErrors.maxCategories"));
            error = true;
        } else if (gameName.trim() === "") {
            setErrors({ ...errors, gameName: t("formErrors.gameNameRequired") });
            error = true;
        } else if (teams.first.name.trim() === "") {
            setErrors({ ...errors, firstTeam: t("formErrors.teamNameRequired") });
            error = true;
        } else if (teams.second.name.trim() === "") {
            setErrors({ ...errors, secondTeam: t("formErrors.teamNameRequired") });
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
                        title={true}
                        subTitle={true}
                        showInput={false}
                        data={categories.slice(0, 7)}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        mode="offline"
                        year="6-8"
                    />
                    <CategoriesSection
                        title={false}
                        subTitle={false}
                        showInput={false}
                        data={categories.slice(7, 13)}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        mode="offline"
                        year="7-10"
                    />
                    <CategoriesSection
                        title={false}
                        subTitle={false}
                        showInput={false}
                        data={categories.slice(13, 16)}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        mode="offline"
                        year="9-10"
                    />
                    <TeamInfo
                        teams={teams}
                        errors={errors}
                        gameName={gameName}
                        handleTeamNameChange={handleTeamNameChange}
                        handlePlayerChange={handlePlayerChange}
                        handleGameName={handleGameName}
                    />
                    <Button className='text-white md:w-72 w-52 sm:w-64 my-16 text-4xl md:text-5xl' onClick={handleStartGame}>{t("startPlaying")}</Button>
                </div>
            </Wrapper>
        </section>
    )
}

export default KidsQuest;

"use client"
import React, { useState } from 'react'
import Banner from './components/Banner'
import Wrapper from '@/app/components/ui/common/Wrapper';
import CategoriesSection from '@/app/components/ui/common/CategoriesSection';
import Button from '@/app/components/ui/common/Button';
import TeamInfo from '../components/ui/common/TeamInfo';
//HOOKS & UTILS
import { showErrorMessage } from '../utils/messageUtils';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { GamesCategoryInterface } from '../utils/Interfaces';
import { useGameSession } from '../store/gameSession';
import { useDirection } from '../hooks/useGetDirection';
import { getLanguage } from '../helpers/helpers-functions';
import useGetAllCategories from '../game-play/core/hooks/useGetAllCategories';


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
    const direction = useDirection();
    const lang = getLanguage();
    const { categoriesData } = useGetAllCategories(lang);

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
        let error = false;
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
                        data={categoriesData || []}
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
                    <Button className={`text-white md:w-80 sm:w-64 my-16  ${direction === "rtl" ? "py-4 text-3xl md:text-4xl" : " text-3xl sm:text-4xl md:text-4xl lg:text-5xl"}  lg:w-[450px] w-64`} onClick={() => handleStartGame()}>{t("startPlaying")}</Button>
                </div>
            </Wrapper>
        </section >
    )
}

export default OfflineMode;
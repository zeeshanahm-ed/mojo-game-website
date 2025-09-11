"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation';
//components
import Wrapper from '@/app/components/ui/common/Wrapper';
import Header from './components/Header';
import QuestionsScoreList from './components/QuestionsScoreList';
import OfflineQuestion from './components/OfflineQuestion';
import Answer from './components/Answer';
import WhoAnsweredEvent from './components/WhoAnswered';
import Congratulation from './components/Congratulation';
import OnlineQuestion from './components/OnlineQuestion';
import LifelineCard from './components/LifeLinesCard';
import TeamLifelineSection from './components/TeamLifelineSection';
import FallbackLoader from '../components/ui/common/FallbackLoader';
import GameExitModal from '../components/modals/game-exit-modal';
//Hooks and Constants and utils
import { offlineQuestionsListInterface } from '../constants/constant';
import { useGameSession } from '../store/gameSession';
import { useTranslation } from 'react-i18next';
import { gameStatus, getCurrentQuestion, getGameSessionCategories, getTurnIndex } from './core/_requests';
import { TeamLifelineDataInterface } from '../utils/Interfaces';



type Lifeline = 'scoreSteal' | 'secondChance' | 'callAFriend';



interface StateTypes {
    categoriesData: any[];
    gameStatusData: any[];
    turnIndexData: any[];
    screen: string | null;
    selectedQuestion: offlineQuestionsListInterface | null;
    showModal: boolean;
    isLoading: boolean;
}


function GamePlay() {
    const { t } = useTranslation();
    const searchParams = useSearchParams();
    const mode = localStorage.getItem("currentGameMode") || "";
    const questionId = searchParams.get("questionId");
    const router = useRouter();
    const { session, setSession } = useGameSession();
    const [currentLifeline, setCurrentLifeline] = useState<TeamLifelineDataInterface | null>(null);
    const [currentLifelineType, setCurrentLifelineType] = useState("");
    const [isDesibleAnswerBtn, setIsDesibleAnswerBtn] = useState(false);

    const [state, setState] = useState<StateTypes>({
        screen: "",
        selectedQuestion: null,
        showModal: false,
        isLoading: false,
        categoriesData: [],
        gameStatusData: [],
        turnIndexData: [],
    });

    const gameId = useGameSession(state => state.session?.gameData?._id) || localStorage.getItem("currentGameId");

    useEffect(() => {
        if (questionId) {
            handleGetQuestion();
        }
    }, [questionId]);

    const handleGetQuestion = async () => {
        setState(prev => ({ ...prev, isLoading: true }))
        const questionPromise = await getCurrentQuestion(questionId || "");
        const questionData = await questionPromise.data;
        setState(prev => ({
            ...prev,
            selectedQuestion: questionData.data,
            isLoading: false,
            screen: mode === "offline" ? "offlineQuestion" : "onlineQuestion"
        }))
    };


    const handleLifelineClick = (iconType: Lifeline, currentTeamLifeline: TeamLifelineDataInterface) => {
        setCurrentLifelineType(iconType);
        setCurrentLifeline(currentTeamLifeline);
    };

    const handleScreenChange = (screen: string) => {
        setState(prev => ({ ...prev, screen: screen }))
    };

    const handleScoreClick = (question: any) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("questionId", question.questionId);

        router.push(`/game-play?${params.toString()}`);
    };

    const getScreenContent = (screen: string | null) => {
        switch (screen) {
            case "questionsList":
                return (
                    <QuestionsScoreList categoriesData={state?.categoriesData} onScoreClick={handleScoreClick} />
                );
            case "offlineQuestion":
                return (
                    <OfflineQuestion
                        question={state.selectedQuestion}
                        handleScreenChange={handleScreenChange}
                        setCurrentLifelineType={setCurrentLifelineType}
                        isDesibleAnswerBtn={isDesibleAnswerBtn}
                    />
                );
            case "onlineQuestion":
                return (
                    <OnlineQuestion handleScreenChange={handleScreenChange} setCurrentLifelineType={setCurrentLifelineType} />
                );
            case "answer":
                return (
                    <Answer
                        handleScreenChange={handleScreenChange}
                        answerType={mode === "online" ? "list" : "image"}
                        mode={mode || ""}
                        question={state.selectedQuestion}
                    />
                );
            case "whoAnswered":
                return (
                    <WhoAnsweredEvent
                        setState={setState}
                        handleScreenChange={handleScreenChange}
                        question={state.selectedQuestion}
                        gameId={gameId || ""}
                    />
                );
            case "congratulation":
                return (
                    <Congratulation />
                );

            default:
                return null;
        }
    };

    const handleOpenExitModal = () => {
        setState(prev => ({ ...prev, showModal: true }))
    };

    const handleMultiplePromises = (promises: Promise<any>[], useLocalCategories: boolean, localCategories?: any) => {
        setState(prev => ({ ...prev, isLoading: true }))
        if (useLocalCategories && localCategories) {
            // If using local categories, skip the categories API call
            Promise.all(promises).then(([gameStatusData, turnIndexData]) => {
                setState(prev => ({ ...prev, categoriesData: localCategories }));
                handleSetSession({ ...gameStatusData?.data, ...turnIndexData?.data });
            }).finally(() => {
                setState(prev => ({ ...prev, isLoading: false }))
            });
        } else {
            // If not using local categories, call all APIs including categories
            Promise.all(promises).then(([categoriesData, gameStatusData, turnIndexData]) => {
                setState(prev => ({ ...prev, categoriesData: categoriesData?.data?.categories }));
                localStorage.setItem("currentGameCategoriesData", JSON.stringify(categoriesData?.data?.categories));
                handleSetSession({ ...gameStatusData?.data, ...turnIndexData?.data });
            }).finally(() => {
                setState(prev => ({ ...prev, isLoading: false }))
            });
        }
    };

    const isFirstLoad = useRef(true);

    useEffect(() => {
        const localCategoriesStr = localStorage.getItem("currentGameCategoriesData");
        const localCategories = localCategoriesStr ? JSON.parse(localCategoriesStr) : null;

        if (isFirstLoad.current) {
            const gameStatusPromise = gameStatus(gameId);
            const turnIndexPromise = getTurnIndex(gameId);

            if (localCategories) {
                handleMultiplePromises([gameStatusPromise, turnIndexPromise], true, localCategories);
            } else {
                const categoriesPromise = getGameSessionCategories(gameId);
                handleMultiplePromises([categoriesPromise, gameStatusPromise, turnIndexPromise], false);
            }
            isFirstLoad.current = false;
        } else if (state.screen === "questionsList") {
            const gameStatusPromise = gameStatus(gameId);
            const turnIndexPromise = getTurnIndex(gameId);

            if (localCategories) {
                handleMultiplePromises([gameStatusPromise, turnIndexPromise], true, localCategories);
            } else {
                const categoriesPromise = getGameSessionCategories(gameId);
                handleMultiplePromises([categoriesPromise, gameStatusPromise, turnIndexPromise], false);
            }
        }
    }, [state.screen]);

    const handleSetSession = (sessionData: any) => {
        const team1LifeLine = sessionData.lifelines.filter((lifeline: any) => lifeline.teamId === sessionData.teams[0].teamId);
        const team2LifeLine = sessionData.lifelines.filter((lifeline: any) => lifeline.teamId === sessionData.teams[1].teamId);
        const newSession = {
            gameData: { ...session?.gameData, ...sessionData },
            gameName: sessionData?.currentGame?.gameName || 'My Quiz',
            mode: mode || '',
            team1: {
                name: sessionData.teams[0].name,
                players: sessionData.teams[0].playerCount,
                score: sessionData.teams[0].scores,
                teamId: sessionData.teams[0].teamId,
                teamTurnOn: sessionData.currentTurnIndex === 0,
                lifelines: team1LifeLine,
            },
            team2: {
                name: sessionData.teams[1].name,
                players: sessionData.teams[1].playerCount,
                score: sessionData.teams[1].scores,
                teamId: sessionData.teams[1].teamId,
                teamTurnOn: sessionData.currentTurnIndex === 1,
                lifelines: team2LifeLine,
            },
        };

        setSession(newSession);
        let currentScreen = "questionsList";
        if (questionId) {
            if (mode === "offline") {
                currentScreen = "offlineQuestion";
            } else if (mode === "online") {
                currentScreen = "onlineQuestion";
            }
        }
        handleScreenChange(currentScreen);
    };

    return (
        <section className='w-full'>
            {state.isLoading && <div className='absolute backdrop-blur-lg top-0 z-50 left-0 w-full h-full flex items-center justify-center'>
                <FallbackLoader />
            </div>}
            <Header handleScreenChange={(value: string) => setState(prev => ({ ...prev, screen: value }))} handleOpenExitModal={handleOpenExitModal} setCurrentLifelineType={setCurrentLifelineType} currenScreen={state.screen} />
            <Wrapper>
                <div className='flex w-full h-auto gap-5 py-10 md:py-20 px-4 md:px-10'>
                    <div className='w-full'>
                        {getScreenContent(state.screen)}
                    </div>
                    {currentLifelineType ?
                        <div className=''>
                            <LifelineCard
                                setCurrentLifeline={setCurrentLifelineType}
                                currentLifelineType={currentLifelineType}
                                currentTeamLifelineData={currentLifeline}
                                setIsDesibleAnswerBtn={setIsDesibleAnswerBtn}
                            />
                        </div> : null}
                </div>
                <TeamLifelineSection
                    team1={{
                        name: session?.team1.name ?? t("team1"),
                        score: session?.team1.score ?? 0,
                        teamTurnOn: session?.team1.teamTurnOn ?? false,
                        lifelines: session?.team1.lifelines ?? [],
                    }}
                    team2={{
                        name: session?.team2.name ?? t("team2"),
                        score: session?.team2.score ?? 0,
                        teamTurnOn: session?.team2.teamTurnOn ?? false,
                        lifelines: session?.team2.lifelines ?? [],
                    }}
                    onLifelineClick={handleLifelineClick}
                    currentScreen={state.screen || ""}
                />
            </Wrapper>
            <GameExitModal
                open={state.showModal}
                closeModal={() => setState(prev => ({ ...prev, showModal: false }))}
            />
        </section >
    )
}

export default GamePlay;


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
import Image from 'next/image';
import FallbackLoader from '../components/ui/common/FallbackLoader';
import GameExitModal from '../components/modals/game-exit-modal';
//Hooks and Constants and utils
import { offlineQuestionsListInterface } from '../constants/constant';
import { useGameSession } from '../store/gameSession';
import { useTranslation } from 'react-i18next';
import { useDirection } from '../hooks/useGetDirection';
import { gameStatus, getCurrentQuestion, getGameSessionCategories, getTurnIndex } from './core/_requests';



type Lifeline = 'scoreSteal' | 'secondChance' | 'callAFriend';

interface LifelineData {
    title: string;
    type: Lifeline;
    description: string;
    textColor: string;
    bgColor: string;
    icon: React.ReactNode;
};

interface StateTypes {
    categoriesData: any[];
    gameStatusData: any[];
    turnIndexData: any[];
    currentLifeline: LifelineData | undefined;
    screen: string | null;
    selectedQuestion: offlineQuestionsListInterface | null;
    showModal: boolean;
    isLoading: boolean;
}


function GamePlay() {
    const { t } = useTranslation();
    const searchParams = useSearchParams();
    const mode = localStorage.getItem("currentGameMode");
    const questionId = searchParams.get("questionId");
    const direction = useDirection();
    const router = useRouter();
    const { session, setSession } = useGameSession();
    const [currentLifeline, setCurrentLifeline] = useState<LifelineData | undefined>();

    const [state, setState] = useState<StateTypes>({
        currentLifeline: undefined,
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


    const LifelinesData: LifelineData[] = [
        {
            title: "callFriend",
            type: "callAFriend",
            description: "callFriendNote",
            bgColor: "bg-[#862CF3]",
            textColor: "text-[#862CF3]",
            icon: <Image src="/images/call-image.png" alt={t("callFriend")} className='w-20 md:w-24 h-1/2 object-contain' width={100} height={100} />
            ,
        },
        {
            title: "secondChance",
            type: "secondChance",
            description: "secondChanceNote2",
            textColor: "text-[#F3682C]",
            bgColor: "bg-[#F3682C]",
            icon: <Image src="/images/second-chance-image.png" alt={t("secondChance")} className='w-20 md:w-24 h-1/2 object-contain' width={100} height={100} />

        },
        {
            title: "scoreSteal",
            type: "scoreSteal",
            description: "secondChanceNote2",
            textColor: "text-[#2CA7F3]",
            bgColor: "bg-[#2CA7F3]",
            icon: <Image src="/images/score-steal-image.png" alt={t("scoreSteal")} className='w-20 md:w-24 h-1/2 object-contain' width={100} height={100} />
        },
    ];

    // Helper function to render a lifeline icon with disabled state
    const renderLifelineIcon = (iconType: Lifeline, isEnabled: boolean | undefined, teamTurnOn: boolean | undefined) => {
        let isDisabled = false;

        if (["questionsList", "answer", "whoAnswered", "congratulation"].includes(state?.screen || "")) {
            isDisabled = true;
        } else if (!isEnabled || !teamTurnOn) {
            isDisabled = !isEnabled || !teamTurnOn;
        }

        const iconClasses = `w-5 h-5 sm:w-8 sm:h-8`;
        const circleClasses = `w-12 h-12 rounded-full border-2 border-black flex items-center justify-center ${isDisabled ? "cursor-not-allowed bg-gray-200 opacity-60" : "cursor-pointer bg-white"}`;

        let iconSvg;
        switch (iconType) {
            case 'scoreSteal':
                iconSvg = <Image src="/images/score-steal-image.png" alt='score-steal-image' width={100} height={100} className={iconClasses} />;
                break;
            case 'secondChance':
                iconSvg = <Image src="/images/second-chance-image.png" alt='second-chance-icon' width={100} height={100} className={iconClasses} />;
                break;
            case 'callAFriend':
                iconSvg = <Image src="/images/call-image.png" alt='callAFriend-icon' width={100} height={100} className={iconClasses} />;
                break;
        }

        return (
            <button disabled={isDisabled} className={circleClasses} onClick={() => handleLifelineClick(iconType)}>
                {iconSvg}
            </button>
        );
    };

    const handleLifelineClick = (iconType: Lifeline) => {
        const CurrentLiflineData = LifelinesData.find(lifeline => lifeline.type === iconType);
        setCurrentLifeline(CurrentLiflineData)
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
                        setCurrentLifeline={setCurrentLifeline}
                    />
                );
            case "onlineQuestion":
                return (
                    <OnlineQuestion handleScreenChange={handleScreenChange} setCurrentLifeline={setCurrentLifeline} />
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

    const handleYes = () => { }
    const handleNo = () => {
        setCurrentLifeline(undefined);
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
            // On first load, check if categories exist in localStorage
            const gameStatusPromise = gameStatus(gameId);
            const turnIndexPromise = getTurnIndex(gameId);

            if (localCategories) {
                // Use local categories, skip categories API
                handleMultiplePromises([gameStatusPromise, turnIndexPromise], true, localCategories);
            } else {
                // No local categories, call categories API
                const categoriesPromise = getGameSessionCategories(gameId);
                handleMultiplePromises([categoriesPromise, gameStatusPromise, turnIndexPromise], false);
            }
            isFirstLoad.current = false;
        } else if (state.screen === "questionsList") {
            // On subsequent renders, check again for local categories
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
                lifelines: {
                    scoreSteal: true,
                    secondChance: true,
                    callAFriend: true,
                },
            },
            team2: {
                name: sessionData.teams[1].name,
                players: sessionData.teams[1].playerCount,
                score: sessionData.teams[1].scores,
                teamId: sessionData.teams[1].teamId,
                teamTurnOn: sessionData.currentTurnIndex === 1,
                lifelines: {
                    scoreSteal: true,
                    secondChance: true,
                    callAFriend: true,
                },
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
            <Header handleScreenChange={(value: string) => setState(prev => ({ ...prev, screen: value }))} handleOpenExitModal={handleOpenExitModal} setCurrentLifeline={setCurrentLifeline} currenScreen={state.screen} />
            <Wrapper>
                <div className='flex w-full h-auto gap-5 py-10 md:py-20 px-4 md:px-10'>
                    <div className='w-full'>
                        {getScreenContent(state.screen)}
                    </div>
                    {currentLifeline ?
                        <div className=''>
                            <LifelineCard
                                title={currentLifeline.title}
                                description={currentLifeline.description}
                                textColor={currentLifeline.textColor}
                                bgColor={currentLifeline.bgColor}
                                icon={currentLifeline.icon}
                                onYes={() => handleYes()}
                                onNo={() => handleNo()}
                            />
                        </div> : null}
                </div>
                {(state.screen !== "whoAnswered" && state.screen !== "congratulation") ?
                    <div className=" pt-10 pb-10 md:py-20 px-4 md:px-10 lg:px-0 lg:pb-0 relative z-10 flex flex-col sm:flex-row items-center justify-between w-full gap-y-10 sm:gap-y-0 lg:gap-10">
                        {/* H1 Team Section (Red) */}
                        <div
                            className="custom-clipPath-rightSide text-white px-4 md:-skew-x-6 -skew-x-3 lg:-skew-x-0 lg:px-5 lg:h-[180px] bg-red flex items-center justify-center lg:justify-start w-[250px] md:w-[320px] lg:flex-1 lg:border-none border-4 border-black">
                            <div className='flex lg:flex-row flex-col items-center justify-center  lg:justify-between w-full lg:md:w-3/4'>
                                <div className=" lg:w-[60%]  w-full  flex flex-col items-center lg:items-start py-4 lg:py-0">
                                    <h3 className="truncate max-w-[90%] text-4xl md:text-6xl lg:text-7xl font-primary uppercase" >
                                        {session?.team1.name ?? t("team1")}
                                    </h3>
                                    <p className="text-lg md:text-3xl  uppercase !tracking-wider" >
                                        {t("score")}: {session?.team1.score?.toString() ?? "0"}
                                    </p>
                                </div>
                                <div className='lg:hidden block w-full h-[1px] bg-white'></div>
                                <div className="flex flex-col items-center lg:items-end py-4 lg:py-0">
                                    <p className={`text-base ${direction === "rtl" ? "font-arabic text-xl" : "font-secondary sm:text-xl lg:text-2xl"} mb-2`}>{t("lifeLines")}</p>
                                    <div className="flex space-x-2">
                                        {renderLifelineIcon("scoreSteal", session?.team1.lifelines.scoreSteal, session?.team1.teamTurnOn)}
                                        {renderLifelineIcon("secondChance", session?.team1.lifelines.secondChance, session?.team1.teamTurnOn)}
                                        {renderLifelineIcon("callAFriend", session?.team1.lifelines.callAFriend, session?.team1.teamTurnOn)}
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* H2 Team Section (Blue) */}
                        <div
                            className="custom-clipPath-leftSide md:-skew-x-6 -skew-x-3 lg:-skew-x-0 text-white px-4 lg:px-5 lg:h-[180px] bg-blue flex items-center justify-center lg:justify-end w-[250px] md:w-[320px] lg:flex-1 lg:border-none border-4 border-black"
                        >
                            <div className='flex lg:flex-row flex-col-reverse items-center justify-center  w-full lg:justify-between lg:md:w-3/4'>
                                <div className="flex flex-col items-center lg:items-start py-4 lg:py-0">
                                    <p className={`text-base ${direction === "rtl" ? "font-arabic text-xl" : "font-secondary sm:text-xl lg:text-2xl"}  mb-2`}>{t("lifeLines")}</p>
                                    <div className="flex space-x-2">
                                        {renderLifelineIcon("scoreSteal", session?.team2.lifelines.scoreSteal, session?.team2.teamTurnOn)}
                                        {renderLifelineIcon("secondChance", session?.team2.lifelines.secondChance, session?.team2.teamTurnOn)}
                                        {renderLifelineIcon("callAFriend", session?.team2.lifelines.callAFriend, session?.team2.teamTurnOn)}
                                    </div>
                                </div>
                                <div className='lg:hidden block w-full h-[1px] bg-white'></div>
                                <div className="lg:w-[60%] w-full flex flex-col items-center  lg:items-end py-4 lg:py-0">
                                    <h3 className="truncate max-w-[90%] text-center text-4xl md:text-6xl lg:text-7xl font-primary  uppercase" >
                                        {session?.team2.name ?? t("team2")}
                                    </h3>
                                    <p className="text-lg md:text-3xl  uppercase !tracking-wider" >
                                        {t("score")}: {session?.team2.score?.toString() ?? "0"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> : <></>}
            </Wrapper>
            <GameExitModal
                open={state.showModal}
                closeModal={() => setState(prev => ({ ...prev, showModal: false }))}
            />
        </section >
    )
}

export default GamePlay;


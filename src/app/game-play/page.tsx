"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
//components
import Wrapper from '@/app/components/ui/common/Wrapper';
import Header from './components/Header';
import QuestionsScoreList from './components/QuestionsScoreList';
import OfflineQuestion from './components/OfflineQuestion';
import Answer from './components/Answer';
import WhoAnsweredEvent from './components/WhoAnswered';
import Congratulation from './components/Congratulation';
import OnlineQuestion from './components/OnlineQuestion';
import { offlineQuestionsList, offlineQuestionsListInterface } from '../constants/constant';
import { useGameSession } from '../store/gameSession';
import CustomModal from '../components/modals/custom-modal';
import { useTranslation } from 'react-i18next';
import LifelineCard from './components/LifeLinesCard';
import Image from 'next/image';
//icons
import HoleIcon from '/images/icons/hole-icon.svg';
import SecondChanceIcon from '/images/icons/second-chance-icon.svg';
import CallAFriendIcon from '/images/icons/callAFriend-icon.svg';
import CallAFriendImage from "/images/call-image.png"
import SecondChanceImage from "/images/second-chance-image.png"
import ScoreStealImage from "/images/score-steal-image.png"


type Lifeline = 'scoreSteal' | 'secondChance' | 'callAFriend';

interface LifelineData {
    title: string;
    type: Lifeline;
    description: string;
    textColor: string;
    bgColor: string;
    icon: React.ReactNode;
}

function GamePlay() {
    const { t } = useTranslation();
    const { session } = useGameSession();
    const [showModal, setShowModal] = useState(false);
    const [screen, setScreen] = useState("questionsList");
    const [selectedQuestion, setSelectedQuestion] = useState<offlineQuestionsListInterface | null>(null);
    const router = useRouter();
    const [currentLifeline, setCurrentLifeline] = useState<LifelineData | undefined>();

    const LifelinesData: LifelineData[] = [
        {
            title: "callFriend",
            type: "callAFriend",
            description: "callFriendNote",
            bgColor: "bg-[#862CF3]",
            textColor: "text-[#862CF3]",
            icon: <Image src={CallAFriendImage} alt={t("callFriend")} className='w-20 md:w-24 h-1/2 object-contain' />
            ,
        },
        {
            title: "secondChance",
            type: "secondChance",
            description: "secondChanceNote2",
            textColor: "text-[#F3682C]",
            bgColor: "bg-[#F3682C]",
            icon: <Image src={SecondChanceImage} alt={t("secondChance")} className='w-20 md:w-24 h-1/2 object-contain' />

        },
        {
            title: "scoreSteal",
            type: "scoreSteal",
            description: "secondChanceNote2",
            textColor: "text-[#2CA7F3]",
            bgColor: "bg-[#2CA7F3]",
            icon: <Image src={ScoreStealImage} alt={t("scoreSteal")} className='w-20 md:w-24 h-1/2 object-contain' />
        },
    ];


    // Helper function to render a lifeline icon with disabled state
    const renderLifelineIcon = (
        iconType: Lifeline,
        isEnabled: boolean | undefined,
        teamTurnOn: boolean | undefined
    ) => {
        let isDisabled = false;

        if (["questionsList", "answer", "whoAnswered", "congratulation"].includes(screen)) {
            isDisabled = true;
        } else if (!isEnabled || !teamTurnOn) {
            isDisabled = !isEnabled || !teamTurnOn;
        }

        const iconClasses = `w-5 h-5 sm:w-8 sm:h-8`;
        const circleClasses = `w-12 h-12 rounded-full border-2 border-black flex items-center justify-center
    ${isDisabled ? "cursor-not-allowed bg-gray-200 opacity-60" : "cursor-pointer bg-white"}`;

        let iconSvg;
        switch (iconType) {
            case 'scoreSteal':
                iconSvg = <HoleIcon className={iconClasses} />;
                break;
            case 'secondChance':
                iconSvg = <SecondChanceIcon className={iconClasses} />;
                break;
            case 'callAFriend':
                iconSvg = <CallAFriendIcon className={iconClasses} />;
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
        setScreen(screen);
    };

    const getDifficultyByScore = (score: number): "easy" | "medium" | "hard" => {
        if (score === 200) return "easy";
        if (score === 400) return "medium";

        return "hard";
    };

    const handleScoreClick = (score: number, category: string) => {
        const difficulty = getDifficultyByScore(score);
        const categoryQuestions = offlineQuestionsList.filter(
            (q) => q.category === category && q.difficulty === difficulty && !q.used
        );

        if (categoryQuestions.length > 0) {
            const randomQuestion = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
            setSelectedQuestion(randomQuestion);
            setScreen(session?.mode === "offline" ? "offlineQuestion" : "onlineQuestion");
        } else {
            alert("No more questions available for this category and difficulty.");
        }
    };

    const getScreenContent = (screen: string) => {
        switch (screen) {
            case "questionsList":
                return (
                    <QuestionsScoreList onScoreClick={handleScoreClick} />
                );
            case "offlineQuestion":
                return (
                    <OfflineQuestion
                        question={selectedQuestion}
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
                        answerType={session?.mode === "online" ? "list" : "image"}
                        mode={session?.mode}
                        question={selectedQuestion}
                    />
                );
            case "whoAnswered":
                return (
                    <WhoAnsweredEvent
                        handleScreenChange={handleScreenChange}
                        question={selectedQuestion}
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

    const handleExitGame = () => {
        const url = "/my-games";
        router.push(url);
    };

    const handleOpenExitModal = () => {
        setShowModal(true);
    };

    const handleYes = () => { }
    const handleNo = () => {
        setCurrentLifeline(undefined);
    }

    return (
        <section className='w-full'>
            <Header handleScreenChange={(value: string) => setScreen(value)} handleOpenExitModal={handleOpenExitModal} setCurrentLifeline={setCurrentLifeline} />
            <Wrapper>
                <div className='flex w-full h-auto gap-5 py-10 md:py-20 px-4 md:px-10'>
                    <div className='w-full'>
                        {getScreenContent(screen)}
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
                {(screen !== "whoAnswered" && screen !== "congratulation") ?
                    <div className=" pt-10 pb-10 md:py-20 px-4 md:px-10 lg:px-0 lg:pb-0 relative z-10 flex flex-col sm:flex-row items-center justify-between w-full gap-y-10 sm:gap-y-0 lg:gap-10">
                        {/* H1 Team Section (Red) */}
                        <div
                            className="custom-clipPath-rightSide text-white px-4 md:-skew-x-6 -skew-x-3 lg:-skew-x-0 lg:px-5 lg:h-[200px] bg-red flex items-center justify-center lg:justify-start w-[250px] md:w-[320px] lg:flex-1 lg:border-none border-4 border-black">
                            <div className='flex lg:flex-row flex-col items-center justify-center  lg:justify-between w-full lg:md:w-3/4'>
                                <div className=" lg:w-[60%]  w-full  flex flex-col items-center lg:items-start py-4 lg:py-0">
                                    <h3 className="truncate max-w-[90%] text-4xl md:text-6xl lg:text-7xl  uppercase" >
                                        {session?.team1.name ?? t("team1")}
                                    </h3>
                                    <p className="text-lg md:text-3xl  uppercase !tracking-wider" >
                                        {t("score")}: {session?.team1.score?.toString() ?? "0"}
                                    </p>
                                </div>
                                <div className='lg:hidden block w-full h-[1px] bg-white'></div>
                                <div className="flex flex-col items-center lg:items-end py-4 lg:py-0">
                                    <p className="text-base font-secondary sm:text-xl lg:text-2xl mb-2">{t("lifeLines")}</p>
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
                            className="custom-clipPath-leftSide md:-skew-x-6 -skew-x-3 lg:-skew-x-0 text-white px-4 lg:px-5 lg:h-[200px] bg-blue flex items-center justify-center lg:justify-end w-[250px] md:w-[320px] lg:flex-1 lg:border-none border-4 border-black"
                        >
                            <div className='flex lg:flex-row flex-col-reverse items-center justify-center  w-full lg:justify-between lg:md:w-3/4'>
                                <div className="flex flex-col items-center lg:items-start py-4 lg:py-0">
                                    <p className="text-base font-secondary sm:text-xl lg:text-2xl mb-2">{t("lifeLines")}</p>
                                    <div className="flex space-x-2">
                                        {renderLifelineIcon("scoreSteal", session?.team2.lifelines.scoreSteal, session?.team2.teamTurnOn)}
                                        {renderLifelineIcon("secondChance", session?.team2.lifelines.secondChance, session?.team2.teamTurnOn)}
                                        {renderLifelineIcon("callAFriend", session?.team2.lifelines.callAFriend, session?.team2.teamTurnOn)}
                                    </div>
                                </div>
                                <div className='lg:hidden block w-full h-[1px] bg-white'></div>
                                <div className="lg:w-[60%] w-full flex flex-col items-center  lg:items-end py-4 lg:py-0">
                                    <h3 className="truncate max-w-[90%] text-center text-4xl md:text-6xl lg:text-7xl  uppercase" >
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
            <CustomModal
                title={t('exit')}
                subTitle={t("confirmExit")}
                open={showModal}
                closeModal={() => setShowModal(false)}
                onCancelButtonClick={() => setShowModal(false)}
                onConfirmButtonClick={handleExitGame}
                showButton={true}
                confirmButtonTile={t('yes')}
                cancelButtonTitle={t('no')}
            />
        </section >
    )
}

export default GamePlay;


"use client"
import React, { useState } from 'react'
//components
import Wrapper from '@/app/components/ui/common/Wrapper';
import Header from './components/Header';
import QuestionsScoreList from './components/QuestionsScoreList';
import OfflineQuestion from './components/OfflineQuestion';
import Answer from './components/Answer';
import WhoAnsweredEvent from './components/WhoAnswered';
import Congratulation from './components/Congratulation';
import OnlineQuestion from './components/OnlineQuestion';
//icons
import HoleIcon from '@/app/assets/icons/hole-icon.svg';
import SecondChanceIcon from '@/app/assets/icons/second-chance-icon.svg';
import CallAFriendIcon from '@/app/assets/icons/callAFriend-icon.svg';

function GamePlay() {

    const team1Lifelines = { eye: true, peace: false, phone: false };
    const team2Lifelines = { eye: true, peace: false, phone: false };
    const [screen, setScreen] = useState("scorecard");
    const [mode, setMode] = useState("offline");


    // Helper function to render a lifeline icon with disabled state
    const renderLifelineIcon = (iconType: 'hole' | 'chance' | 'phone', isEnabled: boolean) => {
        const iconClasses = `w-8 h-8 sm:w-10 sm:-h-10`;
        const circleClasses = `w-12 h-12 rounded-full border-2 border-black flex items-center curs justify-center ${isEnabled ? "cursor-pointer" : "cursor-not-allowed"} ${isEnabled ? 'bg-white' : 'bg-gray-200 opacity-60'}`;

        let iconSvg;
        switch (iconType) {
            case 'hole':
                iconSvg = (
                    <HoleIcon className={iconClasses} />
                );
                break;
            case 'chance':
                iconSvg = (
                    <SecondChanceIcon className={iconClasses} />
                );
                break;
            case 'phone':
                iconSvg = (
                    <CallAFriendIcon className={iconClasses} />
                );
                break;
        }

        return (
            <button className={circleClasses}>
                {iconSvg}
            </button>
        );
    };

    const handleScreenChange = (value: string) => {
        setScreen(value);
    }
    const handleModeChange = (value: string) => {
        setMode(value);
    }

    const getScreenContent = (screen: string) => {
        switch (screen) {
            case "scorecard":
                return (
                    <QuestionsScoreList onScoreClick={handleScreenChange} />
                );
            case "offlineQuestion":
                return (
                    <OfflineQuestion handleScreenChange={handleScreenChange} handleModeChange={handleModeChange} />
                );
            case "onlineQuestion":
                return (
                    <OnlineQuestion handleScreenChange={handleScreenChange} handleModeChange={handleModeChange} />
                );
            case "answer":
                return (
                    <Answer handleScreenChange={handleScreenChange} answerType={mode === "online" ? "list" : "image"} mode={mode} />
                );
            case "whoAnswered":
                return (
                    <WhoAnsweredEvent handleScreenChange={handleScreenChange} mode={mode} />
                );
            case "congratulation":
                return (
                    <Congratulation onClick={handleScreenChange} />
                );

            default:
                return null;
        }
    };

    return (
        <section className='w-full'>
            <Header onClick={(value: string) => setScreen(value)} />
            <Wrapper>
                <div className='flex justify-center flex-col h-auto py-10 md:py-20 px-4 md:px-10'>
                    {getScreenContent(screen)}
                </div>
                {(screen !== "whoAnswered" && screen !== "congratulation") ? <div className=" px-4 lg:px-0 lg:t-auto my-10 lg:my-0 md:-skew-x-6 -skew-x-3 lg:-skew-x-0  relative z-10 flex flex-col sm:flex-row items-center justify-between w-full gap-y-10 sm:gap-y-0 lg:gap-10">
                    {/* H1 Team Section (Red) */}
                    <div
                        className="custom-clipPath-rightSide text-white px-4 lg:px-5 lg:h-[200px] bg-red flex items-center justify-center lg:justify-start w-[250px] md:w-[320px] lg:flex-1 lg:border-r-[0px] lg:border-[2px] border-4 border-black">
                        <div className='flex lg:flex-row flex-col items-center justify-center  lg:justify-between w-full lg:md:w-3/4'>
                            <div className="flex flex-col items-start py-4 lg:py-0">
                                <h3 className="text-4xl md:text-6xl lg:text-7xl font-popfun uppercase" >
                                    {"Team 1"}
                                </h3>
                                <p className="text-lg md:text-3xl font-popfun uppercase !tracking-wider" >
                                    SCORE: {"200".toString().padStart(2, '0')}
                                </p>
                            </div>
                            <div className='lg:hidden block w-full h-[1px] bg-white'></div>
                            <div className="flex flex-col items-center lg:items-end py-4 lg:py-0">
                                <p className="text-base sm:text-xl lg:text-2xl mb-2">Life lines</p>
                                <div className="flex space-x-2">
                                    {renderLifelineIcon('hole', team1Lifelines.eye)}
                                    {renderLifelineIcon('chance', team1Lifelines.peace)}
                                    {renderLifelineIcon('phone', team1Lifelines.phone)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* H2 Team Section (Blue) */}
                    <div
                        className="custom-clipPath-leftSide text-white px-4 lg:px-5 lg:h-[200px] bg-blue flex items-center justify-center lg:justify-end w-[250px] md:w-[320px] lg:flex-1 lg:border-l-[0px] lg:border-[2px] border-4 border-black"
                    >
                        <div className='flex lg:flex-row flex-col-reverse items-center justify-center  w-full lg:justify-between lg:md:w-3/4'>
                            <div className="flex flex-col items-center lg:items-start py-4 lg:py-0">
                                <p className="text-base sm:text-xl lg:text-2xl mb-2">Life lines</p>
                                <div className="flex space-x-2">
                                    {renderLifelineIcon('hole', team2Lifelines.eye)}
                                    {renderLifelineIcon('chance', team2Lifelines.peace)}
                                    {renderLifelineIcon('phone', team2Lifelines.phone)}
                                </div>
                            </div>
                            <div className='lg:hidden block w-full h-[1px] bg-white'></div>
                            <div className="flex flex-col items-center lg:items-end py-4 lg:py-0">
                                <h3 className="text-4xl md:text-6xl lg:text-7xl font-popfun uppercase" >
                                    {"Team 2"}
                                </h3>
                                <p className="text-lg md:text-3xl font-popfun uppercase !tracking-wider" >
                                    SCORE: {"400".toString().padStart(2, '0')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div> : <></>}
            </Wrapper>
        </section >
    )
}

export default GamePlay;

// style={{ clipPath: "polygon(0 0, 80% 0, 100% 100%, 0% 100%)" }}
//  relative before:absolute before:content-[''] before:w-3 before:left-[3.3rem] before:rotate-[28deg] before:h-[230px] before:-z-10 before:bg-black
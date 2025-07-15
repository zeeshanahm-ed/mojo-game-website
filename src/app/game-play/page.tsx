"use client"
import React, { useState } from 'react'
import Wrapper from '@/app/components/ui/common/Wrapper';
import Input from '@/app/components/ui/common/Input';
import CategoriesSection from '@/app/components/ui/common/CategoriesSection';

//icons
import HoleIcon from '@/app/assets/icons/hole-icon.svg';
import SecondChanceIcon from '@/app/assets/icons/second-chance-icon.svg';
import CallAFriendIcon from '@/app/assets/icons/callAFriend-icon.svg';
import Header from './components/Header';
import QuestionsScoreList from './components/QuestionsScoreList';
import QuestionEvent from './components/Question';
import AnswerEvnet from './components/Answer';
import WhoAnsweredEvent from './components/WhoAnswered';

function GamePlay() {

    const team1Lifelines = { eye: true, peace: false, phone: false };
    const team2Lifelines = { eye: true, peace: false, phone: false };
    const [screen, setScreen] = useState("scorecard");


    // Helper function to render a lifeline icon with disabled state
    const renderLifelineIcon = (iconType: 'hole' | 'chance' | 'phone', isEnabled: boolean) => {
        const iconClasses = `h-8 w-8 ${isEnabled ? 'text-black' : 'text-gray-400'}`;
        const circleClasses = `w-12 h-12 rounded-full border-2 border-black flex items-center curs justify-center ${isEnabled ? "cursor-pointer" : "cursor-not-allowed"} ${isEnabled ? 'bg-white' : 'bg-gray-200 opacity-60'}`;

        let iconSvg;
        switch (iconType) {
            case 'hole':
                iconSvg = (
                    <HoleIcon />
                );
                break;
            case 'chance':
                iconSvg = (
                    <SecondChanceIcon />
                );
                break;
            case 'phone':
                iconSvg = (
                    <CallAFriendIcon />
                );
                break;
        }

        return (
            <button className={circleClasses}>
                {iconSvg}
            </button>
        );
    };

    const getScreenContent = (screen: string) => {
        switch (screen) {
            case "scorecard":
                return (
                    <QuestionsScoreList onScoreClick={(value) => setScreen(value)} />
                );
            case "question":
                return (
                    <QuestionEvent onClick={(value: string) => setScreen(value)} />
                );
            case "answer":
                return (
                    <AnswerEvnet onClick={(value: string) => setScreen(value)} />
                );
            case "whoAnswered":
                return (
                    <WhoAnsweredEvent onClick={(value: string) => setScreen(value)} />
                );

            default:
                return null;
        }
    };

    return (
        <section className='w-full'>
            <Header />
            <Wrapper>
                <div className='flex justify-center flex-col h-auto py-10 md:py-10 px-4 md:px-10 xl:px-0'>
                    {getScreenContent(screen)}
                </div>
                {screen !== "whoAnswered" ? <div className="mt-40 relative z-10 flex flex-col md:flex-row items-center justify-between w-full gap-10">
                    {/* H1 Team Section (Red) */}
                    <div
                        style={{ clipPath: "polygon(0 0, 80% 0, 100% 100%, 0% 100%)" }}
                        className="text-white px-4 md:px-5 h-[170px] lg:h-[200px] bg-red  w-full flex items-center justify-start flex-1 border-r-[0px] border-[2px] border-black">

                        <div className='flex items-center  justify-between w-full md:w-3/4'>
                            <div className="flex flex-col items-start">
                                <h3 className="text-3xl md:text-6xl lg:text-7xl font-popfun uppercase" >
                                    {"Team 1"}
                                </h3>
                                <p className="text-lg md:text-3xl font-popfun uppercase" >
                                    SCORE: {"200".toString().padStart(2, '0')}
                                </p>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-xl lg:text-2xl mb-2">Life lines</p>
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
                        style={{ clipPath: "polygon(20% 0, 100% 0%, 100% 100%, 0% 100%)" }}
                        className="text-white px-4 md:px-5 h-[170px] lg:h-[200px] bg-blue flex items-center justify-end w-full flex-1 border-l-[0px] border-[2px] border-black"
                    >
                        <div className='flex items-center  justify-between w-full md:w-3/4'>
                            <div className="flex flex-col items-start">
                                <p className="text-xl lg:text-2xl mb-2">Life lines</p>
                                <div className="flex space-x-2">
                                    {renderLifelineIcon('hole', team2Lifelines.eye)}
                                    {renderLifelineIcon('chance', team2Lifelines.peace)}
                                    {renderLifelineIcon('phone', team2Lifelines.phone)}
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <h3 className="text-3xl md:text-6xl lg:text-7xl font-popfun uppercase" >
                                    {"Team 2"}
                                </h3>
                                <p className="text-lg md:text-3xl font-popfun uppercase" >
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


//  relative before:absolute before:content-[''] before:w-3 before:left-[3.3rem] before:rotate-[28deg] before:h-[230px] before:-z-10 before:bg-black
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGameSession } from '@/app/store/gameSession';
import { useDirection } from '@/app/hooks/useGetDirection';
import Wrapper from '@/app/components/ui/common/Wrapper';
import Image from 'next/image';

interface HeaderProps {
    handleScreenChange?: (value: string) => void;
    handleOpenExitModal?: () => void;
    setCurrentLifeline?: (v: undefined) => void;
    currenScreen?: string | null;
}

const Header: React.FC<HeaderProps> = ({ handleScreenChange, handleOpenExitModal, setCurrentLifeline, currenScreen }) => {
    const { session } = useGameSession();
    const { t } = useTranslation();
    const direction = useDirection();
    const { toggleTeamTurn } = useGameSession();


    const handleChangeTeamTurn = () => {
        setCurrentLifeline?.(undefined)
        toggleTeamTurn(session?.team1.teamTurnOn ? 'team2' : session?.team2.teamTurnOn ? 'team1' : "team1");
    };

    return (
        <header className="w-full bg-yellow relative z-40 border-b-2 md:border-b-4 border-black">
            <Wrapper>
                <div className='py-4 px-4 md:px-10 flex items-center justify-between relative'>
                    {/* Left Section: Exit Game & Game Over Buttons */}
                    {currenScreen !== "congratulation" && <div className="flex items-center gap-x-2">
                        <button
                            onClick={() => handleOpenExitModal?.()}
                            className={`flex items-center text-white gap-5 bg-red py-2 ${direction === "rtl" ? "text-2xl lg:py-2" : "text-4xl lg:pt-2 lg:py-0"} md:boxShadow-custom px-2 md:px-4 transform skew-custom md:-skew-x-12 border-2 border-black shadow-lg `}
                        >
                            <Image src="/images/icons/exit-icon.svg" alt='exit-icon' width={100} height={100} className={`${direction === "rtl" ? "lg:mb-0 text-2xl" : "lg:mb-2 text-4xl"} md:h-5 w-4 h-4 md:w-5`} />
                            <span className='hidden lg:block'>{t("exitGame")}</span>
                        </button>
                        <button
                            onClick={() => handleScreenChange?.("congratulation")}
                            className={`flex items-center text-white  gap-5 bg-fanta py-2 ${direction === "rtl" ? "lg:py-2 text-2xl" : "text-4xl lg:pt-2 lg:py-0"} md:boxShadow-custom px-2 md:px-4 transform skew-custom md:-skew-x-12 border-2 border-black shadow-lg `}
                        >
                            <Image src="/images/icons/gameover-icon.svg" alt='gameover-icon' width={100} height={100} className={`${direction === "rtl" ? "lg:mb-0" : "lg:mb-2"} md:h-5 w-4 h-4 md:w-5`} />
                            <span className='hidden lg:block'>{t("gameOver")}</span>
                        </button>
                    </div>}

                    {/* Middle section: Icons and MOJO logo */}
                    <div className="items-center hidden sm:flex">
                        <h1 className={`text-4xl md:text-5xl text-gray-900 ${direction === "rtl" ? "font-arabic font-bold mb-1" : "font-bulletproof"} mt-2 uppercase cursor-pointer`}>
                            {t("mojo")}
                        </h1>
                    </div>

                    {/* Right Section: H1 Team Status */}
                    <div className="flex font-secondary items-center  lg:h-14 border md:border-2 border-black skew-custom md:-skew-x-12">

                        <div data-tip={session?.gameName} className="tooltip tooltip-bottom bg-black w-28 lg:w-44 flex justify-center text-white py-2 px-2 lg:px-3 h-full items-center">
                            <span className="truncate max-w-[98%] font-semibold uppercase text-sm lg:text-lg">{session?.gameName}</span>
                        </div>

                        <button onClick={handleChangeTeamTurn} className="bg-white sm:w-32 md:w-40 text-black py-[1px] lg:pt-2 lg:py-2 px-1 sm:px-4 flex  h-full flex-col items-center justify-center">
                            <div className="flex items-center justify-center space-x-2 w-28 lg:w-44">
                                <span className="font-semibold uppercase text-sm lg:text-lg truncate max-w-[70%]">{session?.team1.teamTurnOn ? session?.team1.name : session?.team2.name}</span>
                                <span className="w-3 h-3 bg-red rounded-full"></span>
                            </div>
                            {direction === "rtl" ?
                                <span className="text-[10px] font-arabic">الفريق في دوره</span>
                                :
                                <span className="text-[10px]">TEAM ON TURN</span>
                            }
                        </button>
                    </div>
                </div>
            </Wrapper>
        </header>
    );
};

export default Header;
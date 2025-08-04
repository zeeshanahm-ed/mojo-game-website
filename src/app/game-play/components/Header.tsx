import React from 'react';
import Wrapper from '@/app/components/ui/common/Wrapper';
import { useGameSession } from '@/app/store/gameSession';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/app/hooks/useGetDirection';
//icons
import GameOverIcon from '@/app/assets/icons/gameover-icon.svg';
import ExitIcon from '@/app/assets/icons/exit-icon.svg';

interface HeaderProps {
    handleScreenChange?: (value: string) => void;
    handleOpenExitModal?: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleScreenChange, handleOpenExitModal }) => {
    const { session } = useGameSession();
    const { t } = useTranslation();
    const direction = useDirection();

    return (
        <header className="w-full bg-yellow relative z-40">
            <Wrapper>
                <div className='py-4 px-4 md:px-10 flex items-center justify-between relative'>
                    {/* Left Section: Exit Game & Game Over Buttons */}
                    <div className="flex items-center gap-x-2">
                        <button
                            onClick={() => handleOpenExitModal?.()}
                            className={`flex items-center text-white text-4xl gap-5 bg-red py-2 ${direction ? "lg:py-2" : "lg:pt-2 lg:py-0"} md:boxShadow-custom px-2 md:px-4 transform skew-custom md:-skew-x-12 border-2 border-black shadow-lg font-popfun`}
                        >

                            <ExitIcon className={`${direction ? "lg:mb-0" : "lg:mb-2"}  md:h-5 w-5 h-4 md:w-6`} />
                            <span className='hidden lg:block'>{t("exitGame")}</span>
                        </button>
                        <button
                            onClick={() => handleScreenChange?.("congratulation")}
                            className={`flex items-center text-white text-4xl gap-5 bg-fanta py-2 ${direction ? "lg:py-2" : "lg:pt-2 lg:py-0"} md:boxShadow-custom px-2 md:px-4 transform skew-custom md:-skew-x-12 border-2 border-black shadow-lg font-popfun`}
                        >
                            <GameOverIcon className={`${direction ? "lg:mb-0" : "lg:mb-2"} md:h-5 w-4 h-4 md:w-5`} />
                            <span className='hidden lg:block'>{t("gameOver")}</span>
                        </button>
                    </div>

                    {/* Middle section: Icons and MOJO logo */}
                    <div className="flex items-center">
                        <h1 className="text-4xl md:text-5xl text-gray-900 font-bulletproof mt-2 uppercase cursor-pointer">
                            {t("mojo")}
                        </h1>
                    </div>

                    {/* Right Section: H1 Team Status */}
                    <div className="flex items-center lg:h-14 border md:border-2 border-black skew-custom md:-skew-x-12">
                        <div className="bg-black w-28 lg:w-44 flex text-white py-2 px-2 lg:px-3 h-full items-center">
                            <span title={session?.gameName} className="truncate max-w-[98%] font-semibold uppercase text-sm lg:text-lg">{session?.gameName}</span>
                        </div>
                        {session?.mode === "online" &&
                            <div className="bg-white sm:w-32 md:w-40 text-black py-2 px-1 sm:px-4 flex  h-full flex-col items-center justify-center">
                                <div className="flex items-center space-x-2">
                                    <span className="font-semibold uppercase text-sm md:text-xl">H1 TEAM</span>
                                    <span className="w-3 h-3 bg-red rounded-full"></span>
                                </div>
                                <span className="text-[10px] uppercase">TEAM ON TURN</span>
                            </div>}
                    </div>
                </div>
            </Wrapper>
        </header>
    );
};

export default Header;
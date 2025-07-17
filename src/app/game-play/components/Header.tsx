import React from 'react';
//icons
import GameOverIcon from '@/app/assets/icons/gameover-icon.svg';
import ExitIcon from '@/app/assets/icons/exit-icon.svg';
import Wrapper from '@/app/components/ui/common/Wrapper';

interface HeaderProps {
    onClick?: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onClick }) => {
    return (
        <header className="w-full bg-yellow relative z-40">
            <Wrapper>
                <div className='py-4 px-4 md:px-10 flex items-center justify-between relative'>
                    {/* Left Section: Exit Game & Game Over Buttons */}
                    <div className="flex items-center gap-x-2">
                        <button
                            className={`flex items-center text-white text-4xl gap-5 bg-red py-2 lg:pt-2 lg:py-0 md:boxShadow-custom px-2 md:px-4 transform skew-custom md:-skew-x-12 border-2 border-black shadow-lg font-popfun`}
                        >
                            <ExitIcon className="lg:mb-2 md:h-5 w-5 h-4 md:w-6" />
                            <span className='hidden lg:block'>Exit Game</span>
                        </button>
                        <button
                            onClick={() => onClick?.("congratulation")}
                            className={`flex items-center text-white text-4xl gap-5 bg-fanta py-2 lg:pt-2 lg:py-0 md:boxShadow-custom px-2 md:px-4 transform skew-custom md:-skew-x-12 border-2 border-black shadow-lg font-popfun`}
                        >
                            <GameOverIcon className="lg:mb-2 md:h-5 w-4 h-4 md:w-5" />
                            <span className='hidden lg:block'>Game Over</span>
                        </button>
                    </div>

                    {/* Middle section: Icons and MOJO logo */}
                    <div className="flex items-center">
                        <h1 className="text-4xl md:text-5xl text-gray-900 font-bulletproof mt-2 uppercase cursor-pointer">
                            Mojo
                        </h1>
                    </div>

                    {/* Right Section: H1 Team Status */}
                    <div className="flex items-center h-8 md:h-14 border md:border-2 border-black skew-custom md:-skew-x-12">
                        <div className="bg-black hidden lg:flex text-white py-2 px-4 h-full items-center">
                            <span className="font-semibold uppercase text-base md:text-xl">IR GAMES</span>
                        </div>
                        <div className="bg-white sm:w-32 md:w-40 text-black py-2 px-1 sm:px-4 flex  h-full flex-col items-center justify-center">
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold uppercase text-sm md:text-xl">H1 TEAM</span>
                                <span className="w-3 h-3 bg-red rounded-full"></span>
                            </div>
                            <span className="text-[10px] uppercase">TEAM ON TURN</span>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </header>
    );
};

export default Header;
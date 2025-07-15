import React from 'react';
import Button from '@/app/components/ui/common/Button';

//icons
import GameOverIcon from '@/app/assets/icons/gameover-icon.svg';
import ExitIcon from '@/app/assets/icons/exit-icon.svg';
import Wrapper from '@/app/components/ui/common/Wrapper';

const Header: React.FC = () => {
    return (
        <header className="w-full bg-yellow py-4 px-4 md:px-8 ">
            <Wrapper>
                <div className='flex items-center justify-between relative'>
                    {/* Top and Bottom Green Borders */}
                    <div className="w-full h-4 bg-green-700 absolute top-0 left-0 right-0"></div>
                    <div className="w-full h-4 bg-green-700 absolute bottom-0 left-0 right-0"></div>

                    {/* Left Section: Exit Game & Game Over Buttons */}
                    <div className="flex items-center gap-x-2">
                        <button
                            className={`flex items-center text-white text-4xl gap-5 bg-red pt-2 md:boxShadow-custom px-2 md:px-4 transform skew-custom md:-skew-x-12 border-2 border-black shadow-lg font-popfun`}
                        >
                            <ExitIcon className="mb-3 md:h-5 w-5 h-4 md:w-6" />
                            <span className='hidden lg:block'>Exit Game</span>
                        </button>
                        <button
                            className={`flex items-center text-white text-4xl gap-5 bg-fanta pt-2 md:boxShadow-custom px-2 md:px-4 transform skew-custom md:-skew-x-12 border-2 border-black shadow-lg font-popfun`}
                        >
                            <GameOverIcon className="mb-3 md:h-5 w-4 h-4 md:w-5" />
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
                        <div className="bg-white w-32 md:w-40 text-black py-2 px-4 flex  h-full flex-col items-center justify-center">
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
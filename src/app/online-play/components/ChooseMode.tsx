import Wrapper from '@/app/components/ui/common/Wrapper';
import React from 'react'
import { useTranslation } from 'react-i18next';

interface ModeOption {
    id: GameMode;
    title: string;
    description?: string;
}

type GameMode = 'friendly' | 'challenge' | null;

interface Props {
    selectedMode: string | null;
    handleModeSelect: (v: GameMode) => void;
}


const modes: ModeOption[] = [
    {
        id: 'friendly',
        title: 'Friendly Mode'
    },
    {
        id: 'challenge',
        title: 'Challenge Mode'
    }
];

function ChooseMode({ selectedMode, handleModeSelect }: Props) {
    const { t } = useTranslation();
    return (
        <div className='w-full flex flex-col items-center justify-center border-b-2 border-border-gray my-10'>
            <Wrapper>
                <div className="flex flex-col items-center justify-center w-full text-center">
                    <div className="flex flex-col text-center items-center lg:w-3/4 px-4">
                        <h2 className="text-6xl md:text-8xl leading-tight mb-4 uppercase ">
                            {t("joinRoom")}
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg">
                            {t("playGlobalDescription")}
                        </p>
                    </div>

                    {/* Mode Selection */}
                    <div className="flex flex-row items-center justify-center gap-5 sm:gap-8 md:gap-16 my-12 ">
                        {modes.map((mode) => (
                            <div
                                key={mode.id}
                                onClick={() => handleModeSelect(mode.id)}
                                className="flex items-center gap-2 sm:gap-4 cursor-pointer group"
                            >
                                {/* Checkbox */}
                                <div className={`sm:w-8 w-6 h-6 -skew-x-6 sm:h-8 border-2 p-1 border-black bg-white flex items-center justify-center mb-2`}>
                                    {selectedMode === mode.id && (
                                        <div className="w-full h-full bg-black"></div>
                                    )}
                                </div>

                                {/* Mode Title */}
                                <h2 className={` text-3xl md:text-4xl uppercase lg:text-5xl ${selectedMode === mode.id ? 'text-black' : 'text-gray-800'}`}>
                                    {t(mode.title)}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}

export default ChooseMode
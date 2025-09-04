import Wrapper from '@/app/components/ui/common/Wrapper';
import { useDirection } from '@/app/hooks/useGetDirection';
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
    const direction = useDirection();
    return (
        <div className='w-full flex flex-col items-center justify-center border-b-2 border-border-gray my-10'>
            <Wrapper>
                <div className="flex flex-col items-center justify-center w-full text-center">
                    <div className="flex flex-col text-center items-center lg:w-3/4 px-4">
                        <h2 className={`uppercase ${direction === "rtl" ? "text-4xl md:text-5xl" : "text-6xl md:text-7xl"}`}>
                            {t("joinRoom")}
                        </h2>
                        <p className={`text-sm ${direction === "rtl" ? "font-arabic mt-3" : "font-secondary"} sm:text-base`}>
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
                                <div className={` w-7 h-7  border-2 p-1 border-black bg-white flex items-center justify-center mb-2`}>
                                    {selectedMode === mode.id && (
                                        <div className="w-full h-full bg-black"></div>
                                    )}
                                </div>

                                {/* Mode Title */}
                                <h2 className={` ${direction === "rtl" ? "text-xl md:text-2xl " : "text-3xl md:text-[2.5rem] "} uppercase ${selectedMode === mode.id ? 'text-black' : 'text-gray-800'}`}>
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
import React from 'react'
import Image from 'next/image';
import Input from './Input';
import { useDirection } from '@/app/hooks/useGetDirection';
import { useTranslation } from 'react-i18next';

//icons
import PlusIcon from '@/app/assets/icons/plus.svg';
import MinusIcon from '@/app/assets/icons/minus.svg';
import VSIcon from '@/app/assets/images/vs.png';


interface TeamInfoProps {
    teams: { first: { name: string; players: number }; second: { name: string; players: number } };
    errors: { [key: string]: string } | null;
    handleTeamNameChange: (team: 'first' | 'second', name: string) => void;
    handlePlayerChange: (team: 'first' | 'second', type: 'plus' | 'minus') => void;
    handleGameName: (v: string) => void;
    gameName: string;
}

function TeamInfo({ gameName, handleGameName, teams, errors, handleTeamNameChange, handlePlayerChange }: TeamInfoProps) {
    const { t } = useTranslation();
    const direction = useDirection();

    return (

        <div className="text-center flex flex-col items-center justify-center mt-10">
            <h2 className="md:text-6xl text-5xl font-popfun text-black mb-2 uppercase">
                {t("teamInfoTitle")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg leading-6 text-black max-w-2xl">
                {t("playLocalNote")}
            </p>
            <div className='w-full flex flex-col items-center'>
                <Input
                    type="text"
                    placeholder={t("gameNamePlaceholder")}
                    value={gameName}
                    className='mt-10 md:w-1/2 w-full'
                    inputClassName='text-center pl-0'
                    onChange={(e): void => handleGameName(e.target.value)}
                />
                <p className="text-sm sm:text-base mt-1 text-red">{errors?.gameName}</p>
            </div>
            <div className="py-10 flex flex-col md:flex-row items-center justify-center space-y-20 md:space-y-0 md:space-x-12 lg:space-x-20 w-full">
                {/* First Team Card */}
                <div className="w-72 -skew-x-3 md:-skew-x-6 bg-red border-4 border-black flex flex-col items-center py-6 pb-4">
                    <h3 className="text-white text-5xl uppercase mb-4 font-popfun">
                        {t("firstTeam")}
                    </h3>
                    <div className="w-full bg-white border-y-2 border-black p-2 mb-4">
                        <input
                            type="text"
                            placeholder={t("yourTeamName")}
                            className="input w-full text-lg bg-white border-none focus:outline-none"
                            value={teams.first.name}
                            maxLength={20}
                            dir={direction}
                            onChange={(e) => handleTeamNameChange("first", e.target.value)}
                        />
                        <p className="text-sm sm:text-base mt-1 text-red">{errors?.firstTeam}</p>
                    </div>
                    {/* Player Count Controls */}
                    <div className="flex items-center justify-center w-full space-x-2 px-6">
                        <CustomButton
                            handleClick={handlePlayerChange}
                            icon={<PlusIcon />}
                            type="plus"
                            team="first"
                        />
                        <span className="text-white text-lg flex-grow text-center">
                            {t("players", { count: teams.first.players })}
                        </span>
                        <CustomButton
                            handleClick={handlePlayerChange}
                            icon={<MinusIcon />}
                            type="minus"
                            team="first"
                        />
                    </div>
                </div>

                <div className="relative w-24 h-24 flex items-center justify-center">
                    <Image src={VSIcon} alt='vs' className='w-28 h-36' />
                </div>

                {/* Second Team Card */}
                <div className="w-72 bg-blue -skew-x-3 md:-skew-x-6 border-4 border-black flex flex-col items-center py-6 pb-4">
                    <h3 className="text-white text-5xl uppercase mb-4 font-popfun">
                        {t("secondTeam")}
                    </h3>
                    <div className="w-full bg-white border-y-2 border-black p-2 mb-4">
                        <input
                            type="text"
                            dir={direction}
                            maxLength={20}
                            placeholder={t("yourTeamName")}
                            className="input w-full text-lg bg-white text-gray-800 border-none focus:outline-none"
                            value={teams.second.name}
                            onChange={(e) => handleTeamNameChange("second", e.target.value)}
                        />
                        <p className="text-sm sm:text-base mt-1 text-red">{errors?.secondTeam}</p>
                    </div>
                    {/* Player Count Controls */}
                    <div className="flex items-center justify-center w-full space-x-2 px-6">
                        <CustomButton
                            handleClick={handlePlayerChange}
                            icon={<PlusIcon />}
                            type="plus"
                            team="second"
                        />
                        <span className="text-white text-lg flex-grow text-center">
                            {t("players", { count: teams.second.players })}
                        </span>
                        <CustomButton
                            handleClick={handlePlayerChange}
                            icon={<MinusIcon />}
                            type="minus"
                            team="second"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamInfo;

interface CustomButtonProps {
    handleClick: (team: 'first' | 'second', type: 'plus' | 'minus') => void;
    icon: React.ReactElement;
    team: 'first' | 'second'
    type: 'plus' | 'minus'
}
const CustomButton = ({ handleClick, icon, team, type }: CustomButtonProps) => {
    return (
        <button
            className="flex justify-center items-center bg-yellow text-black text-xl w-12 h-10 boxShadow-custom border-2 border-black"
            onClick={() => handleClick(team, type)}
        >
            {icon}
        </button>
    )
}
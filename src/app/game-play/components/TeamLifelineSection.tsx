import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useDirection } from '../../hooks/useGetDirection';
import { TeamLifelineDataInterface } from '@/app/utils/Interfaces';

type Lifeline = 'scoreSteal' | 'secondChance' | 'callAFriend';

interface TeamData {
    name: string;
    score: number;
    teamTurnOn: boolean;
    lifelines: TeamLifelineDataInterface[];
}

interface TeamLifelineSectionProps {
    team1: TeamData;
    team2: TeamData;
    onLifelineClick: (lifeline: Lifeline, currentTeamLifeline: TeamLifelineDataInterface) => void;
    currentScreen: string;
}

const TeamLifelineSection: React.FC<TeamLifelineSectionProps> = ({
    team1,
    team2,
    onLifelineClick,
    currentScreen
}) => {
    const { t } = useTranslation();
    const direction = useDirection();

    // Helper function to get lifeline availability from array
    const getLifelineAvailability = (lifelines: TeamLifelineDataInterface[], lifelineType: Lifeline): boolean => {

        // Find lifeline by matching lifeLineName with lifelineType
        const lifeline = lifelines.find(l => l.lifeLineName === lifelineType);

        if (!lifeline) {
            console.log(`No lifeline found for type: ${lifelineType}`);
            return true; // Default to available if not found
        }

        // Use the 'used' property - if used is true, lifeline is NOT available
        const isUsed = lifeline.used;
        const isAvailable = !isUsed; // Available when NOT used

        return isAvailable;
    };

    // Helper function to get lifeline icon
    const getLifelineIcon = (iconType: Lifeline): React.ReactNode => {
        const iconClasses = `w-5 h-5 sm:w-8 sm:h-8`;

        switch (iconType) {
            case 'scoreSteal':
                return <Image src="/images/score-steal-image.png" alt='score-steal-image' width={100} height={100} className={iconClasses} />;
            case 'secondChance':
                return <Image src="/images/second-chance-image.png" alt='second-chance-icon' width={100} height={100} className={iconClasses} />;
            case 'callAFriend':
                return <Image src="/images/call-image.png" alt='callAFriend-icon' width={100} height={100} className={iconClasses} />;
            default:
                return null;
        }
    };

    // Helper function to check if lifeline should be disabled
    const isLifelineDisabled = (isAvailable: boolean, teamTurnOn: boolean): boolean => {
        const isScreenDisabled = ["questionsList", "answer", "whoAnswered", "congratulation"].includes(currentScreen || "");
        return isScreenDisabled || !isAvailable || !teamTurnOn;
    };

    // Helper function to render a lifeline icon with disabled state
    const renderLifelineIcon = (iconType: Lifeline, isAvailable: boolean, team: TeamData) => {
        const currentTeamLifeline = team.lifelines.find(l => l.lifeLineName === iconType);
        const isDisabled = isLifelineDisabled(isAvailable, team.teamTurnOn);
        const circleClasses = `w-12 h-12 rounded-full border-2 border-black flex items-center justify-center ${isDisabled ? "cursor-not-allowed bg-gray-200 opacity-60" : "cursor-pointer bg-white"}`;

        return (
            <button disabled={isDisabled} className={circleClasses} onClick={() => onLifelineClick(iconType, currentTeamLifeline as TeamLifelineDataInterface)}>
                {getLifelineIcon(iconType)}
            </button>
        );
    };

    // Helper function to render all lifelines for a team
    const renderTeamLifelines = (team: TeamData) => {
        const lifelineTypes: Lifeline[] = ['scoreSteal', 'secondChance', 'callAFriend'];

        return lifelineTypes.map((lifelineType) => {
            // Get availability, default to true if no data
            const isAvailable = team.lifelines && team.lifelines.length > 0
                ? getLifelineAvailability(team.lifelines, lifelineType)
                : true; // Default to available if no lifeline data

            return (
                <React.Fragment key={lifelineType}>
                    {renderLifelineIcon(
                        lifelineType,
                        isAvailable,
                        team
                    )}
                </React.Fragment>
            );
        });
    };

    // Don't render if on specific screens
    if (currentScreen === "whoAnswered" || currentScreen === "congratulation") {
        return null;
    }

    return (
        <div className="pt-10 pb-10 md:py-20 px-4 md:px-10 lg:px-0 lg:pb-0 relative z-10 flex flex-col sm:flex-row items-center justify-between w-full gap-y-10 sm:gap-y-0 lg:gap-10">
            {/* Team 1 Section (Red) */}
            <div className="custom-clipPath-rightSide text-white px-4 md:-skew-x-6 -skew-x-3 lg:-skew-x-0 lg:px-5 lg:h-[180px] bg-red flex items-center justify-center lg:justify-start w-[250px] md:w-[320px] lg:flex-1 lg:border-none border-4 border-black">
                <div className='flex lg:flex-row flex-col items-center justify-center lg:justify-between w-full lg:md:w-3/4'>
                    <div className="lg:w-[60%] w-full flex flex-col items-center lg:items-start py-4 lg:py-0">
                        <h3 className="truncate max-w-[90%] text-4xl md:text-6xl lg:text-7xl font-primary uppercase">
                            {team1.name}
                        </h3>
                        <p className="text-lg md:text-3xl uppercase !tracking-wider">
                            {t("score")}: {team1.score?.toString() ?? "0"}
                        </p>
                    </div>
                    <div className='lg:hidden block w-full h-[1px] bg-white'></div>
                    <div className="flex flex-col items-center lg:items-end py-4 lg:py-0">
                        <p className={`text-base ${direction === "rtl" ? "font-arabic text-xl" : "font-secondary sm:text-xl lg:text-2xl"} mb-2`}>
                            {t("lifeLines")}
                        </p>
                        <div className="flex space-x-2">
                            {renderTeamLifelines(team1)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Team 2 Section (Blue) */}
            <div className="custom-clipPath-leftSide md:-skew-x-6 -skew-x-3 lg:-skew-x-0 text-white px-4 lg:px-5 lg:h-[180px] bg-blue flex items-center justify-center lg:justify-end w-[250px] md:w-[320px] lg:flex-1 lg:border-none border-4 border-black">
                <div className='flex lg:flex-row flex-col-reverse items-center justify-center w-full lg:justify-between lg:md:w-3/4'>
                    <div className="flex flex-col items-center lg:items-start py-4 lg:py-0">
                        <p className={`text-base ${direction === "rtl" ? "font-arabic text-xl" : "font-secondary sm:text-xl lg:text-2xl"} mb-2`}>
                            {t("lifeLines")}
                        </p>
                        <div className="flex space-x-2">
                            {renderTeamLifelines(team2)}
                        </div>
                    </div>
                    <div className='lg:hidden block w-full h-[1px] bg-white'></div>
                    <div className="lg:w-[60%] w-full flex flex-col items-center lg:items-end py-4 lg:py-0">
                        <h3 className="truncate max-w-[90%] text-center text-4xl md:text-6xl lg:text-7xl font-primary uppercase">
                            {team2.name}
                        </h3>
                        <p className="text-lg md:text-3xl uppercase !tracking-wider">
                            {t("score")}: {team2.score?.toString() ?? "0"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamLifelineSection;

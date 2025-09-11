import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/app/components/ui/common/Button";
import Image from "next/image";
import Timer from "./Timer";
import useLifelineUse from "../core/hooks/useLifelineUse";
import { useGameSession } from "@/app/store/gameSession";
import { TeamLifelineDataInterface } from "@/app/utils/Interfaces";

type LifelineType = 'scoreSteal' | 'secondChance' | 'callAFriend';

interface LifelineProps {
    currentLifelineType: string;
    setCurrentLifeline: (lifeline: string) => void;
    setIsDesibleAnswerBtn: (isDesibleAnswerBtn: boolean) => void;
    currentTeamLifelineData: TeamLifelineDataInterface | null;
}

type Lifeline = {
    lifeLineId: string;
    lifeLineName: string;
    teamId: string;
    used: boolean;
};

interface LifelineData {
    title: string;
    type: LifelineType;
    description: string;
    textColor: string;
    bgColor: string;
    icon: React.ReactNode;
    showButton: boolean;
    TimerUi?: React.ReactNode;
}

interface LifelineConfig {
    title: string;
    type: LifelineType;
    description: string;
    textColor: string;
    bgColor: string;
    imagePath: string;
    altText: string;
}

// Lifeline configuration constants
const LIFELINE_CONFIGS: LifelineConfig[] = [
    {
        title: "callFriend",
        type: "callAFriend",
        description: "callFriendNote",
        textColor: "text-[#862CF3]",
        bgColor: "bg-[#862CF3]",
        imagePath: "/images/call-image.png",
        altText: "callFriend"
    },
    {
        title: "secondChance",
        type: "secondChance",
        description: "secondChanceNote2",
        textColor: "text-[#F3682C]",
        bgColor: "bg-[#F3682C]",
        imagePath: "/images/second-chance-image.png",
        altText: "secondChance"
    },
    {
        title: "scoreSteal",
        type: "scoreSteal",
        description: "secondChanceNote2",
        textColor: "text-[#2CA7F3]",
        bgColor: "bg-[#2CA7F3]",
        imagePath: "/images/score-steal-image.png",
        altText: "scoreSteal"
    }
];

const LifelineCard: React.FC<LifelineProps> = ({ setIsDesibleAnswerBtn, currentLifelineType, setCurrentLifeline, currentTeamLifelineData }) => {
    const { t } = useTranslation();
    const [isCallAFriendActive, setIsCallAFriendActive] = useState(false);
    const { mutateLifelineUse } = useLifelineUse();
    const { session, useLifeline } = useGameSession();
    const gameId = localStorage.getItem("currentGameId");


    const [isLifelineActive, setIsLifelineActive] = useState(false);

    // Helper function to create lifeline icon
    const createLifelineIcon = (config: LifelineConfig): React.ReactNode => (
        <Image
            src={config.imagePath}
            alt={t(config.altText)}
            className='w-20 md:w-24 h-1/2 object-contain'
            width={100}
            height={100}
        />
    );

    // Helper function to create timer UI for call a friend
    const createCallAFriendTimer = (): React.ReactNode => (
        <Timer
            duration={60}
            onComplete={() => {
                setIsCallAFriendActive(false);
                setCurrentLifeline("");
                setIsDesibleAnswerBtn(false);
            }}
            size={140}
        />
    );

    // Memoized lifeline data for initial state
    const initialLifelinesData = useMemo((): LifelineData[] =>
        LIFELINE_CONFIGS.map(config => ({
            ...config,
            icon: createLifelineIcon(config),
            showButton: true,
        })), [t]
    );

    // Memoized lifeline data for active state
    const activeLifelinesData = useMemo((): LifelineData[] =>
        LIFELINE_CONFIGS.map(config => ({
            ...config,
            icon: createLifelineIcon(config),
            // description: config.type === "callAFriend" && isCallAFriendActive ? "callFriendNote2" : "",
            showButton: false,
            TimerUi: config.type === "callAFriend" && isCallAFriendActive ? createCallAFriendTimer() : undefined,
        })), [t, isCallAFriendActive]
    );

    // Get current lifeline data based on state
    const currentLifelineData = useMemo((): LifelineData | null => {
        if (!currentLifelineType) return null;

        const dataSource = isCallAFriendActive && currentLifelineType === "callAFriend"
            ? activeLifelinesData
            : initialLifelinesData;

        return dataSource.find(lifeline => lifeline.type === currentLifelineType) || null;
    }, [currentLifelineType, isCallAFriendActive, initialLifelinesData, activeLifelinesData]);

    // Event handlers
    const handleYes = () => {
        if (currentLifelineType === "callAFriend") {
            setIsCallAFriendActive(true);
            setIsDesibleAnswerBtn(true);
        }
    };

    const handleNo = () => {
        setIsCallAFriendActive(false);
        setCurrentLifeline("");
    };

    const handleLifelineUse = () => {
        const currentTeam = currentTeamLifelineData?.teamId === session?.team1.teamId ? "team1" : "team2";
        const body = {
            gameId: gameId,
            lifeLineId: currentTeamLifelineData?.lifeLineId,
            teamId: currentTeamLifelineData?.teamId,
            used: true,
        };
        mutateLifelineUse(body);
        useLifeline(currentTeam, currentTeamLifelineData as Lifeline);
    };

    // Reset call a friend state when lifeline changes
    useEffect(() => {
        if (currentLifelineType !== "callAFriend") {
            setIsCallAFriendActive(false);
            setIsDesibleAnswerBtn(false);
        }
    }, [currentLifelineType]);

    // Don't render if no current lifeline
    if (!currentLifelineData) {
        return null;
    };

    const { icon, title, description, textColor, bgColor, showButton, TimerUi } = currentLifelineData;

    return (
        <div className="relative w-80 border-4 border-dark-gray h-[510px] rounded-none">
            <div className="card-body items-center text-center">
                {/* Header */}
                <h2 className="font-secondary text-2xl">{t("lifeLines")}</h2>
                <div className="divider h-1 before:bg-light-gray after:bg-light-gray m-0"></div>

                {/* Icon */}
                <div className="my-5">{icon}</div>

                {/* Title */}
                <h3 className={`text-5xl ${textColor} uppercase`}>
                    {t(title)}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 font-secondary">{t(description)}</p>

                {/* Action Buttons */}
                {showButton && (
                    <div className="mt-4 flex flex-col items-center gap-2 w-full">
                        <Button
                            bgClass={bgColor}
                            className="w-32 text-3xl"
                            onClick={handleYes}
                        >
                            {t("yes")}
                        </Button>
                        <Button
                            bgClass={bgColor}
                            className="w-32 text-3xl"
                            onClick={handleNo}
                        >
                            {t("no")}
                        </Button>
                    </div>
                )}

                {/* Timer UI */}
                {TimerUi && (
                    <div className="mt-4">
                        {TimerUi}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LifelineCard;
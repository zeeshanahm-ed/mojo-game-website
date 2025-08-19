import React from "react";
import { useGameSession } from "@/app/store/gameSession";
import { offlineQuestionsListInterface } from "@/app/constants/constant";
import { useTranslation } from "react-i18next";

interface WhoAnsweredEventProps {
    question: offlineQuestionsListInterface | null;
    points?: number;
    handleScreenChange: (action: string) => void;
}

export default function WhoAnsweredEvent({ handleScreenChange, question }: WhoAnsweredEventProps) {
    const { t } = useTranslation();
    const { addScore } = useGameSession();
    const { session } = useGameSession();

    const handleAnswer = (team: "team1" | "team2" | "none") => {
        if (team !== "none") {
            addScore(team, question?.points || 0);
        }

        handleScreenChange("questionsList");
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl mb-2 font-secondary text-nowrap">{t("whoAnsweredCorrectly")}</h2>
                <p className="md:text-xl text-base text-light-gray font-secondary">( {t("selectOneOption")} )</p>
                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row w-full items-center justify-center py-2 rounded-b-lg gap-5 md:gap-10 my-5 md:my-10" >
                    <div
                        role="button"
                        onClick={() => handleAnswer("team1")}
                        className="flex h-16 md:h-20 w-3/4 sm:w-1/2 md:w-96 px-2 md:px-5 py-2 pt-4 items-center justify-center text-white bg-red  border-2 border-black ">
                        <span className="truncate md:text-6xl text-4xl tracking-wider">{session?.team1.name || "Team 1"}</span>
                    </div>
                    <div
                        role="button"
                        onClick={() => handleAnswer("team2")}
                        className="cursor-pointer flex h-16 md:h-20 w-3/4 sm:w-1/2 md:w-96 px-5 py-2 pt-4 items-center justify-center text-white bg-blue  border-2 border-black ">
                        <span className="truncate md:text-6xl text-4xl tracking-wider">{session?.team2.name || "Team 2"}</span>
                    </div>
                </div>
                <div
                    role="button"
                    onClick={() => handleAnswer("none")}
                    className="cursor-pointer flex h-16 md:h-20 w-3/4 sm:w-1/2 md:w-64 px-5 py-2 pt-4 items-center justify-center text-black bg-white border-2 border-black ">
                    <span className="truncate md:text-6xl text-4xl tracking-wider">{t("noOne")}</span>
                </div>
            </div>
        </div>
    );
}
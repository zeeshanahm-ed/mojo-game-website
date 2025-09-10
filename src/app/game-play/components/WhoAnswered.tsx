import React from "react";
import { useGameSession } from "@/app/store/gameSession";
import { useTranslation } from "react-i18next";
import { useDirection } from "@/app/hooks/useGetDirection";
import { giveAnswer } from "../core/_requests";
import { useRouter, useSearchParams } from "next/navigation";

interface WhoAnsweredEventProps {
    question: any | null;
    points?: number;
    handleScreenChange: (action: string) => void;
    gameId: string;
    setState: (state: any) => void;
}

export default function WhoAnsweredEvent({ handleScreenChange, question, gameId, setState }: WhoAnsweredEventProps) {
    const { t } = useTranslation();
    const { session } = useGameSession();
    const direction = useDirection();
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleGiveAnswer = (team: "team1" | "team2" | "none") => {
        setState(prev => ({
            ...prev,
            isLoading: true,
        }));
        const data = {
            gameId: gameId || "",
            questionId: question?._id || "",
            answeredByTeamId: team === "team1" ? session?.team1.teamId : team === "team2" ? session?.team2.teamId : null,
            correctAnswer: team === "none" ? false : true,
            points: question?.points || 0,
        };
        const params = new URLSearchParams(searchParams.toString());
        params.delete("questionId");
        router.push(`/game-play?${params.toString()}`);
        giveAnswer(data).then((res) => {
            if (res.data.success) {
                handleScreenChange("questionsList");
            }
        }).finally(() => {
            setState(prev => ({
                ...prev,
                isLoading: false,
            }));
        });
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full flex flex-col items-center">
                <h2 className={`text-3xl md:text-4xl mb-2 text-nowrap ${direction === "rtl" ? "font-arabic" : "font-secondary"}`}>{t("whoAnsweredCorrectly")}</h2>
                <p className={`md:text-xl text-base text-light-gray ${direction === "rtl" ? "font-arabic" : "font-secondary"}`}>( {t("selectOneOption")} )</p>
                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row w-full items-center justify-center py-2 rounded-b-lg gap-5 md:gap-10 my-5 md:my-10" >
                    <button
                        role="button"
                        onClick={() => handleGiveAnswer("team1")}
                        className="flex h-16 md:h-20 w-3/4 sm:w-1/2 md:w-96 px-2 md:px-5 py-2 pt-4 items-center justify-center text-white bg-red  border-2 border-black ">
                        <span className="truncate md:text-6xl text-4xl font-primary tracking-wider">{session?.team1.name || "Team 1"}</span>
                    </button>
                    <button
                        role="button"
                        onClick={() => handleGiveAnswer("team2")}
                        className="cursor-pointer flex h-16 md:h-20 w-3/4 sm:w-1/2 md:w-96 px-5 py-2 pt-4 items-center justify-center text-white bg-blue  border-2 border-black ">
                        <span className="truncate md:text-6xl font-primary text-4xl tracking-wider">{session?.team2.name || "Team 2"}</span>
                    </button>
                </div>
                <button
                    role="button"
                    onClick={() => handleGiveAnswer("none")}
                    className="cursor-pointer flex h-16 md:h-20 w-3/4 sm:w-1/2 md:w-64 px-5 py-2 pt-4 items-center justify-center text-black bg-white border-2 border-black ">
                    <span className={`truncate tracking-wider ${direction === "rtl" ? "md:text-5xl text-4xl " : "md:text-6xl text-4xl "}`}>{t("noOne")}</span>
                </button>
            </div>
        </div>
    );
}
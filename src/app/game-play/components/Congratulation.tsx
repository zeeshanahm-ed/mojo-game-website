"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useGameSession } from "@/app/store/gameSession";
import { useTranslation } from "react-i18next";
import Button from "@/app/components/ui/common/Button";
import { gameEnd } from "../core/_requests";
import { useEffect, useState } from "react";


const Congratulation: React.FC = () => {
    const { session } = useGameSession();
    const searchParams = useSearchParams();
    const { t } = useTranslation();
    const router = useRouter();
    const gameId = localStorage.getItem("currentGameId");
    const [state, setState] = useState<any>({
        team1: {},
        team2: {},
        isDraw: false,
        winnerTeam: {},
        loserTeam: {},
    });

    useEffect(() => {
        handleEndGame();
    }, []);

    const handleEndGame = () => {

        gameEnd(gameId || "").then((res) => {
            const loserTeam = res.data.winner.teamId === res.data.finalScores[0].teamId ? res.data.finalScores[1] : res.data.finalScores[0];
            setState(prev => ({
                ...prev,
                team1: res.data.finalScores[0],
                team2: res.data.finalScores[1],
                isDraw: res.data.winner.teamId === "draw",
                winnerTeam: res.data.winner,
                loserTeam: loserTeam,
            }));
            localStorage.removeItem("currentGameMode");
            localStorage.removeItem("currentGameId");
            localStorage.removeItem("currentGameCategoriesData");
            const params = new URLSearchParams(searchParams.toString());
            params.delete("questionId");
            params.delete("gameId");
            router.push(`/game-play?${params.toString()}`);
        });
    };

    return (
        <div className='relative flex items-center justify-center flex-col'>
            <div className="absolute  inset-x-0 inset-y-0 animate-ping">
                <Image
                    src="./images/congratulation-image.png"
                    alt="winner banner" className="h-full w-full object-cover"
                    width={100}
                    height={100} />
            </div>
            <div className='text-center mb-10'>
                <h2 className="md:text-8xl text-5xl  text-[#75C704] mb-2 uppercase">
                    {t("congratulations")}
                </h2>
                <p className="text-sm font-secondary sm:text-base md:text-lg leading-6 text-black max-w-2xl">
                    {t("playLocalNote")}
                </p>
            </div>

            <div className="flex w-full justify-center flex-row gap-2 sm:gap-8 ">
                {/* Blue - Winner Card */}
                <div className="w-full sm:w-56 md:w-64 h-64 md:h-80 -skew-x-3 p-4 sm:p-6 flex flex-col items-center justify-center text-center border-4 border-dark-blue text-blue-500">
                    <div className="mb-4">
                        <Image src="/images/icons/group-icon-blue.svg" alt='group-icon' width={100} height={100} className="w-8 h-8 sm:h-12 sm:w-12" />
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl uppercase text-dark-blue">
                        {state.isDraw ? state?.team1.teamName : state.winnerTeam.teamName}
                    </h2>
                    <p className="text-2xl sm:text-3xl md:text-4xl -mt-2 uppercase mb-4 leading-tight text-dark-blue">
                        {state.isDraw ? "IT'S A DRAW" : "HAS WON THE GAME"}
                    </p>
                    <p className="text-black text-xl sm:text-3xl md:text-4xl">
                        {state.isDraw ? state?.team1.points : state.winnerTeam.points} {t("score")}
                    </p>
                </div>

                {/* Red - Loser Card */}
                <div className="w-full sm:w-56 md:w-64 h-52 md:h-72 -skew-x-3 mt-auto p-4 sm:p-6 flex flex-col items-center justify-center text-center border-4 border-red text-blue-500">
                    <div className="mb-4">
                        <Image src="/images/icons/group-icon-red.svg" alt='group-icon' width={100} height={100} className="w-8 h-8 sm:h-12 sm:w-12" />
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl uppercase text-red">
                        {state.isDraw ? state?.team2.teamName : state.loserTeam.teamName}
                    </h2>
                    <p className="text-black text-xl sm:text-3xl md:text-4xl">
                        {state.isDraw ? state?.team2.points : state.loserTeam.points} {t("score")}
                    </p>
                </div>
            </div>

            <Button
                onClick={() => {
                    const url = session?.mode === "offline" ? "/offline-play" : "/online-play";
                    router.push(url);
                }}
                className="text-3xl sm:text-4xl pt-2 px-8 sm:px-16 mt-10 -skew-x-6 w-fit"
                style={{ boxShadow: "none" }}
            >
                {t("playAgain")}
            </Button>
        </div>
    );
};

export default Congratulation;

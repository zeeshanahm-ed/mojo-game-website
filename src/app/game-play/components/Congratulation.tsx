"use client";

import Image from "next/image";
import GroupIcon from "@/app/assets/icons/group-icon.svg";
import Button from "@/app/components/ui/common/Button";
import CongratulationImage from "@/app/assets/images/congratulation-image.png";
import { useRouter } from "next/navigation";
import { useGameSession } from "@/app/store/gameSession";
import { useTranslation } from "react-i18next";

const Congratulation: React.FC = () => {
    const { session } = useGameSession();
    const { t } = useTranslation();
    const router = useRouter();

    const team1Score = session?.team1?.score ?? 0;
    const team2Score = session?.team2?.score ?? 0;

    const isTeam1Winner = team1Score > team2Score;
    const isDraw = team1Score === team2Score;

    const winnerTeam = isDraw ? null : isTeam1Winner ? "team1" : "team2";
    const loserTeam = isDraw ? null : isTeam1Winner ? "team2" : "team1";

    return (
        <div className='relative flex items-center sm:items-start justify-center flex-col'>
            <div className="md:-right-24 rotate-[90deg] md:rotate-0 -top-[250px] right-[53px] md:-top-20 w-[20rem] md:w-[32rem] md:h-[30rem] h-[20rem] absolute">
                <Image src={CongratulationImage} alt='Congratulation' className='object-contain w-full h-full' />
            </div>
            <div className='text-center sm:text-start mb-10'>
                <h2 className="md:text-8xl text-5xl  text-[#75C704] mb-2 uppercase">
                    {t("congratulations")}
                </h2>
                <p className="text-sm font-secondary sm:text-base md:text-lg leading-6 text-black max-w-2xl">
                    {t("playLocalNote")}
                </p>
            </div>

            <div className="flex w-full justify-center sm:justify-start flex-row gap-2 sm:gap-8 ">
                {/* Blue - Winner Card */}
                <div className="w-full sm:w-56 md:w-64 h-64 md:h-80 -skew-x-3 p-4 sm:p-6 flex flex-col items-center justify-center text-center border-4 border-dark-blue text-blue-500">
                    <div className="mb-4">
                        <GroupIcon className="w-8 h-8 sm:h-12 sm:w-12 text-dark-blue fill-dark-blue" />
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl uppercase text-dark-blue">
                        {isDraw ? session?.team1.name : winnerTeam === "team1" ? session?.team1.name : session?.team2.name}
                    </h2>
                    <p className="text-2xl sm:text-3xl md:text-4xl -mt-2 uppercase mb-4 leading-tight text-dark-blue">
                        {isDraw ? "IT'S A DRAW" : "HAS WON THE GAME"}
                    </p>
                    <p className="text-black text-xl sm:text-3xl md:text-4xl">
                        {isDraw ? team1Score : winnerTeam === "team1" ? team1Score : team2Score} {t("score")}
                    </p>
                </div>

                {/* Red - Loser Card */}
                <div className="w-full sm:w-56 md:w-64 h-52 md:h-72 -skew-x-3 mt-auto p-4 sm:p-6 flex flex-col items-center justify-center text-center border-4 border-red text-blue-500">
                    <div className="mb-4">
                        <GroupIcon className="w-8 h-8 sm:h-12 sm:w-12 text-red fill-red" />
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl uppercase text-red">
                        {isDraw ? session?.team2.name : loserTeam === "team1" ? session?.team1.name : session?.team2.name}
                    </h2>
                    <p className="text-black text-xl sm:text-3xl md:text-4xl">
                        {isDraw ? team2Score : loserTeam === "team1" ? team1Score : team2Score} {t("score")}
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

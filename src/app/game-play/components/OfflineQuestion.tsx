import React, { useState, useRef } from "react";
import Image from "next/image";
import { offlineQuestionsListInterface } from "@/app/constants/constant";
import { useDirection } from "@/app/hooks/useGetDirection";
import { useTranslation } from "react-i18next";
//icon
import { BsQuestionCircle } from "react-icons/bs";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { MdRestartAlt } from "react-icons/md";


interface OfflineQuestionProps {
    questionType?: "audio" | "video" | "image" | "list";
    question: offlineQuestionsListInterface | null;
    handleScreenChange: (action: string) => void;
    setCurrentLifeline: (v: undefined) => void;
}

export default function OfflineQuestion({ question, handleScreenChange, setCurrentLifeline }: OfflineQuestionProps) {
    const [timer, setTimer] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const { t } = useTranslation();
    const direction = useDirection();
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Timer logic
    React.useEffect(() => {
        if (!isPaused) {
            timerRef.current = setTimeout(() => setTimer(timer + 1), 1000);
        }
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [timer, isPaused]);

    const handlePause = () => setIsPaused(true);
    const handleResume = () => setIsPaused(false);
    const handleReset = () => {
        setTimer(0);
        setIsPaused(false);
    };

    const formatTime = (totalSeconds: number): string => {
        // const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
        const seconds = String(totalSeconds % 60).padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full lg:max-w-5xl">
                <div className="border border-dark-orange">
                    {/* Question Header */}
                    <div className="bg-dark-orange text-white py-2 px-2 flex items-center justify-center gap-5">
                        <BsQuestionCircle className="text-2xl" />
                        <span className="text-lg font-secondary">{question?.text}</span>
                    </div>

                    {/* Options (audio/video/list) */}
                    <div className="flex flex-col items-center justify-center py-4 gap-2 h-[400px]">
                        {question?.mediaType === "audio" && (
                            <audio controls src={question?.mediaUrl} className="w-full md:w-1/2" />
                        )}
                        {question?.mediaType === "video" && (
                            <video
                                src={question.mediaUrl}
                                controls
                                controlsList="nodownload noremoteplayback"
                                disablePictureInPicture
                                className="w-full h-full object-contain"
                            ></video>
                        )}
                        {question?.mediaType === "image" && (
                            <Image src={question?.mediaUrl || ""} width={100} height={100} alt="Question Image" className="w-full h-full object-contain" />
                        )}

                    </div>

                </div>
                {/* Bottom bar */}
                <div className="flex items-center justify-between py-2 rounded-b-lg flex-wrap gap-y-4">

                    <button className={`flex sm:h-12 px-2 md:px-5 py-1 sm:py-2 pt-2  items-center justify-between text-white bg-dark-orange border-2 border-black ${direction === "rtl" ? "text-2xl" : "md:text-4xl text-xl sm:text-3xl sm:pt-4"}`}>
                        {question?.category.toUpperCase()}
                        <span className={`${direction === "rtl" ? "md:text-xl text-xl" : "md:text-2xl text-base sm:text-xl"} ml-2 md:ml-10 uppercase`}>{question?.points} {t("points")}</span>
                    </button>

                    <div className="flex items-center gap-2">
                        {/* Timer */}
                        <div className="-skew-x-12 bg-white border border-dark-orange sm:h-12 h-10 text-white flex gap-2 items-center w-20 sm:w-24  md:w-32">
                            <span className=" text-lg bg-dark-orange w-8 sm:w-10 h-full flex-center">
                                <Image src="/images/icons/clock-icon.svg" alt='clock-icon' width={100} height={100} className="w-4 h-4 sm:w-6 sm:h-6" />
                            </span>
                            <span className={` text-black mx-auto ${direction === "rtl" ? "text-xl sm:text-2xl mt-1" : "text-xl sm:text-2xl md:text-3xl mt-2"}`}>{formatTime(timer)}</span>
                        </div>
                        {/* Timer controls */}
                        <div className="sm:h-12">
                            {isPaused ?
                                <button className="bg-purple h-full text-white p-2 -skew-x-12 border-2 border-black" onClick={handleResume} >
                                    <IoMdPlay className="text-xl sm:text-2xl" />
                                </button>
                                :
                                <button className="bg-purple h-full text-white p-2 -skew-x-12 border-2 border-black" onClick={handlePause} >
                                    <IoMdPause className="text-xl sm:text-2xl" />
                                </button>
                            }
                            <button onClick={handleReset} className="text-white h-full bg-purple p-2 -skew-x-12 border-2 border-black">
                                <MdRestartAlt className="text-xl sm:text-2xl" />
                            </button>
                        </div>
                    </div>
                    <button
                        role="button"
                        onClick={() => {
                            setCurrentLifeline(undefined);
                            handleScreenChange("answer");
                        }}
                        className={`w-full sm:w-auto cursor-pointer sm:h-12 flex px-2 md:px-5 py-1 sm:py-2 pt-2 ${direction === "rtl" ? "text-2xl" : "sm:pt-4 md:text-4xl text-xl sm:text-3xl"} items-center justify-center  text-white bg-dark-green  border-2 border-black`}>
                        {t("seeAnswer")}
                    </button>
                </div>
            </div>
        </div>
    );
}

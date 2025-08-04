import React, { useState, useRef } from "react";
import Image from "next/image";
import { offlineQuestionsListInterface } from "@/app/constants/constant";
import { useTranslation } from "react-i18next";
//icon
import { BsQuestionCircle } from "react-icons/bs";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { MdRestartAlt } from "react-icons/md";
import ClockIcon from "@/app/assets/icons/clock-icon.svg";
import { useDirection } from "@/app/hooks/useGetDirection";


interface OfflineQuestionProps {
    questionType?: "audio" | "video" | "image" | "list";
    question: offlineQuestionsListInterface | null;
    handleScreenChange: (action: string) => void;
}

export default function OfflineQuestion({ question, handleScreenChange }: OfflineQuestionProps) {
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

    return (
        <div className="flex items-center justify-center">
            <div className="w-full lg:max-w-5xl">
                <div className="border border-dark-orange">
                    {/* Question Header */}
                    <div className="bg-dark-orange text-white text-center py-2 flex items-center justify-center gap-2">
                        <BsQuestionCircle className="text-2xl" />
                        <span className="text-lg">{question?.text}</span>
                    </div>

                    {/* Options (audio/video/list) */}
                    <div className="flex flex-col items-center justify-center py-4 gap-2 h-[400px]">
                        {question?.mediaType === "audio" && (
                            <audio controls src={question?.mediaUrl} className="w-56" />
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
                    <div className="flex sm:h-12 px-2 md:px-5 py-1 sm:py-2 pt-2 sm:pt-4 items-center justify-between text-white bg-dark-orange font-popfun">
                        <span className="md:text-4xl text-xl sm:text-3xl">{question?.category.toUpperCase()}</span>
                        <span className="md:text-2xl text-base sm:text-xl ml-2 md:ml-10 uppercase">{question?.points} t{("points")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Timer */}
                        <div className="-skew-x-12 bg-white border border-dark-orange sm:h-12 h-10 text-white flex gap-2 md:gap-5 items-center w-20 sm:w-24  md:w-32">
                            <span className=" text-lg bg-dark-orange w-8 sm:w-10 h-full flex-center"><ClockIcon className="w-4 h-4 sm:w-6 sm:h-6" /></span>
                            <span className="font-popfun text-xl sm:text-2xl md:text-3xl text-black mt-2">{timer < 10 ? `00:0${timer}` : `00:${timer}`}</span>
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
                    <div
                        role="button"
                        onClick={() => handleScreenChange("answer")}
                        className={`w-full sm:w-auto cursor-pointer sm:h-12 flex px-2 md:px-5 py-1 sm:py-2 pt-2 ${direction === "ltr" && "sm:pt-4"} items-center justify-center  text-white bg-dark-green font-popfun border-2 border-black`}>
                        <span className="md:text-4xl text-xl sm:text-3xl">{t("seeAnswer")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

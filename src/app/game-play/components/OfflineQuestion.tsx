import React, { useState, useRef } from "react";
import Image from "next/image";
//icon
import { BsQuestionCircle } from "react-icons/bs";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { MdRestartAlt } from "react-icons/md";
import ClockIcon from "@/app/assets/icons/clock-icon.svg";
import Book from "@/app/assets/images/book.png";

const OPTIONS = [
    { type: "audio", label: "Audio", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { type: "video", label: "Video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { type: "image", label: "Image", src: Book },
    { type: "list", label: "Beach", value: "beach" },
    { type: "list", label: "Wrestling", value: "wrestling" },
    { type: "list", label: "Summer", value: "summer" },
];

interface OfflineQuestionProps {
    questionType?: "audio" | "video" | "image" | "list";
    points?: number;
    handleScreenChange: (action: string) => void;
    handleModeChange: (action: string) => void;
}

export default function OfflineQuestion({ questionType = "image", points = 400, handleScreenChange, handleModeChange }: OfflineQuestionProps) {
    const [timer, setTimer] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
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
                        <span className="text-lg">Name the event ?</span>
                    </div>

                    {/* Options (audio/video/list) */}
                    <div className="flex flex-col items-center justify-center py-4 gap-2 h-[400px]">
                        {questionType === "audio" &&
                            <audio controls src={OPTIONS?.find(o => o.type === "audio")?.src ?? ""} className="w-56" />
                        }
                        {questionType === "video" &&
                            <video
                                src={OPTIONS?.find(o => o.type === "video")?.src ?? ""}
                                controls
                                controlsList="nodownload noremoteplayback"
                                disablePictureInPicture
                                className="w-full h-full object-contain"
                            ></video>
                        }
                        {questionType === "image" &&
                            <Image src={OPTIONS?.find(o => o.type === "image")?.src ?? ""} width={100} height={100} alt="" className="w-full h-full object-contain" />
                        }
                    </div>
                </div>
                {/* Bottom bar */}
                <div className="flex items-center justify-between py-2 rounded-b-lg flex-wrap gap-y-4">
                    <div className="flex sm:h-12 px-2 md:px-5 py-1 sm:py-2 pt-2 sm:pt-4 items-center justify-between text-white bg-dark-orange font-popfun">
                        <span className="md:text-4xl text-xl sm:text-3xl">WRESTLING</span>
                        <span className="md:text-2xl text-base sm:text-xl ml-2 md:ml-10">{points} POINTS</span>
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
                        onClick={() => { handleScreenChange("answer"); handleModeChange("offline") }}
                        // style={{ clipPath: "polygon(8% 0, 100% 0%, 100% 97%, 0% 100%)" }}
                        className="w-full sm:w-auto -cursor-pointer sm:h-12 flex px-2 md:px-5 py-1 sm:py-2 pt-2 sm:pt-4 items-center justify-center  text-white bg-dark-green font-popfun border-2 border-black">
                        <span className="md:text-4xl text-xl sm:text-3xl">See Answer</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

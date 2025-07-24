import React, { useState, useRef } from "react";
//icon
import { BsQuestionCircle } from "react-icons/bs";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { MdRestartAlt } from "react-icons/md";
import ClockIcon from "@/app/assets/icons/clock-icon.svg";

const OPTIONS = [
    { type: "audio", label: "Audio", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { type: "video", label: "Video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { type: "image", label: "Image", src: "data:image/jpeg;base64,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" },
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

export default function OfflineQuestion({ questionType = "video", points = 400, handleScreenChange, handleModeChange }: OfflineQuestionProps) {
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
                            <img src={OPTIONS?.find(o => o.type === "image")?.src ?? ""} className="w-full h-full object-contain" />
                        }
                    </div>
                </div>
                {/* Bottom bar */}
                <div className="flex items-center justify-between py-2 rounded-b-lg wrap gap-y-4">
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

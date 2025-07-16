import React from "react";
//icon
import { BsQuestionCircle } from "react-icons/bs";

const OPTIONS = [
    { type: "audio", label: "Audio", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { type: "video", label: "Video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { type: "image", label: "Image", src: "https://picsum.photos/800/400" },
    { type: "list", label: "Beach", value: "beach" },
    { type: "list", label: "Wrestling", value: "wrestling" },
    { type: "list", label: "Summer", value: "summer" },
];

export default function AnswerEvnet({ answerType = "image", onClick }: any) {

    return (
        <div className="flex items-center justify-center">
            <div className="w-[800px] ">
                <div className="border border-dark-orange">
                    {/* Question Header */}
                    <div className="bg-dark-orange text-white text-center py-2 flex items-center justify-center gap-2">
                        <BsQuestionCircle className="text-2xl" />
                        <span className="text-lg">Holly Wood</span>
                    </div>

                    {/* Options (audio/video/list) */}
                    <div className="flex flex-col items-center justify-center py-4 gap-2 h-[400px]">
                        {answerType === "audio" &&
                            <audio controls src={OPTIONS?.find(o => o.type === "audio")?.src ?? ""} className="w-56" />
                        }
                        {answerType === "video" &&
                            <video
                                src={OPTIONS?.find(o => o.type === "video")?.src ?? ""}
                                controls
                                controlsList="nodownload noremoteplayback"
                                disablePictureInPicture
                                className="w-full h-full object-contain"
                            ></video>
                        }
                        {answerType === "image" &&
                            <img src={OPTIONS?.find(o => o.type === "image")?.src ?? ""} className="w-full h-full object-contain" />
                        }
                    </div>
                </div>
                {/* Bottom bar */}
                <div className="flex items-center justify-between py-2 rounded-b-lg" >
                    <div
                        role="button"
                        onClick={() => onClick("whoAnswered")}
                        style={{ clipPath: "polygon(0 0, 92% 0%, 100% 100%, 0% 100%)" }}
                        className="flex h-12 px-2 md:px-5 py-2 pt-4 items-center justify-between text-white bg-dark-orange font-popfun">
                        <span className="md:text-4xl text-3xl tracking-wider">who answered </span>
                    </div>
                    <div
                        role="button"
                        onClick={() => onClick("question")}
                        style={{ clipPath: "polygon(8% 0, 100% 0%, 100% 100%, 0% 100%)" }}
                        className="cursor-pointer flex h-12 px-5 py-2 pt-4 items-center justify-between text-white bg-red font-popfun">
                        <span className="md:text-3xl text-2xl tracking-wider">back to question</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
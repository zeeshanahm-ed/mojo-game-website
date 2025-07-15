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

export default function WhoAnsweredEvent({ answerType = "image", points = 400, onClick }: any) {

    return (
        <div className="flex items-center justify-center">
            <div className="w-full flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl mb-2">Who answered correctly ?</h2>
                <p className="md:text-xl text-base text-light-gray">( select one option )</p>
                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row w-full items-center justify-center py-2 rounded-b-lg gap-5 md:gap-10 my-5 md:my-10" >
                    <div
                        role="button"
                        onClick={() => onClick("whoAnswered")}
                        className="flex h-16 md:h-20 w-3/4 sm:w-1/2 md:w-64 px-2 md:px-5 py-2 pt-4 items-center justify-center text-white bg-red font-popfun border-2 border-black ">
                        <span className="md:text-6xl text-4xl tracking-wider">H1 Team</span>
                    </div>
                    <div
                        role="button"
                        onClick={() => onClick("question")}
                        className="cursor-pointer flex h-16 md:h-20 w-3/4 sm:w-1/2 md:w-64 px-5 py-2 pt-4 items-center justify-center text-white bg-blue font-popfun border-2 border-black ">
                        <span className="md:text-6xl text-4xl tracking-wider">H2 Team</span>
                    </div>
                </div>
                <div
                    role="button"
                    onClick={() => onClick("question")}
                    className="cursor-pointer flex h-16 md:h-20 w-3/4 sm:w-1/2 md:w-64 px-5 py-2 pt-4 items-center justify-center text-black bg-white border-2 border-black font-popfun">
                    <span className="md:text-6xl text-4xl tracking-wider">no one</span>
                </div>
            </div>
        </div>
    );
}
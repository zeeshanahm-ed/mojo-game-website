import React, { useState, useRef } from "react";
//icon
import { BsQuestionCircle } from "react-icons/bs";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { MdRestartAlt } from "react-icons/md";
import ClockIcon from "@/app/assets/icons/clock-icon.svg";
import Button from "@/app/components/ui/common/Button";

interface OnlineQuestionProps {
    // questionType?: "audio" | "video" | "image" | "list";
    points?: number;
    handleScreenChange: (action: string) => void;
    handleModeChange: (action: string) => void;
}

export default function OnlineQuestion({ points = 400, handleScreenChange, handleModeChange }: OnlineQuestionProps) {
    const [timer, setTimer] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // const [player1Answer, setPlayer1Answer] = useState<string | null>(null);
    // const [player2Answer, setPlayer2Answer] = useState<string | null>(null);
    // const [currentPlayer, setCurrentPlayer] = useState<'player1' | 'player2'>('player1');

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

    const Options = [
        { option: 1, label: "John Cena John Cena John Cena " },
        { option: 2, label: "The Rock" },
        { option: 3, label: "New Way John Cena John Cena" },
        { option: 4, label: "Hulk Hogan" },
        { option: 5, label: "Ric Flair John Cena" },
        { option: 6, label: "Undertaker Undertaker Undertaker" },
    ];

    // const handleAnswer = (option: string) => {
    //     if (currentPlayer === 'player1') {
    //         setPlayer1Answer(option);
    //         setCurrentPlayer('player2'); // switch turn
    //     } else {
    //         setPlayer2Answer(option);
    //     }
    // };
    // const isAnswerButtonEnabled = player1Answer !== null && player2Answer !== null;

    return (
        <div className="flex items-center justify-center">
            <div className="w-full lg:max-w-5xl">
                <div className="">
                    {/* Question Header */}
                    <div className="bg-black text-white text-start py-2 px-2 flex items-center justify-center gap-2">
                        <BsQuestionCircle className="text-2xl" />
                        <span className="text-base md:text-lg">Who has most championship wins in wrestling ?</span>
                    </div>

                    {/* Options (list) */}
                    <div className="grid grid-cols-2 md:grid-cols-3 items-center justify-center py-4 gap-10 h-[400px]">
                        {Options.map((option) => (
                            <div key={option.option} className="flex items-center w-full">
                                <span className="text-xl sm:text-2xl md:text-3xl font-popfun">{option.option}.</span>
                                <Button
                                    className="w-full text-xl !pt-1 !md:pt-2 ml-2 md:ml-5 sm:text-3xl !px-1 sm:!px-4 !border md:!border-2"
                                    bgClass="bg-white"
                                    textClass="text-black"
                                    // onClick={() => handleAnswer(option.label)}
                                    // disabled={
                                    //     (currentPlayer === 'player1' && player1Answer !== null) ||
                                    //     (currentPlayer === 'player2' && player2Answer !== null)
                                    // }
                                    boxShadow={false}>
                                    {option.label}
                                </Button>
                            </div>
                        ))}
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
                        onClick={() => { handleScreenChange("answer"); handleModeChange("online") }}
                        // style={{ clipPath: "polygon(8% 0, 100% 0%, 100% 97%, 0% 100%)" }}
                        className="w-full sm:w-auto -cursor-pointer sm:h-12 flex px-2 md:px-5 py-1 sm:py-2 pt-2 sm:pt-4 items-center justify-center  text-white bg-dark-green font-popfun border-2 border-black">
                        <span className="md:text-4xl text-xl sm:text-3xl">See Answer</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
import React from "react";
//icon
import { BsQuestionCircle } from "react-icons/bs";
import { useTranslation } from "react-i18next";

interface OnlineQuestionProps {
    // questionType?: "audio" | "video" | "image" | "list";
    points?: number;
    handleScreenChange: (action: string) => void;
    setCurrentLifelineType: (v: string) => void;
}

export default function OnlineQuestion({ points = 400, handleScreenChange, setCurrentLifelineType }: OnlineQuestionProps) {
    const { t } = useTranslation();

    // const [player1Answer, setPlayer1Answer] = useState<string | null>(null);
    // const [player2Answer, setPlayer2Answer] = useState<string | null>(null);
    // const [currentPlayer, setCurrentPlayer] = useState<'player1' | 'player2'>('player1');


    const Options = [
        { option: 1, label: "John Cena John Cena John Cena " },
        { option: 2, label: "The Rock" },
        { option: 3, label: "New Way John Cena John Cena" },
        { option: 4, label: "Hulk Hogan" },
    ];

    // const handleAnswer = (option: string) => {
    //     if (currentPlayer === 'player1') {
    //         setPlayer1Answer(option);
    //         setCurrentPlayer('player2');
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
                    <div className="bg-black text-white text-start py-2 px-2 flex items-center justify-center gap-5">
                        <BsQuestionCircle className="text-2xl" />
                        <span className="text-base md:text-lg font-secondary">Who has most championship wins in wrestling ?</span>
                    </div>

                    {/* Options (list) */}
                    <div className="grid grid-cols-2 md:grid-cols-2 items-center justify-center py-4 gap-10 h-[400px]">
                        {Options.map((option) => (
                            <div key={option.option} className="flex items-center w-full">
                                <span className="text-xl sm:text-2xl md:text-3xl ">{option.option}.</span>
                                <button
                                    className="-skew-x-12 w-full text-xl pt-1 md:pt-2 ml-2 md:ml-5 sm:text-3xl px-1 sm:px-4 border md:border-2 border-black"
                                // onClick={() => handleAnswer(option.label)}
                                // disabled={
                                //     (currentPlayer === 'player1' && player1Answer !== null) ||
                                //     (currentPlayer === 'player2' && player2Answer !== null)
                                // }
                                >
                                    {option.label}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Bottom bar */}
                <div className="flex items-center justify-between py-2 rounded-b-lg gap-y-4">
                    <div className="flex sm:h-12 px-2 md:px-5 py-1 sm:py-2 pt-2 sm:pt-4 items-center justify-between text-white bg-dark-orange ">
                        <span className="md:text-4xl text-2xl sm:text-3xl">WRESTLING</span>
                        <span className="md:text-2xl text-xl ml-2 md:ml-10">{points} {t("points")}</span>
                    </div>
                    <button
                        role="button"
                        onClick={() => {
                            setCurrentLifelineType("");
                            handleScreenChange("answer");
                        }}
                        className="w-fit -cursor-pointer sm:h-12 flex px-5 pt-1 items-center justify-center  text-white bg-dark-green  border-2 border-black">
                        <span className="md:text-4xl text-2xl sm:text-3xl">{t("seeAnswer")}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
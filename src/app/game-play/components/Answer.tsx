import Button from "@/app/components/ui/common/Button";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDirection } from "@/app/hooks/useGetDirection";
//icon
import { BsQuestionCircle } from "react-icons/bs";

interface AnswerProps {
    question: any | null;
    mode: string;
    answerType: "list" | "image";
    handleScreenChange: (screen: string) => void;
}

const Options = [
    { option: 1, label: "John Cena" },
]

export default function Answer({ answerType = "image", handleScreenChange, mode, question }: AnswerProps) {
    const { t } = useTranslation();
    const direction = useDirection();

    return (
        <div className="flex items-center justify-center">
            <div className="w-[800px] ">
                <div className={`border ${answerType === "list" ? "border-black" : "border-dark-orange"}border-dark-orange`}>
                    {/* Question Header */}
                    <div className={`${answerType === "list" ? "bg-black" : "bg-dark-orange"} text-white text-start py-2 px-2 flex items-center justify-center gap-2`}>
                        <BsQuestionCircle className="text-2xl" />
                        <span className="text-base md:text-lg font-secondary">{question?.answerExplanation}</span>
                    </div>

                    {/* Options (audio/video/list) */}
                    <div className="flex flex-col items-center justify-center py-4 gap-2 h-[400px]">
                        {true &&
                            <Image src={question?.answerMediaUrl || ""} alt="book" width={100} height={100} className="w-full h-full object-contain" />
                        }
                        {answerType === "list" &&
                            <div className="grid grid-cols-1 items-center justify-center py-4 gap-2 h-[400px]">
                                {Options.map((option) => (
                                    <div key={option.option} className="flex items-center justify-center w-full">
                                        <Button
                                            className="text-xl ml-5 sm:text-5xl !px-1 sm:!px-4 !border md:!border-2"
                                            bgClass="bg-white"
                                            textClass="text-black"
                                            boxShadow={false}>
                                            {option.label}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        }

                    </div>
                </div>
                {/* Bottom bar */}
                <div className="flex items-center justify-between py-2 rounded-b-lg" >
                    <button
                        role="button"
                        onClick={() => handleScreenChange("whoAnswered")}
                        className={`${direction === "rtl" ? "text-2xl " : "sm:pt-4 md:text-4xl text-3xl "} border-2 border-black flex h-12 px-2 md:px-5 py-2 items-center justify-between text-white bg-dark-orange `}>
                        {t("whoAnswered")}
                    </button>
                    <button
                        role="button"
                        onClick={() => handleScreenChange(mode === "online" ? "onlineQuestion" : "offlineQuestion")}
                        className={`${direction === "rtl" ? "text-2xl " : "sm:pt-4 md:text-3xl text-2xl "} border-2 border-black cursor-pointer flex h-12 px-5 py-2  items-center justify-between text-white bg-red `}>
                        {t("backToQuestion")}
                    </button>
                </div>
            </div>
        </div>
    );
}
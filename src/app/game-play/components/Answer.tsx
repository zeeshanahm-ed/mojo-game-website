import Button from "@/app/components/ui/common/Button";
import Image from "next/image";
import React from "react";
import { offlineQuestionsListInterface } from "@/app/constants/constant";
import { useTranslation } from "react-i18next";
//icon
import { BsQuestionCircle } from "react-icons/bs";
import Book from "@/app/assets/images/book.png";
import { useDirection } from "@/app/hooks/useGetDirection";

interface AnswerProps {
    question: offlineQuestionsListInterface | null;
    mode: string | undefined;
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
                        <span className="text-base md:text-lg">{question?.text}</span>
                    </div>

                    {/* Options (audio/video/list) */}
                    <div className="flex flex-col items-center justify-center py-4 gap-2 h-[400px]">
                        {answerType === "image" &&
                            <Image src={Book?.src ?? ""} alt="" width={100} height={100} className="w-full h-full object-contain" />
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
                        style={{ clipPath: "polygon(0 0, 92% 0%, 100% 100%, 0% 100%)" }}
                        className={`${direction === "ltr" && "sm:pt-4"} flex h-12 px-2 md:px-5 py-2 items-center justify-between text-white bg-dark-orange font-popfun`}>
                        <span className="md:text-4xl text-3xl tracking-wider">{t("whoAnswered")} </span>
                    </button>
                    <button
                        role="button"
                        onClick={() => handleScreenChange(mode === "online" ? "onlineQuestion" : "offlineQuestion")}
                        style={{ clipPath: "polygon(8% 0, 100% 0%, 100% 100%, 0% 100%)" }}
                        className={`${direction === "ltr" && "sm:pt-4"} cursor-pointer flex h-12 px-5 py-2  items-center justify-between text-white bg-red font-popfun`}>
                        <span className="md:text-3xl text-2xl tracking-wider">{t("backToQuestion")}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
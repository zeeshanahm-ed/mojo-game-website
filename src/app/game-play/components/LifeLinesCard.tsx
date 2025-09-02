import React from "react";
import { useTranslation } from "react-i18next";
import Button from "@/app/components/ui/common/Button";

type LifelineProps = {
    title: string;
    description: string;
    bgColor: string;
    textColor: string;
    icon: React.ReactNode;
    onYes: () => void;
    onNo: () => void;
};

const LifelineCard: React.FC<LifelineProps> = ({
    title,
    description,
    bgColor,
    textColor,
    icon,
    onYes,
    onNo,
}) => {
    const { t } = useTranslation();
    return (
        <div className="w-80 border-4 border-dark-gray h-[510px] rounded-none">
            <div className="card-body items-center text-center">
                <h2 className="font-secondary text-2xl">{t("lifeLines")}</h2>
                <div className="divider h-1 before:bg-light-gray after:bg-light-gray m-0"></div>
                <div className="my-5">{icon}</div>
                <h3 className={`text-5xl ${textColor} uppercase`}>
                    {t(title)}
                </h3>
                <p className="text-sm text-gray-600 font-secondary">{t(description)}</p>
                <div className="mt-4 flex flex-col items-center gap-2 w-full">
                    <Button
                        bgClass={bgColor}
                        className={`w-32 text-3xl`}
                        onClick={onYes}
                    >
                        {t("yes")}
                    </Button>
                    <Button
                        bgClass={bgColor}
                        className={`w-32 text-3xl`}
                        onClick={onNo}
                    >
                        {t("no")}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LifelineCard;
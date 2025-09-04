import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useDirection } from '@/app/hooks/useGetDirection';

interface Props {
    showTime: boolean;
}

function Timer({ showTime }: Props) {
    const { t } = useTranslation();
    const [timer, setTimer] = useState(20);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const direction = useDirection();
    useEffect(() => {
        if (!showTime) return;
        if (timer === 0) {
            setTimer(0)
        } else {
            timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [timer, showTime]);
    return (
        <div className='flex items-center flex-col gap-2 justify-center'>
            <div className='flex items-center gap-2 justify-center'>
                <div className="-skew-x-12 bg-white border border-dark-orange sm:h-12 h-10 text-white flex gap-2 items-center w-20 sm:w-24  md:w-32">
                    <span className=" text-lg bg-dark-orange w-8 sm:w-10 h-full flex-center">
                        <Image src="/images/icons/clock-icon.svg" alt='clock-icon' width={24} height={24} className="w-4 h-4 sm:w-6 sm:h-6" />
                    </span>
                    <span className={`text-black ${direction === "rtl" ? "text-xl  mt-1" : "text-2xl sm:text-3xl md:text-4xl  mt-2"}`}>{timer < 10 ? `00:0${timer}` : `00:${timer}`}</span>
                </div>
                {/* <div
                    role="button"
                    style={{ clipPath: "polygon(8% 0, 100% 0%, 100% 97%, 0% 100%)" }}
                    className="w-44 cursor-pointer sm:h-12 flex px-2 md:px-5 py-1 sm:py-2 pt-2 sm:pt-4 items-center justify-center text-white bg-orange ">
                    <span className="md:text-4xl text-xl sm:text-3xl">{t("setTime")}</span>
                </div> */}
            </div>
            <p className={`text-base ${direction === "rtl" ? "font-arabic" : "font-secondary"} md:text-lg max-w-3xl tracking-normal mt-5`}>
                {t("refundIfTeamNotJoined")}
            </p>
        </div>
    )
}

export default Timer
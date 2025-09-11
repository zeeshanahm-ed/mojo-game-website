import React, { useEffect, useState } from 'react';

interface TimerProps {
    duration: number; // in seconds
    onComplete?: () => void;
    size?: number;
}

const Timer: React.FC<TimerProps> = ({ duration, onComplete, size = 120 }) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => {
                    if (time <= 1) {
                        setIsActive(false);
                        onComplete?.();
                        return 0;
                    }
                    return time - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isActive, timeLeft, onComplete]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Calculate the progress percentage (0 to 1)
    const progress = (duration - timeLeft) / duration;

    // Calculate the stroke-dasharray for the progress ring
    const circumference = 2 * Math.PI * (size / 2 - 10); // radius = size/2 - stroke width
    const strokeDasharray = `${circumference * progress} ${circumference}`;

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative" style={{ width: size, height: size }}>
                {/* Background circle */}
                <svg
                    width={size}
                    height={size}
                    className="transform -rotate-90"
                >
                    {/* Background ring */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={size / 2 - 10}
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="5"
                        className="opacity-100"
                    />
                    {/* Progress ring */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={size / 2 - 10}
                        fill="none"
                        stroke="#ccc"
                        strokeWidth="5"
                        strokeDasharray={strokeDasharray}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-linear"
                    />
                </svg>

                {/* Time display */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-black font-secondary text-2xl font-bold">
                        {formatTime(timeLeft)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Timer;

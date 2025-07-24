"use client"
import React, { useState } from 'react';
import Wrapper from '@/app/components/ui/common/Wrapper';
import Banner from './components/Banner';

//icons
import ScienceBookIcon from "@/app/assets/icons/science-book.svg";
import EnglishBookIcon from "@/app/assets/icons/english-book.svg";
import MathBookIcon from "@/app/assets/icons/math-book.svg";
import ArabicBookIcon from "@/app/assets/icons/arabic-book.svg";
import IslamicBookIcon from "@/app/assets/icons/islamic-education-book.svg";
import SubjectGames from './components/SubjectGames';
import { scrollToTop } from '../helpers/helpers-functions';

interface state {
    academicLevel: number | null;
    selectedSemester: number | null;
    selectedSubject: string;
}

const AcademicLavelOptions = [
    { label: 6 }, { label: 7 }, { label: 8 }, { label: 9 }, { label: 10 }, { label: 11 }, { label: 12 }
];
const SemesterOptions = [
    { label: 1 }, { label: 2 }
];
const SubjectOptions = [
    { label: "Science", icon: <ScienceBookIcon className="w-14 h-1/2 mb-8 md:w-20" /> },
    { label: "English", icon: <EnglishBookIcon className="w-14 h-1/2 mb-8 md:w-20" /> },
    { label: "Mathematics", icon: <MathBookIcon className="w-14 h-1/2 mb-8 md:w-20" /> },
    { label: "Arabic", icon: <ArabicBookIcon className="w-14 h-1/2 mb-8 sm:w-20" /> },
    { label: "Islamic Education", icon: <IslamicBookIcon className="w-14 h-1/2 mb-8 md:w-20" /> },
];

function Students() {
    const [state, setState] = useState<state>({
        academicLevel: null,
        selectedSemester: null,
        selectedSubject: "",
    });

    const handleClick = (type: 'academicLevel' | 'selectedSemester' | 'selectedSubject', value: string | number) => {
        setState((prev) => ({
            ...prev,
            [type]: prev[type] === value ? "" : value
        }));

        if (type === "selectedSubject") scrollToTop();
    };

    const handleClearState = () => {
        setState({
            academicLevel: null,
            selectedSemester: null,
            selectedSubject: "",
        })
    }

    return (
        <section>
            <Banner title={state?.selectedSubject || "Students"} isSubject={!!state?.selectedSubject} clearState={handleClearState} />
            <Wrapper>
                <div className='flex items-center justify-center flex-col h-auto pb-32 px-4 md:px-10'>
                    {!state.selectedSubject ?
                        <>
                            {/* Academic Level */}
                            <div className="text-center flex flex-col items-center justify-center mt-10">
                                <h2 className="md:text-7xl text-5xl font-popfun text-black mb-2 uppercase">Choose your academic level</h2>
                                <p className="text-sm sm:text-base md:text-lg text-black">You can choose a study stage from the following stages.</p>
                                <div className='font-popfun gap-y-10 gap-x-5 md:gap-x-10 mt-20 flex items-center justify-center flex-wrap'>
                                    {AcademicLavelOptions.map((v) => (
                                        <CustomCard
                                            key={v.label}
                                            label={v.label}
                                            showBottom={false}
                                            selected={state.academicLevel === v.label}
                                            onClick={() => handleClick('academicLevel', v.label)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Semester */}
                            <div className="text-center flex flex-col items-center justify-center mt-20">
                                <h2 className="md:text-7xl text-5xl font-popfun text-black mb-2 uppercase">Select the semester</h2>
                                <div className='font-popfun gap-10 mt-10 flex items-center justify-center flex-wrap'>
                                    {SemesterOptions.map((v) => (
                                        <CustomCard
                                            key={v.label}
                                            label={v.label}
                                            showBottom={true}
                                            selected={state.selectedSemester === v.label}
                                            onClick={() => handleClick('selectedSemester', v.label)}
                                        // disabled={!state.academicLevel}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="text-center flex flex-col items-center justify-center mt-20">
                                <h2 className="md:text-7xl text-5xl font-popfun text-black mb-2 uppercase">Select the subject</h2>
                                <p className="text-sm sm:text-base md:text-lg text-black">You can choose the study subject from the following subjects.</p>
                                <div className='font-popfun gap-10 mt-10 flex items-center justify-center flex-wrap'>
                                    {SubjectOptions.map((v) => (
                                        <CustomCard
                                            key={v.label}
                                            label={v.label}
                                            icon={v.icon}
                                            showBottom={true}
                                            selected={state.selectedSubject === v.label}
                                            onClick={() => handleClick('selectedSubject', v.label)}
                                        // disabled={!state.selectedSemester}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <SubjectGames />
                        </>
                    }
                </div>
            </Wrapper>
        </section>
    )
}

export default Students;

interface CustomCardProps {
    label: number | string;
    icon?: React.ReactNode;
    showBottom: boolean;
    selected?: boolean;
    onClick?: () => void;
    disabled?: boolean;
}

const CustomCard = ({ label, icon, showBottom, selected, onClick, disabled }: CustomCardProps) => {
    const baseClasses = `cursor-pointer ${showBottom ? "w-32 h-32" : "w-24 h-24"} sm:w-32 sm:h-32 md:w-44 md:h-44 border-4 skew-custom flex-center text-dark-orange relative`;
    const selectedColor = selected ? 'border-red text-red' : 'border-dark-orange text-dark-orange';
    const disabledClass = disabled ? 'opacity-50 pointer-events-none' : '';

    return (
        <div
            className={`${baseClasses} ${selectedColor} ${disabledClass}`}
            onClick={onClick}
        >
            {icon ? <div>{icon}</div> : <span className={`text-6xl md:text-8xl ${showBottom ? "mb-5" : "mb-0 mt-2"}`}>{label}</span>}
            {showBottom && <span className={`absolute bottom-0 ${selected ? "bg-red" : "bg-dark-orange"} w-full text-white pt-1 sm:pt-2 text-2xl`}>{icon ? label : `Chapter ${label}`}</span>}

        </div>
    )
};
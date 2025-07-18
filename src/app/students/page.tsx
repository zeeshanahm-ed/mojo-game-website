"use client"
import React, { useState } from 'react'
import Wrapper from '@/app/components/ui/common/Wrapper';
import Button from '@/app/components/ui/common/Button';
import { useRouter } from 'next/navigation';

//icons

import StudentsBannerImage from '@/app/assets/images/students-banner.png';
import Image from 'next/image';
import Banner from './components/Banner';


const AcademicLavelOptions = [
    { label: 6 },
    { label: 7 },
    { label: 8 },
    { label: 9 },
    { label: 10 },
    { label: 11 },
    { label: 12 }
]
const SemesterOptions = [
    { label: 1 },
    { label: 2 },
]

function Students() {

    return (
        <section>
            <Banner />
            <Wrapper>
                <div className='flex items-center justify-center flex-col h-auto pb-32 px-4 md:px-10'>
                    <div className="text-center flex flex-col items-center justify-center mt-10">
                        <h2 className="md:text-7xl text-5xl font-popfun text-black mb-2 uppercase">
                            Choose your academic level
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-black">
                            You can choose a study stage from the following stages.
                        </p>
                        <div className='font-popfun gap-10 mt-20 flex items-center justify-center flex-wrap'>
                            {AcademicLavelOptions.map((v) => {
                                return (
                                    <div key={v.label}>
                                        <CustomCard label={v.label} showBottom={false} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="text-center flex flex-col items-center justify-center mt-20">
                        <h2 className="md:text-7xl text-5xl font-popfun text-black mb-2 uppercase">
                            Select the semester
                        </h2>
                        <div className='font-popfun gap-10 mt-10 flex items-center justify-center flex-wrap'>
                            {SemesterOptions.map((v) => {
                                return (
                                    <div key={v.label}>
                                        <CustomCard label={v.label} showBottom={true} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="text-center flex flex-col items-center justify-center mt-20">
                        <h2 className="md:text-7xl text-5xl font-popfun text-black mb-2 uppercase">
                            Select the subject
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-black">
                            You can choose the study subject from the following subjects.
                        </p>
                        <div className='font-popfun gap-10 mt-10 flex items-center justify-center flex-wrap'>
                            {SemesterOptions.map((v) => {
                                return (
                                    <div key={v.label}>
                                        <CustomCard label={v.label} showBottom={true} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Wrapper>
        </section >
    )
}

export default Students;

interface CustomCardProps {
    label: number;
    showBottom: boolean
}

const CustomCard = ({ label, showBottom }: CustomCardProps) => {
    return (
        <div className='cursor-pointer w-44 h-44 border-4 skew-custom  border-dark-orange flex-center text-dark-orange'>
            <span className='text-8xl'>{label}</span>
            {showBottom && <span className='absolute bottom-0 bg-dark-orange w-full text-white py-2 text-2xl'>Chapter {label}</span>}
        </div>
    )
}
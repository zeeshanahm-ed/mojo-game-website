"use client"
import React from 'react'
import Image from 'next/image';
import CreateGameModal from '@/app/components/modals/create-game-modal';
import Wrapper from '../common/Wrapper';
import { useCreateGameModalStore } from '@/app/store/useCreateGameModalStore';
import Button from '../common/Button';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/app/hooks/useGetDirection';

//icons
import GroupNPerson from "@/app/assets/images/group-image.png";
import GroupNPersonArabic from "@/app/assets/images/Group-image-arabi.png";

const KnowledgeSection = () => {
    const { openModal } = useCreateGameModalStore();
    const { t } = useTranslation();
    const direction = useDirection();

    const handleOPenModal = () => {
        openModal();
    }


    return (
        <section className="w-full overflow-hidden md:px-10 px-4">
            <Wrapper>
                <div className='flex items-center justify-center flex-col'>
                    <div className="text-center flex flex-col items-center justify-center">
                        <h2 className="text-6xl md:text-7xl lg:text-8xl font-popfun text-black mb-2 uppercase">
                            {t("testKnowledge")}
                        </h2>
                        <p className="text-sm md:text-base xl:text-xl text-black max-w-xl">
                            {t("playingModeseDescription")}
                        </p>
                        <Button className='my-10 w-44 md:w-64 lg:w-72 text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase font-popfun' onClick={() => handleOPenModal()}>
                            {t("createGame")}
                        </Button>
                    </div>
                    <div className='my-10'>
                        <Image src={direction === "rtl" ? GroupNPersonArabic : GroupNPerson} alt='Person Image' className='h-1/2 w-[400px] md:w-[800px]' />
                    </div>
                </div>
            </Wrapper>
            <CreateGameModal />
        </section>
    )
}

export default KnowledgeSection;
"use client"
import React from 'react'
import Image from 'next/image';
import CreateGameModal from '@/app/components/modals/create-game-modal';
import Wrapper from '../common/Wrapper';
import { useCreateGameModalStore } from '@/app/store/useCreateGameModalStore';
import Button from '../common/Button';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/app/hooks/useGetDirection';

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
                        <h2 className="text-6xl md:text-7xl text-black mb-2 uppercase">
                            {t("testKnowledge")}
                        </h2>
                        <p className="text-sm font-secondary md:text-base  text-black max-w-xl">
                            {t("playingModeseDescription")}
                        </p>
                        <Button className='my-10 w-44 md:w-64 lg:w-72 text-2xl sm:text-3xl md:text-4xl ' onClick={() => handleOPenModal()}>
                            {t("createGame")}
                        </Button>
                    </div>
                    <div className='my-10'>
                        <Image src={direction === "rtl" ? "/images/Group-image-arabi.png" : "/images/group-image.png"} width={100} height={100} alt='Person Image' className='h-auto w-[400px] md:w-[500px]' />
                    </div>
                </div>
            </Wrapper>
            <CreateGameModal />
        </section>
    )
}

export default KnowledgeSection;
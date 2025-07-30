"use client"
import React from 'react'
import Image from 'next/image';
import CreateGameModal from '@/app/components/modals/create-game-modal';
import Wrapper from '../common/Wrapper';

//icons
import GroupNPerson from "@/app/assets/images/group-image.png"
import { useCreateGameModalStore } from '@/app/store/useCreateGameModalStore';
import Button from '../common/Button';

const KnowledgeSection = () => {
    const { openModal } = useCreateGameModalStore();

    const handleOPenModal = () => {
        openModal();
    }


    return (
        <section className="w-full overflow-hidden md:px-10 px-4">
            <Wrapper>
                <div className='flex items-center justify-center flex-col'>
                    <div className="text-center flex flex-col items-center justify-center">
                        <h2 className="text-6xl md:text-7xl lg:text-8xl font-popfun text-black mb-2 uppercase">
                            Test Your Knowledge
                        </h2>
                        <p className="text-sm md:text-base xl:text-xl text-black max-w-xl">
                            It is a fun cultural game suitable for all ages, testing your group`s knowledge. The game includes all types of questions according to the selected category.
                        </p>
                        <Button className='my-10 w-44 md:w-64 lg:w-72 text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase font-popfun' onClick={() => handleOPenModal()}>
                            Create a game
                        </Button>
                    </div>
                    <div className='my-10'>
                        <Image src={GroupNPerson} alt='Person Image' className='h-1/2 w-[400px] md:w-[800px]' />
                    </div>
                </div>
            </Wrapper>
            <CreateGameModal />
        </section>
    )
}

export default KnowledgeSection;
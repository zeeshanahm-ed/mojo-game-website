"use client"
import React from 'react'
import Button from '@/app/components/ui/common/Button';
import Image from 'next/image';
import CreateGameModal from '@/app/components/modals/create-game-modal';
import Wrapper from '../common/Wrapper';

//icons
import GroupNPerson from "@/app/assets/images/group-image.png"
import { useCreateGameModalStore } from '@/app/store/useCreateGameModalStore';

const KnowledgeSection = () => {
    const { openModal } = useCreateGameModalStore();

    const handleOPenModal = () => {
        console.log("open")
        openModal();
    }

    return (
        <section className="w-full overflow-hidden md:px-10 px-4">
            <Wrapper>
                <div className='flex items-center justify-center flex-col'>
                    <div className="text-center flex flex-col items-center justify-center">
                        <h2 className="text-6xl md:text-7xl lg:text-8xl font-popfun text-black mb-4 uppercase">
                            Test Your Knowledge
                        </h2>
                        <p className="text-sm md:text-base leading-6 text-black max-w-xl">
                            It is a fun cultural game suitable for all ages, testing your group's knowledge. The game includes all types of questions according to the selected category.
                        </p>
                        {/* <Button className='mt-10 px-20 pt-3' onClick={() => handleOPenModal()}>
                            <span className="inline-block transform skew-x-12 tracking-wider text-5xl md:text-6xl uppercase font-popfun" >Create a game</span>
                        </Button> */}
                    </div>
                    <div className='my-10'>
                        <Image src={GroupNPerson} alt='Person Image' />
                    </div>
                </div>
            </Wrapper>
            <CreateGameModal />
        </section>
    )
}

export default KnowledgeSection;
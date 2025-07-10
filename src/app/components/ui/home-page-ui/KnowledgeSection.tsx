import React from 'react'
import Button from '../common/Button';
import Image from 'next/image';

//icons
import GroupNPerson from "../../../assets/images/group-image.png"

const KnowledgeSection = () => {
    return (
        <section className="w-full overflow-hidden px-10">
            <div className='flex items-center justify-center flex-col'>
                <div className="text-center flex flex-col items-center justify-center">
                    <h2 className="lg:text-8xl text-6xl font-popfun text-black mb-4 uppercase">
                        Test Your Knowledge
                    </h2>
                    <p className="text-lg leading-6 text-black max-w-xl">
                        It is a fun cultural game suitable for all ages, testing your group's knowledge. The game includes all types of questions according to the selected category.
                    </p>
                    <Button className='mt-10 px-20 pt-5'>
                        <span className="inline-block transform skew-x-12 tracking-wider text-6xl uppercase font-popfun">Create a game</span>
                    </Button>
                </div>
                <div className='my-10'>
                    <Image src={GroupNPerson} alt='Person Image' />
                </div>
            </div>
        </section>
    )
}

export default KnowledgeSection;
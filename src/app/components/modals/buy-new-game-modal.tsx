import React from 'react'
import { MdClose } from 'react-icons/md';
//icon
import CrownImage from "@/app/assets/images/crown-image.png";
import Image from 'next/image';
import Link from 'next/link';


interface NewGameModalProps {
    open: boolean;
    onClose: () => void;
}

function BuyNewGameModal({ open, onClose }: NewGameModalProps) {

    return (
        <dialog id="buy_a_new_game_modal" className={` modal ${open ? 'modal-open' : ''}`}>
            <div className="modal-box px-0 pb-0 font-primary  bg-white items-center max-w-xl rounded-none border-2 border-black">
                <form method="dialog " className="px-4 md:px-10 flex items-center justify-center relative">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl  uppercase flex flex-row items-center ">
                        Information
                    </h2>
                    <button
                        type="button"
                        className="absolute right-3 -top-0 bg-light-gray focus:outline-none w-5 h-5 md:w-8 md:h-8 flex items-center justify-center rounded-full text-white hover:bg-dark-gray transition-colors duration-300"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <MdClose className='text-base md:text-2xl' />
                    </button>
                </form>
                <div className="divider before:bg-light-gray after:bg-light-gray m-0"></div>
                {/* Main content */}
                <div className="w-full flex flex-col items-center justify-evenly h-[400px]">
                    <div className="md:w-24 w-16 flex items-center justify-center">
                        <Image src={CrownImage} alt='Crown' className='object-contain w-full h-full' />
                    </div>
                    <div className='flex flex-col items-center justify-center font-secondary'>
                        <p >You’re on Free Mode </p>
                        <p >Upgrade to Premium for unlimited games & fun! </p>
                    </div>
                    <Link href='/subscription' onClick={onClose} className='boxShadow-custom bg-purple text-white flex-centered pt-2 w-44 text-4xl px-4 transform font-primary -skew-x-6 md:-skew-x-12 border-2 border-black shadow-lg '>Upgrade</Link>
                </div>
            </div>
        </dialog>
    )
}

export default BuyNewGameModal;
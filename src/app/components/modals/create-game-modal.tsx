import React from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCreateGameModalStore } from '@/app/store/useCreateGameModalStore';
//icons
import OfflineImage from "@/app/assets/images/offlinemode-image.png"
import OnlineImage from "@/app/assets/images/onlinemode-image.png"
import { MdClose } from 'react-icons/md';

function CreateGameModal() {
    const { closeModal } = useCreateGameModalStore();
    const { open } = useCreateGameModalStore();
    const router = useRouter();

    const handleNavigate = (type: string) => {
        if (type === 'online') {
            router.push('/online-play');
        } else if (type === 'offline') {
            router.push('/offline-play');
        }
        closeModal();
    };

    return (
        <dialog id="create_game_modal" className={` modal ${open ? 'modal-open' : ''}`}>
            <div className="max-w-2xl modal-box bg-white items-center">
                <form method="dialog " className="flex items-center justify-center relative">
                    <h2 className="text-7xl font-popfun uppercase">
                        New Game
                    </h2>
                    <button
                        type="button"
                        className="absolute right-2 top-0 bg-light-gray focus:outline-none w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-dark-gray transition-colors duration-300"
                        onClick={closeModal}
                        aria-label="Close"
                    >
                        <MdClose className='text-2xl' />
                    </button>
                </form>
                <div className="divider before:bg-light-gray after:bg-light-gray m-0"></div>
                {/* Playing Mode Cards */}
                <div className="flex items-center w-full justify-between px-10 py-5">
                    <div className="w-64 cursor-pointer skew-custom h-64 bg-green border-[6px] font-popfun border-black flex flex-col items-center justify-center p-6 gap-5"
                        onClick={() => handleNavigate("offline")}>
                        <Image src={OfflineImage} alt='Offline Mode' className='w-28 h-28' />
                        <p className="text-black text-7xl uppercase">
                            offline <span className="text-5xl">play</span>
                        </p>
                    </div>

                    {/* Online Play Card */}
                    <div className="w-64 cursor-pointer h-64 skew-custom bg-yellow font-popfun border-[6px] border-black flex flex-col items-center justify-center p-6 gap-5"
                        onClick={() => handleNavigate("online")}>
                        <Image src={OnlineImage} alt='Online Mode' className='w-28 h-28' />
                        <p className="text-black text-7xl uppercase" >
                            online <span className="text-5xl">play</span>
                        </p>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default CreateGameModal;
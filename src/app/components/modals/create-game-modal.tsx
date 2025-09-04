import React from 'react'
import Image from 'next/image';
import { useCreateGameModalStore } from '@/app/store/useCreateGameModalStore';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/app/hooks/useGetDirection';
import Link from 'next/link';
//icons
import { MdClose } from 'react-icons/md';

function CreateGameModal() {
    const { closeModal } = useCreateGameModalStore();
    const { open } = useCreateGameModalStore();
    const { t } = useTranslation('');
    const direction = useDirection();



    return (
        <dialog id="create_game_modal" className={` modal ${open ? 'modal-open' : ''}`}>
            <div className="max-w-xl modal-box bg-white items-center rounded-none px-0 border-2 border-black">
                <form method="dialog " className="flex items-center justify-center relative">
                    <h2 className="text-5xl md:text-6xl  uppercase">
                        {t("newGame")}
                    </h2>
                    <button
                        type="button"
                        className="absolute right-3 -top-0 bg-light-gray focus:outline-none w-5 h-5 md:w-8 md:h-8 flex items-center justify-center rounded-full text-white hover:bg-dark-gray transition-colors duration-300"
                        onClick={closeModal}
                        aria-label="Close"
                    >
                        <MdClose className='text-base md:text-2xl' />
                    </button>
                </form>
                <div className="divider before:bg-light-gray after:bg-light-gray m-0"></div>
                {/* Playing Mode Cards */}
                <div className="flex flex-row justify-center items-center gap-5 p-5">
                    <Link href="/offline-play" className="w-36 xsm:w-44 sm:w-56 cursor-pointer skew-custom h-44 sm:h-48 bg-green border-[4px] sm:border-[6px]  border-black flex flex-col items-center justify-center px-4 md:px-6 gap-5">
                        <Image src="/images/offlinemode-image.png" width={100} height={100} alt='Offline Mode' className='w-16 md:w-20 h-auto' />
                        {direction === "ltr" ?
                            <p dir={direction} className="text-black text-5xl md:text-6xl xl:text-7xl uppercase flex">
                                Offline
                                <span className="sm:text-4xl text-3xl md:text-4xl xl:text-5xl mt-2 ml-2 md:mt-4">
                                    Play
                                </span>
                            </p>
                            :
                            <p dir={direction} className="text-nowrap text-black text-2xl md:text-3xl uppercase flex">
                                لعب أوفلاين
                            </p>
                        }
                    </Link>

                    {/* Online Play Card */}
                    <Link href="/online-play" className="w-36 xsm:w-44 sm:w-56 cursor-pointer h-44 sm:h-48 skew-custom bg-yellow  border-[4px] sm:border-[6px] border-black flex flex-col items-center justify-center px-4 md:px-6 gap-5">
                        <Image src="/images/onlinemode-image.png" width={100} height={100} alt='Online Mode' className='sm:w-20 w-16 h-auto md:w-20' />
                        {direction === "ltr" ?
                            <p dir={direction} className="text-black text-5xl md:text-6xl xl:text-7xl uppercase flex">
                                Online
                                <span className="sm:text-4xl text-3xl md:text-4xl xl:text-5xl mt-2 ml-2 md:mt-4">
                                    Play
                                </span>
                            </p>
                            :
                            <p dir={direction} className=" text-nowrap text-black text-2xl md:text-3xl uppercase flex">
                                لعب أونلاين
                            </p>
                        }
                    </Link>
                </div>
            </div>
        </dialog>
    )
}

export default CreateGameModal;
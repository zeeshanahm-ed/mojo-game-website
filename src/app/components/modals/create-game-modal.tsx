import React from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCreateGameModalStore } from '@/app/store/useCreateGameModalStore';
import { useTranslation } from 'react-i18next';
//icons
import OfflineImage from "@/app/assets/images/offlinemode-image.png"
import OnlineImage from "@/app/assets/images/onlinemode-image.png"
import { MdClose } from 'react-icons/md';
import { useDirection } from '@/app/hooks/useGetDirection';

function CreateGameModal() {
    const { closeModal } = useCreateGameModalStore();
    const { open } = useCreateGameModalStore();
    const router = useRouter();
    const { t } = useTranslation('');
    const direction = useDirection();

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
            <div className="max-w-xl modal-box bg-white items-center rounded-none px-0 border-2 border-black">
                <form method="dialog " className="flex items-center justify-center relative">
                    <h2 className="text-5xl md:text-6xl font-popfun uppercase">
                        {t("newGame")}
                    </h2>
                    <button
                        type="button"
                        className="absolute right-3 -top-3 bg-light-gray focus:outline-none w-5 h-5 md:w-8 md:h-8 flex items-center justify-center rounded-full text-white hover:bg-dark-gray transition-colors duration-300"
                        onClick={closeModal}
                        aria-label="Close"
                    >
                        <MdClose className='text-base md:text-2xl' />
                    </button>
                </form>
                <div className="divider before:bg-light-gray after:bg-light-gray m-0"></div>
                {/* Playing Mode Cards */}
                <div className="flex items-center w-full justify-evenly md:px-10 py-5 px-5 sm:px-10 gap-5">
                    <div className="md:w-64 w-64 cursor-pointer skew-custom bg-green border-4 sm:border-[6px] font-popfun border-black flex flex-col items-center justify-center px-6 py-2 md:py-5 gap-5"
                        onClick={() => handleNavigate("offline")}>
                        <Image src={OfflineImage} alt='Offline Mode' className='sm:w-20 w-16 sm:h-20 md:w-20 md:h-20' />
                        <p dir={direction} className="text-black text-5xl md:text-6xl uppercase">
                            {t('offline')} <span className="text-3xl md:text-4xl block text-end -mt-3 md:text-start md:inline-block md:mt-0"> {t('play')}</span>
                        </p>
                    </div>

                    {/* Online Play Card */}
                    <div className="md:w-64 w-64 cursor-pointer skew-custom bg-yellow font-popfun border-4 sm:border-[6px] border-black flex flex-col items-center justify-center px-6 py-2  md:py-5 gap-5"
                        onClick={() => handleNavigate("online")}>
                        <Image src={OnlineImage} alt='Online Mode' className='sm:w-20 w-16 sm:h-20 md:w-20 md:h-20' />
                        <p dir={direction} className="text-black  text-5xl md:text-6xl uppercase" >
                            {t('online')} <span className="text-3xl md:text-4xl block text-end -mt-3 md:text-start md:inline-block md:mt-0"> {t('play')}</span>
                        </p>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default CreateGameModal;
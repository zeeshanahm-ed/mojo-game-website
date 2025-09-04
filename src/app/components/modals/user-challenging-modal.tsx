import React from 'react'
import { MdClose } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import Button from '../ui/common/Button';
import Image from 'next/image';
import Divider from '../ui/common/Divider';
import { useDirection } from '@/app/hooks/useGetDirection';


interface UserChallengModalProps {
    open: boolean;
    onClose: () => void;
}

function UserChallengModal({ open, onClose }: UserChallengModalProps) {
    const { t } = useTranslation();
    const direction = useDirection();

    return (
        <dialog id="user-challenge_modal" className={` modal ${open ? 'modal-open' : ''}`}>
            <div className="modal-box customModalStyle bg-white items-center max-w-3xl rounded-none border border-black">
                <form method="dialog " className="px-4 md:px-10 flex items-center justify-center relative">
                    <h2 className={`${direction === "rtl" ? "text-3xl md:text-4xl " : "text-4xl sm:text-5xl md:text-6xl "}  uppercase flex flex-row sm:flex-row sm:items-center my-2`}>
                        {t("usersChallenging")}
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
                <Divider />
                {/* Main content */}
                <div className="w-full pb-10 pt-5 px-4 md:px-10 space-y-5 overflow-y-auto h-auto max-h-[500px]">
                    <div className='-skew-x-6 md:-skew-x-12 flex justify-between items-center py-2 px-4 md:px-8 md:py-2 border border-black'>
                        <div className='flex w-3/4 items-center gap-x-2 md:gap-x-5 !skew-x-6 md:!skew-x-12'>
                            <span className='w-10 h-10 border border-light-gray'>
                                <Image src="/images/fallback-profile-image.jpg" alt='User profile Picture' width={40} height={40} className='w-full h-full object-contain' />
                            </span>
                            <p className='text-lg font-secondary truncate max-w-[80%]'>User15992 User15992 User15992 User15992</p>
                        </div>
                        <Button bgClass='bg-[#10CD65]' className={`md:w-32 w-fit ${direction === "rtl" ? "text-xl" : "text-2xl md:text-4xl"} !skew-x-6 md:!skew-x-12`}>{t("play")}</Button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default UserChallengModal;
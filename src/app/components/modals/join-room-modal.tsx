import React, { useState } from 'react'
import Button from '../ui/common/Button';
import Input from '../ui/common/Input';
import { MdClose } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

interface JoinRoomModalProps {
    open: boolean;
    onClose: () => void;
}

function JoinRoomModal({ open, onClose }: JoinRoomModalProps) {
    const [roomCode, setRoomCode] = useState("");
    const [teamName, setTeamName] = useState("");
    const { t } = useTranslation();

    return (
        <dialog id="create_game_modal" className={` modal ${open ? 'modal-open' : ''}`}>
            <div className="modal-box customModalStyle bg-white items-center rounded-none border-2 border-black">
                <form method="dialog " className="flex items-center justify-center relative">
                    <h2 className="text-5xl md:text-6xl  uppercase">
                        {t("joinRoom")}
                    </h2>
                    <button
                        type="button"
                        className="absolute right-3 -top-3 bg-light-gray focus:outline-none w-5 h-5 md:w-8 md:h-8 flex items-center justify-center rounded-full text-white hover:bg-dark-gray transition-colors duration-300"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <MdClose className='text-base md:text-2xl' />
                    </button>
                </form>
                <div className="divider before:bg-light-gray after:bg-light-gray m-0"></div>
                {/* Main content */}
                <div className="flex items-center flex-col w-full justify-between py-5 px-5 md:px-10">
                    <p className='text-lg font-secondary text-black'>{t("roomModalNote")}</p>
                    <Input
                        type="text"
                        placeholder={t("enterRoomCode")}
                        value={roomCode}
                        className='mt-3 mb-7  w-full'
                        inputClassName='text-center pl-0'
                        onChange={(e) => setRoomCode(e.target.value)}
                    />
                    <p className='text-lg font-secondary text-black'>{t("enterTeamName")}</p>
                    <Input
                        type="text"
                        placeholder={t("teamName")}
                        value={teamName}
                        className='mt-3 mb-7 w-full'
                        inputClassName='text-center pl-0'
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                    <Button className='text-4xl w-64 tracking-wide'>{t("joinNow")}</Button>
                </div>
            </div>
        </dialog>
    )
}

export default JoinRoomModal
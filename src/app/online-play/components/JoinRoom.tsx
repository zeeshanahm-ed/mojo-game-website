import React, { LegacyRef, useState } from 'react'
import { copyToClipboard } from '@/app/helpers/helpers-functions';
import EditIcon from '@/app/assets//icons/edit-icon.svg';
import { IoIosCopy } from "react-icons/io";
import Button from '@/app/components/ui/common/Button';
import JoinRoomModal from '@/app/components/modals/join-room-modal';
import { showErrorMessage, showSuccessMessage } from '@/app/utils/messageUtils';
import { useTranslation } from 'react-i18next';

interface Props {
    isEditingRoomName: boolean;
    roomName: string;
    setRoomName: (v: string) => void;
    handleSaveRoomName: () => void;
    handleEditRoomName: () => void;
    roomCode: string;
    roomNameInputRef: LegacyRef<HTMLInputElement>;
}

function JoinRoom({ roomName, setRoomName, handleSaveRoomName, handleEditRoomName, roomCode, roomNameInputRef }: Props) {
    const [showModal, setShowModal] = useState(false);
    const { t } = useTranslation();

    const handleClose = () => {
        setShowModal(false);
    };

    const handleCopyRoomCode = async () => {
        const success = await copyToClipboard(roomCode);
        if (success) {
            showSuccessMessage('Copied!');
        } else {
            showErrorMessage('Failed to copy!');
        }
    };


    return (
        <div className='flex flex-col items-center'>
            <div className='w-full mb-5'>
                <Button className=' w-64 md:w-72 text-3xl sm:text-4xl md:text-[2.5rem]' onClick={() => setShowModal(true)}>
                    {t("joinRoom")}
                </Button>
            </div>
            <div className="text-center flex flex-col items-center justify-center my-5">
                <h2 className="text-4xl text-black uppercase">
                    {t("orCreateRoom")}
                </h2>
            </div>

            {/* Room Code Section */}
            <div className="flex items-center  h-14 sm:h-16 w-full max-w-md border-2 mt-5 border-black overflow-hidden">
                <div className="bg-white sm:w-32 w-24 mt-2">
                    <span className=" text-black text-2xl md:text-3xl uppercase">
                        {t("roomName")}
                    </span>
                </div>
                <div className='bg-yellow flex-1 h-full border-x-2 border-black'>
                    <input
                        type="text"
                        placeholder={t("enterRoomName")}
                        ref={roomNameInputRef}
                        className="input w-full  h-full input-lg text-black text-2xl md:text-3xl border-x-2  uppercase text-center bg-yellow border-none border-black focus:outline-none"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        onBlur={handleSaveRoomName} // Save on blur
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSaveRoomName();
                            }
                        }}
                    />
                </div>
                <button
                    className="btn btn-square bg-yellow text-black w-16  h-full flex items-center justify-center border-none"
                    onClick={handleEditRoomName}
                    aria-label="Copy Room Code"
                >
                    <EditIcon className='text-2xl md:text-3xl fill-black' />
                </button>
            </div>


            {/* Room Code Section */}
            <div className="flex items-center w-full h-14 sm:h-16 max-w-md border-2 mt-5 border-black overflow-hidden">
                <div className="bg-white sm:w-32 w-24 mt-2">
                    <span className=" text-black text-2xl md:text-3xl uppercase">
                        {t("roomCode")}
                    </span>
                </div>
                <div className="bg-yellow flex-grow flex-1 h-full flex border-x-2 border-black items-center justify-center">
                    <span className=" text-black text-2xl md:text-3xl tracking-wide">
                        {roomCode}
                    </span>
                </div>
                <button
                    className="btn btn-square bg-yellow text-black w-16  h-full flex items-center justify-center border-none"
                    onClick={handleCopyRoomCode}
                    aria-label="Copy Room Code"
                >
                    <IoIosCopy className='text-2xl md:text-3xl' />
                </button>
            </div>
            <JoinRoomModal open={showModal} onClose={handleClose} />
        </div>
    )
}

export default JoinRoom
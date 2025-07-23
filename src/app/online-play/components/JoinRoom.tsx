import React, { LegacyRef, useState } from 'react'
import { copyToClipboard } from '@/app/helpers/helpers-functions';
import EitIcon from '@/app/assets//icons/edit-icon.svg';
import { IoIosCopy } from "react-icons/io";
import Button from '@/app/components/ui/common/Button';
import JoinRoomModal from '@/app/components/modals/join-room-modal';
import { showErrorMessage, showSuccessMessage } from '@/app/utils/messageUtils';

interface Props {
    isEditingRoomName: boolean;
    roomName: string;
    setRoomName: (v: string) => void;
    handleSaveRoomName: () => void;
    handleEditRoomName: () => void;
    roomCode: string;
    roomNameInputRef: LegacyRef<HTMLInputElement>;
}

function JoinRoom({ isEditingRoomName, roomName, setRoomName, handleSaveRoomName, handleEditRoomName, roomCode, roomNameInputRef }: Props) {
    const [showModal, setShowModal] = useState(false);

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
                <Button className=' w-64 md:w-72 text-4xl md:text-5xl' onClick={() => setShowModal(true)}>
                    Join Room
                </Button>
            </div>
            <div className="text-center flex flex-col items-center justify-center my-5">
                <h2 className="text-5xl font-popfun text-black uppercase">
                    or create a room
                </h2>
            </div>

            {/* Room Code Section */}
            <div className="flex items-center h-16 w-full max-w-md border-2 mt-5 border-black overflow-hidden">
                <div className="bg-white p-3">
                    <span className="font-popfun text-black text-2xl md:text-4xl uppercase">
                        Room Name :
                    </span>
                </div>
                <div className='p-3 bg-yellow flex-1 border-2 border-black'>
                    <input
                        type="text"
                        placeholder='Enter Room Name'
                        ref={roomNameInputRef}
                        className="input w-full h-full input-lg text-black text-2xl md:text-4xl border-x-2 font-popfun uppercase text-center bg-yellow border-none border-black focus:outline-none"
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
                    className="btn btn-square bg-yellow text-black w-16 p-3 md:p-[18px] h-full flex items-center justify-center border-none"
                    onClick={handleEditRoomName}
                    aria-label="Copy Room Code"
                >
                    <EitIcon className='text-2xl md:text-4xl fill-black' />
                </button>
            </div>


            {/* Room Code Section */}
            <div className="flex items-center w-full max-w-md border-2 mt-5 border-black overflow-hidden">
                <div className="bg-white p-3 md:p-4">
                    <span className="font-popfun text-black text-2xl md:text-4xl uppercase">
                        Room Code :
                    </span>
                </div>
                <div className="bg-yellow flex-grow p-3 md:p-4 flex border-x-2 border-black items-center justify-center">
                    <span className="font-popfun text-black text-2xl md:text-4xl tracking-wide">
                        {roomCode}
                    </span>
                </div>
                <button
                    className="btn btn-square bg-yellow text-black w-16 h-full p-4 md:p-[18px] flex items-center justify-center border-none"
                    onClick={handleCopyRoomCode}
                    aria-label="Copy Room Code"
                >
                    <IoIosCopy className='text-2xl md:text-4xl' />
                </button>
            </div>
            <JoinRoomModal open={showModal} onClose={handleClose} />
        </div>
    )
}

export default JoinRoom
import React, { useState } from 'react'
import Button from '../ui/common/Button';
import Input from '../ui/common/Input';
import { MdClose } from 'react-icons/md';

interface JoinRoomModalProps {
    open: boolean;
    onClose: () => void;
}

function JoinRoomModal({ open, onClose }: JoinRoomModalProps) {
    const [roomCode, setRoomCode] = useState("");
    const [teamName, setTeamName] = useState("");

    return (
        <dialog id="create_game_modal" className={` modal ${open ? 'modal-open' : ''}`}>
            <div className=" modal-box bg-white items-center rounded-none border-2 border-black">
                <form method="dialog " className="flex items-center justify-center relative">
                    <h2 className="text-5xl md:text-6xl font-popfun uppercase">
                        join room
                    </h2>
                    <button
                        type="button"
                        className="absolute right-2 top-0 bg-light-gray focus:outline-none w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-dark-gray transition-colors duration-300"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <MdClose className='text-2xl' />
                    </button>
                </form>
                <div className="divider before:bg-light-gray after:bg-light-gray m-0"></div>
                {/* Main content */}
                <div className="flex items-center flex-col w-full justify-between px-10 py-5">
                    <p className='text-lg font-Product_sans text-black'>Enter Room code to participate in it.</p>
                    <Input
                        type="text"
                        placeholder="Enter Room Code"
                        value={roomCode}
                        className='mt-3 mb-7  w-full'
                        inputClassName='text-center pl-0'
                        onChange={(e) => setRoomCode(e.target.value)}
                    />
                    <p className='text-lg font-Product_sans text-black'>Enter Your Team Name</p>
                    <Input
                        type="text"
                        placeholder="Team Name"
                        value={teamName}
                        className='mt-3 mb-7 w-full'
                        inputClassName='text-center pl-0'
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                    <Button className='text-4xl w-64 tracking-wide'>Join now</Button>
                </div>
            </div>
        </dialog>
    )
}

export default JoinRoomModal;
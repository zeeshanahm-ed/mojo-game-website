"use client"
import React, { useRef, useState } from 'react'
import Wrapper from '@/app/components/ui/common/Wrapper';
import CategoriesSection from '@/app/components/ui/common/CategoriesSection';
import { copyToClipboard } from '../helpers/helpers-functions';

//icons
import VSIcon from '@/app/assets/images/vs.png';
import EitIcon from '@/app/assets//icons/edit-icon.svg';
import { IoIosCopy } from "react-icons/io";
import Button from '@/app/components/ui/common/Button';
import Banner from './Banner';
import Image from 'next/image';


function OnlinePlay() {
    const [roomName, setRoomName] = useState('ROOM NAME');
    const [isEditingRoomName, setIsEditingRoomName] = useState(false);
    const [roomCode] = useState('0540CV98VZ120I');

    const roomNameInputRef = useRef<HTMLInputElement>(null);

    const [isSearching, setIsSearching] = useState(false);

    // const handleSearchPlayers = () => {
    //     setIsSearching(true);
    //     // Simulate a search operation
    //     setTimeout(() => {
    //         setIsSearching(false);
    //         console.log("Search complete!");
    //     }, 3000);
    // };

    // Function to handle editing room name
    const handleEditRoomName = () => {
        setIsEditingRoomName(true);
        setTimeout(() => {
            roomNameInputRef.current?.focus();
        }, 0);
    };

    // Function to save room name after editing
    const handleSaveRoomName = () => {
        setIsEditingRoomName(false);
        console.log('Room Name updated to:', roomName);
    };

    // Function to handle copying room code to clipboard
    const handleCopyRoomCode = async () => {
        const success = await copyToClipboard(roomCode);
        if (success) {
            alert('Copied!');
        } else {
            alert('Failed to copy!');
        }
    };

    return (
        <section>
            <Banner />
            <Wrapper>
                <div className='flex items-center justify-center flex-col h-auto pb-20 w-full px-4 md:px-10'>
                    <div className="text-center flex flex-col items-center justify-center mt-10 w-full">
                        <div className="text-center flex flex-col items-center justify-center">
                            <h2 className="sm:text-6xl text-5xl lg:text-8xl font-popfun text-black mb-2 uppercase">
                                create a room
                            </h2>
                            <p className="text-sm sm:text-base md:text-lg leading-6 text-black max-w-2xl">
                                make your own Room and invite players to play with you and compete globally.
                            </p>
                        </div>
                        <div className="flex items-center h-16 justify-center mt-20 mb-8 w-full">
                            {isEditingRoomName ? (
                                <input
                                    type="text"
                                    placeholder='Enter Room Name'
                                    ref={roomNameInputRef}
                                    className="input h-full input-lg text-black text-5xl md:text-7xl font-popfun uppercase text-center bg-white border-none border-black focus:outline-none"
                                    value={roomName}
                                    onChange={(e) => setRoomName(e.target.value)}
                                    onBlur={handleSaveRoomName} // Save on blur
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSaveRoomName();
                                        }
                                    }}
                                />
                            ) : (
                                <h2 className="text-black text-5xl md:text-7xl leading-tight uppercase mr-4 font-popfun">
                                    {roomName ? roomName : "Room Name"}
                                </h2>
                            )}
                            <button
                                className="btn btn-circle bg-red text-white w-12 h-12 flex items-center justify-center rounded-full shadow-md hover:bg-red-600 transition-colors"
                                onClick={handleEditRoomName}
                                aria-label="Edit Room Name"
                            >
                                <EitIcon />
                            </button>
                        </div>

                        {/* Room Code Section */}
                        <div className="flex items-center w-full max-w-md border-2 border-black overflow-hidden">
                            <div className="bg-white p-3 md:p-4">
                                <span className="font-popfun text-black text-2xl md:text-4xl uppercase">
                                    ROOM CODE :
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
                        <div className="flex mt-20 flex-col sm:flex-row items-center justify-evenly w-full space-y-14 sm:space-y-0">
                            <div className="flex flex-col items-center text-center">
                                <div className="skew-custom md:w-48 md:h-48 w-36 h-36 overflow-hidden border-4 border-black flex items-center justify-center mb-4">
                                    <img
                                        src="https://placehold.co/160x160/FFD700/000000?text=User"
                                        alt="User Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-black text-xl font-semibold tracking-wider">Hamza Iqbal</h3>
                                <p className="text-gray-600 text-base">hamzaiqbal965@gmail.com</p>
                            </div>

                            {/* VS Icon */}
                            <div className="relative sm:16 md:w-20 h-1/2 flex items-center justify-center">
                                <Image src={VSIcon} alt='vs' className='w-full h-full' />
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="skew-custom md:w-48 md:h-48 w-36 h-36 overflow-hidden border-4 border-black flex items-center justify-center mb-4">
                                    {isSearching ? (
                                        <span className="loading loading-spinner loading-lg text-gray-400"></span>
                                    ) : (
                                        <span className="text-gray-400 text-6xl">?</span>
                                    )}
                                </div>
                                <h3 className="text-black text-xl font-semibold">Searching</h3>
                                <p className="text-gray-600 text-base ">it may take few seconds</p>
                            </div>
                        </div>
                        <Button boxShadow={false} className='text-white w-64 md:w-80 my-16 text-4xl' bgClass="bg-black">Search Players</Button>
                        <CategoriesSection />
                        <Button className='text-white md:w-1/2 w-full sm:w-3/4 my-16 text-4xl md:text-5xl'>Start playing</Button>
                    </div>
                </div>
            </Wrapper>
        </section >
    )
}

export default OnlinePlay;

// const CustomButton = ({ handleClick, icon, ariaLabel, team, type }: any) => {
//     return (
//         <button
//             className="flex justify-center items-center bg-yellow text-black text-xl w-12 h-10 boxShadow-custom border-2 border-black"
//             onClick={() => handleClick(team, type)}
//             aria-label={ariaLabel}
//         >
//             {icon}
//         </button>
//     )
// }
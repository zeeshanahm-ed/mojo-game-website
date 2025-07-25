'use client';

// Icons
import { MdClose } from 'react-icons/md';
import Button from '../ui/common/Button';

interface CustomModalProps {
    title: string;
    open: boolean;
    closeModal: () => void;
    subTitle?: string;
    onYasClick?: () => void;
}

export default function CustomModal({ title, open, closeModal, subTitle, onYasClick }: CustomModalProps) {


    return (
        <dialog id="auth_modal" className={` modal ${open ? 'modal-open' : ''}`}>
            <div className="modal-box bg-white max-w-2xl items-center rounded-none border-2 border-black w-full px-0">
                <form method="dialog " className="flex items-center justify-center relative">
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-popfun">
                        {title}
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
                <div>
                    <div className="text-center md:px-20 sm:px-10 px-5 py-10 space-y-6">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-popfun">
                            {subTitle}
                        </h2>
                        <div className='flex justify-evenly '>
                            <Button className='text-5xl w-44' onClick={closeModal}>No</Button>
                            <Button className='text-5xl w-44' onClick={onYasClick}>Yas</Button>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );
}
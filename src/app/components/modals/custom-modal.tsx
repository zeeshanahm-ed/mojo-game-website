'use client';

// Icons
import { MdClose } from 'react-icons/md';
import Button from '../ui/common/Button';

interface CustomModalProps {
    title: string;
    open: boolean;
    closeModal: () => void;
    subTitle: string;
    showButton: boolean;
    confirmButtonTile: string;
    cancelButtonTitle: string;
    onConfirmButtonClick?: () => void;
    onCancelButtonClick?: () => void;
}

export default function CustomModal({ showButton, confirmButtonTile, cancelButtonTitle, title, open, closeModal, subTitle, onConfirmButtonClick, onCancelButtonClick }: CustomModalProps) {


    return (
        <dialog id="auth_modal" className={` modal ${open ? 'modal-open' : ''}`}>
            <div className="modal-box customModalStyle bg-white max-w-2xl items-center rounded-none border-2 border-black w-full">
                <form method="dialog " className="flex items-center justify-center relative">
                    <h2 className="text-4xl sm:text-5xl md:text-7xl ">
                        {title}
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
                <div className='px-5 md:px-10 py-10'>
                    <div className="text-center space-y-6">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl ">
                            {subTitle}
                        </h2>
                        {showButton &&
                            <div className='flex justify-evenly '>
                                <Button className='md:text-5xl text-2xl w-32 md:w-44' onClick={onCancelButtonClick}>{cancelButtonTitle}</Button>
                                <Button className='md:text-5xl text-2xl w-32 md:w-44' onClick={onConfirmButtonClick}>{confirmButtonTile}</Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </dialog>
    );
}
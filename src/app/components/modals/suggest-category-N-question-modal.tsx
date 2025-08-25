import React, { useState } from 'react'
import { MdClose, MdArrowBack } from 'react-icons/md';
import Button from '../ui/common/Button';
import Input from '../ui/common/Input';
import Divider from '../ui/common/Divider';
import Image from 'next/image';
import QuestionNAnswer from './components/QuestionNAnswerModalUI';
//icon
import { IoIosAddCircleOutline } from "react-icons/io";
import UploadImageIcon from "@/app/assets/icons/upload-image-icon.svg";
import { MdDelete } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";


interface SuggestCategoryNQuestionModalProps {
    open: boolean;
    onClose: () => void;
    mode: "offline" | "online";
}
type Option = {
    text: string;
    translated: string;
};
export interface OfflineQuestionNAnswerData {
    questionEN: string | undefined;
    questionAR: string | undefined;
    questionMedia: string | undefined;
    answerEN: string | undefined;
    answerAR: string | undefined;
    answerMedia: string | undefined;
    options: Option[];
}

function SuggestCategoryNQuestionModal({ open, onClose, mode }: SuggestCategoryNQuestionModalProps) {
    const [categoryName, setCategoryName] = useState("");
    const [file, setFile] = useState<string>("");
    const [fileObj, setFileObj] = useState<File | null>(null);
    const [step, setStep] = useState(1);
    const [questionsData, setQuestionsData] = useState<OfflineQuestionNAnswerData[]>([]);
    const [editQuestionData, setEditQuestionData] = useState<OfflineQuestionNAnswerData | null>(null);


    // Reference to the hidden file input
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    // Function to trigger the hidden file input click
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileObj(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFile(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGoToAddQuestion = () => {
        setEditQuestionData(null);
        setStep(2);
    };
    const goBack = () => {
        setStep(1);
    };

    const handleRemove = () => {
        setFile("");
    };

    const handleEditQuestion = (index: number) => {
        const questionData = questionsData[index];
        if (questionData) {
            setEditQuestionData(questionData);
            setStep(2);
        }
    };

    const handleClose = () => {
        onClose();
        setFile("");
        setFileObj(null);
        setStep(1);
        setQuestionsData([]);
        setEditQuestionData(null);
    };

    return (
        <dialog id="user-challenge_modal" className={` modal ${open ? 'modal-open' : ''}`}>
            <div className="modal-box px-0 pb-0 font-primary  bg-white items-center max-w-3xl rounded-none border border-black">
                <form method="dialog " className="px-4 md:px-10 flex items-center justify-center relative">
                    {step === 2 &&
                        <button
                            type="button"
                            className="absolute left-3 -top-0 bg-light-gray focus:outline-none w-5 h-5 md:w-8 md:h-8 flex items-center justify-center rounded-full text-white hover:bg-dark-gray transition-colors duration-300"
                            onClick={goBack}
                            aria-label="Close"
                        >
                            <MdArrowBack className='text-base md:text-2xl' />
                        </button>}
                    <h2 className="text-4xl sm:text-5xl md:text-6xl  uppercase flex flex-row sm:flex-row sm:items-center ">
                        Suggest A Category/Question
                    </h2>
                    <button
                        type="button"
                        className="absolute right-3 -top-0 bg-light-gray focus:outline-none w-5 h-5 md:w-8 md:h-8 flex items-center justify-center rounded-full text-white hover:bg-dark-gray transition-colors duration-300"
                        onClick={handleClose}
                        aria-label="Close"
                    >
                        <MdClose className='text-base md:text-2xl' />
                    </button>
                </form>
                <Divider />
                {/* Main content */}
                {step === 1 ?
                    <div className="w-full pb-10 pt-5  space-y-5 h-auto max-h-[800px] font-secondary">
                        <div className="flex md:flex-row flex-col gap-6 px-4 md:px-10">
                            {/* Upload Photo */}
                            <div className="flex flex-1 flex-col gap-4">
                                <span className=" text-lg w-full text-center ">Category Picture</span>
                                <div className="relative  px-4 w-full h-14 transform -skew-x-6 md:-skew-x-12 overflow-hidden border border-black flex items-center justify-center">
                                    {/* Hidden file input */}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        name="avatar"
                                        onChange={handleProfilePictureChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    {file ?

                                        <>
                                            <Image
                                                src={(typeof file === 'string' ? file : "")}
                                                alt="preview"
                                                className="w-8 h-8 object-contain"
                                                width={96}
                                                height={96}
                                            />
                                            <span className="truncate  ml-5 mt-1">{fileObj?.name}</span>
                                            <button
                                                className="ml-auto"
                                                onClick={handleRemove}
                                            >
                                                <MdDelete className="text-red" size={24} />
                                            </button>
                                        </>
                                        :

                                        <button
                                            className="cursor-pointer flex items-center justify-start gap-x-5 bg-white hover:text-light-gray transition-colors duration-300"
                                            onClick={triggerFileInput}
                                        >
                                            <UploadImageIcon />
                                            <span className="text-base ">Upload Image</span>
                                        </button>
                                    }
                                </div>
                            </div>
                            {/* Category Name */}
                            <div className="flex flex-1 flex-col gap-4">
                                <p className="w-full text-center text-lg ">Category Name</p>
                                <Input
                                    type='text'
                                    placeholder="Category name"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    className="w-full !border"
                                    inputClassName='!px-4'
                                />
                            </div>

                        </div>
                        <Divider />
                        {/* Question List Ui */}
                        <div className='px-4 md:px-10 space-y-5 overflow-y-auto h-auto max-h-[500px]'>
                            <button onClick={handleGoToAddQuestion} className='w-full hover:text-light-gray transition-colors duration-300 -skew-x-6 md:-skew-x-12 flex justify-between items-center py-4 px-4 border border-black'>
                                <div className='flex items-center gap-x-2'>
                                    <IoIosAddCircleOutline size={24} />
                                    <span className='text-base md:text-lg '>Add Question</span>
                                </div>
                            </button>
                            {questionsData?.map((question, index) => (
                                <button key={index} onClick={() => handleEditQuestion(index)} className='w-full hover:text-light-gray transition-colors duration-300 -skew-x-6 md:-skew-x-12 flex justify-between items-center py-4 px-4 border border-black'>
                                    <span>Question {index + 1}</span>
                                    <span>{question.questionEN}</span>
                                    <button>
                                        <FaArrowRight size={24} />
                                    </button>
                                </button>
                            ))}
                        </div>
                        <Divider />
                        {/* Foooter */}
                        <div className='flex-centered'>
                            <Button className='md:w-80 w-64 text-3xl md:text-4xl'>
                                Submit your suggestion
                            </Button>
                        </div>
                    </div>
                    :
                    <>
                        <QuestionNAnswer mode={mode} editQuestionData={editQuestionData} setQuestionsData={setQuestionsData} goBack={goBack} />
                    </>
                }
            </div>
        </dialog>
    )
}

export default SuggestCategoryNQuestionModal;
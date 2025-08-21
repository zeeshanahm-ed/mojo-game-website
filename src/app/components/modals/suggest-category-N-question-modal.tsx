import React, { useState } from 'react'
import { MdClose, MdArrowBack } from 'react-icons/md';
import Button from '../ui/common/Button';
import Input from '../ui/common/Input';
import Divider from '../ui/common/Divider';
import Image from 'next/image';
//icon
import { IoIosAddCircleOutline } from "react-icons/io";
import UploadImageIcon from "@/app/assets/icons/upload-image-icon.svg";
import VideoIcon from "@/app/assets/icons/video-icon.svg";
import AudioIcon from "@/app/assets/icons/audio-icon.svg";
import { MdDelete } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";


interface SuggestCategoryNQuestionModalProps {
    open: boolean;
    onClose: () => void;
    mode: "offline" | "online";
}

interface OfflineQuestionNAnswerData {
    questionEN: string | undefined;
    questionAR: string | undefined;
    questionMedia: string | undefined;
    answerEN: string | undefined;
    answerAR: string | undefined;
    answerMedia: string | undefined;
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
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <MdClose className='text-base md:text-2xl' />
                    </button>
                </form>
                <Divider />
                {/* Main content */}
                <div className="w-full pb-10 pt-5  space-y-5 h-auto max-h-[800px] font-secondary">
                    {step === 1 ?
                        <>
                            <div className="flex gap-6 px-10">
                                {/* Upload Photo */}
                                <div className="flex w-1/2 flex-col gap-4">
                                    <span className=" text-lg w-full text-center ">Upload category photo</span>
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
                                <div className="flex w-1/2 flex-col gap-4">
                                    <p className="w-full text-center text-lg ">Category Name</p>
                                    <Input
                                        type='text'
                                        placeholder="Category name"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        className="w-full !border"
                                        inputClassName='md:!ps-3'
                                    />
                                </div>

                            </div>
                            <Divider />
                            {/* Question List Ui */}
                            <div className='px-10 space-y-5 overflow-y-auto h-auto max-h-[500px]'>
                                <button onClick={handleGoToAddQuestion} className='w-full hover:text-light-gray transition-colors duration-300 -skew-x-12 flex justify-between items-center py-4 px-8 border border-black'>
                                    <div className='skew-x-12 flex items-center gap-x-2'>
                                        <IoIosAddCircleOutline size={24} />
                                        <span className='text-lg '>Add Question</span>
                                    </div>
                                </button>
                                {questionsData?.map((question, index) => (
                                    <button key={index} onClick={() => handleEditQuestion(index)} className='w-full hover:text-light-gray transition-colors duration-300 -skew-x-12 flex justify-between items-center py-4 px-8 border border-black'>
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
                                <Button className='w-80 text-4xl'>
                                    Submit your suggestion
                                </Button>
                            </div>
                        </>
                        :
                        <>
                            <QuestionNAnswer mode={mode} editQuestionData={editQuestionData} setQuestionsData={setQuestionsData} goBack={goBack} />
                        </>
                    }
                </div>
            </div>
        </dialog>
    )
}

export default SuggestCategoryNQuestionModal;

interface QuestionNAnswerProps {
    editQuestionData: OfflineQuestionNAnswerData | null;
    setQuestionsData: React.Dispatch<React.SetStateAction<OfflineQuestionNAnswerData[]>>;
    goBack: () => void;
    mode: 'offline' | 'online';
};


type Option = {
    text: string;
    translated: string;
};

const QuestionNAnswer = ({ editQuestionData, setQuestionsData, goBack, mode }: QuestionNAnswerProps) => {
    const [questionState, setQuestionState] = useState<OfflineQuestionNAnswerData | null>({
        questionEN: editQuestionData?.questionEN || "",
        questionAR: editQuestionData?.questionAR || "",
        questionMedia: editQuestionData?.questionMedia || "",
        answerEN: editQuestionData?.answerEN || "",
        answerAR: editQuestionData?.answerAR || "",
        answerMedia: editQuestionData?.answerMedia || "",
    });
    const [questionMediaObj, setQuestionMediaObj] = useState<File | null>(null);
    const [answerMediaObj, setAnswerMediaObj] = useState<File | null>(null);

    const [options, setOptions] = useState<Option[]>([
        { text: "", translated: "" },
        { text: "", translated: "" },
        { text: "", translated: "" },
        { text: "", translated: "" },
    ]);

    const questionFileInputRef = React.useRef<HTMLInputElement>(null);
    const triggerQuestionFileInput = () => {
        questionFileInputRef.current?.click();
    };
    const answerFileInputRef = React.useRef<HTMLInputElement>(null);
    const triggerAnswerFileInput = () => {
        answerFileInputRef.current?.click();
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setQuestionState((prevState) => {
            return {
                ...prevState,
                [name]: value
            } as OfflineQuestionNAnswerData;
        });
    };

    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const name = event.target.name;
        if (file) {
            if (name === "questionMedia") {
                setQuestionMediaObj(file);
            } else if (name === "answerMedia") {
                setAnswerMediaObj(file);
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setQuestionState((prevState) => {
                    return {
                        ...prevState,
                        [name]: reader.result as string
                    } as OfflineQuestionNAnswerData;
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemove = (name: string) => {
        setQuestionState((prevState) => {
            return {
                ...prevState,
                [name]: ""
            } as OfflineQuestionNAnswerData;
        });
    };

    const handleAddQuestion = () => {
        if (questionState) {
            setQuestionsData((prevQuestions) => [...prevQuestions, questionState]);
            resetState();
            goBack();
        }
    };

    const resetState = () => {
        setQuestionState({
            questionEN: "",
            questionAR: "",
            questionMedia: "",
            answerEN: "",
            answerAR: "",
            answerMedia: "",
        });
        setQuestionMediaObj(null);
        setAnswerMediaObj(null);
    };

    const handleChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index].text = value;
        setOptions(newOptions);
    };

    const handleTranslate = (index: number) => {
        const newOptions = [...options];
        // Fake translation (you can integrate API later)
        newOptions[index].translated = newOptions[index].text
            ? `Translated: ${newOptions[index].text}`
            : "";
        setOptions(newOptions);
    };

    return (
        <div className='w-full space-y-5 overflow-y-auto h-auto max-h-[500px]'>
            {/* Question */}
            <div className='px-10 '>
                <h2 className='w-full  text-lg mb-5 flex items-center gap-x-5'>Add Question <span className='h-[2px] flex-1 bg-border-gray'></span></h2>
                <div className='space-y-5'>
                    <Input
                        name='questionEN'
                        type='text'
                        placeholder="Question"
                        value={questionState?.questionEN}
                        onChange={(e) => handleOnChange(e)}
                        className="w-full !border"
                        inputClassName='!px-4'
                    />
                    <div className='relative'>
                        <button className='absolute top-4 left-5 z-50  underline hover:no-underline'>
                            Translate
                        </button>
                        <Input
                            type='text'
                            name='questionAR'
                            readOnly
                            placeholder="Question Translation"
                            value={questionState?.questionAR}
                            onChange={(e) => handleOnChange(e)}
                            className="w-full !border"
                            inputClassName='!px-4 text-end'
                        />
                    </div>
                    <div className={`w-full flex-col gap-4 ${mode === 'online' ? 'hidden' : 'flex'}`}>
                        <div className="relative w-full h-14 px-4 transform -skew-x-6 md:-skew-x-12 overflow-hidden border border-black flex items-center justify-center">
                            {/* Hidden file input */}
                            <input
                                type="file"
                                ref={questionFileInputRef}
                                name="questionMedia"
                                onChange={handleProfilePictureChange}
                                accept="image/*"
                                className="hidden"
                            />
                            {questionState?.questionMedia ?
                                <>
                                    <Image
                                        src={(typeof questionState.questionMedia === 'string' ? questionState.questionMedia : "")}
                                        alt="preview"
                                        className="w-8 h-8 object-contain"
                                        width={96}
                                        height={96}
                                    />
                                    <span className="truncate  ml-5 mt-1">{questionMediaObj?.name}</span>
                                    <button
                                        className="ml-auto"
                                        onClick={() => handleRemove("questionMedia")}
                                    >
                                        <MdDelete className="text-red" size={24} />
                                    </button>
                                </>
                                :

                                <button
                                    className="w-full h-full  cursor-pointer flex items-center justify-between gap-x-5 bg-white hover:text-light-gray transition-colors duration-300"
                                    onClick={triggerQuestionFileInput}
                                >
                                    <span className="border-r h-full pe-4 flex-centered border-border-gray text-lg text-center ">Upload Media</span>
                                    <div className='flex items-center justify-between flex-1 px-8'>
                                        <div className='flex-centered gap-x-4'>
                                            <UploadImageIcon />
                                            <span className="text-base ">Photo</span>
                                        </div>
                                        <div className='flex-centered gap-x-4'>
                                            <VideoIcon />
                                            <span className="text-base ">Video</span>
                                        </div>
                                        <div className='flex-centered gap-x-4'>
                                            <AudioIcon />
                                            <span className="text-base ">Audio</span>
                                        </div>
                                    </div>
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* Answer */}
            <div className='mt-5 px-10 '>
                <h2 className='w-full  text-lg mb-5 flex items-center gap-x-5'>Add Answer <span className='h-[2px] flex-1 bg-border-gray'></span></h2>
                <div className='space-y-5'>
                    <Input
                        name='answerEN'
                        type='text'
                        placeholder="Answer"
                        value={questionState?.answerEN}
                        onChange={(e) => handleOnChange(e)}
                        className="w-full !border"
                        inputClassName='!px-4'
                    />
                    <div className='relative'>
                        <button className='absolute top-4 left-5 z-50  underline hover:no-underline'>
                            Translate
                        </button>
                        <Input
                            type='text'
                            name='answerAR'
                            readOnly
                            placeholder="Answer Translation"
                            value={questionState?.answerAR}
                            onChange={(e) => handleOnChange(e)}
                            className="w-full !border"
                            inputClassName='!px-4 text-end'
                        />
                    </div>
                    <div className={`w-full flex-col gap-4 ${mode === 'online' ? 'hidden' : 'flex'}`}>
                        <div className="relative w-full h-14 px-4 transform -skew-x-6 md:-skew-x-12 overflow-hidden border border-black flex items-center justify-center">
                            {/* Hidden file input */}
                            <input
                                type="file"
                                ref={answerFileInputRef}
                                name="answerMedia"
                                onChange={handleProfilePictureChange}
                                accept="image/*"
                                className="hidden"
                            />
                            {questionState?.answerMedia ?
                                <>
                                    <Image
                                        src={(typeof questionState.answerMedia === 'string' ? questionState.answerMedia : "")}
                                        alt="preview"
                                        className="w-8 h-8 object-contain"
                                        width={96}
                                        height={96}
                                    />
                                    <span className="truncate  ml-5 mt-1">{answerMediaObj?.name}</span>
                                    <button
                                        className="ml-auto"
                                        onClick={() => handleRemove("answerMedia")}
                                    >
                                        <MdDelete className="text-red" size={24} />
                                    </button>
                                </>

                                :

                                <button
                                    className="w-full h-full  cursor-pointer flex items-center justify-between gap-x-5 bg-white hover:text-light-gray transition-colors duration-300"
                                    onClick={triggerAnswerFileInput}
                                >
                                    <span className="border-r h-full pe-4 flex-centered border-border-gray text-lg text-center ">Upload Media</span>
                                    <div className='flex items-center justify-between flex-1 px-8'>
                                        <div className='flex-centered gap-x-4'>
                                            <UploadImageIcon />
                                            <span className="text-base ">Photo</span>
                                        </div>
                                        <div className='flex-centered gap-x-4'>
                                            <VideoIcon />
                                            <span className="text-base ">Video</span>
                                        </div>
                                        <div className='flex-centered gap-x-4'>
                                            <AudioIcon />
                                            <span className="text-base ">Audio</span>
                                        </div>
                                    </div>
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* <MCQOptions /> */}
            <div className='mt-5 px-10 '>
                <h2 className='w-full  text-lg mb-5 flex items-center gap-x-5'>{"Add MCQ’s"} <span className='h-[2px] flex-1 bg-border-gray'></span></h2>
                <div className="grid grid-cols-4 gap-6 w-full">
                    {options.map((option, index) => (
                        <div key={index} className="flex flex-col items-center space-y-2">
                            {/* Label */}
                            <label className="font-medium mb-1">Option {index + 1}</label>

                            {/* Input */}
                            <Input
                                type="text"
                                value={option.text}
                                onChange={(e) => handleChange(index, e.target.value)}
                                placeholder="Type option"
                                inputClassName='!px-4 text-center'
                                className="w-36 h-12 !border text-center"
                            />

                            {/* Translate button */}
                            <button
                                onClick={() => handleTranslate(index)}
                                className="w-36  h-12 border border-black underline font-medium -skew-x-12 hover:no-underline"
                            >
                                Translate
                            </button>
                        </div>
                    ))}
                </div>

            </div>
            <Divider />
            <div className='flex-centered mt-5'>
                <Button className='w-80 text-4xl' onClick={handleAddQuestion}>
                    Add Question
                </Button>
            </div>
        </div>
    )
};
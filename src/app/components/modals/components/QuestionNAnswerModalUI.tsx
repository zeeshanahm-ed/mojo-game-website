import { useRef, useState } from "react";
import Button from "../../ui/common/Button";
import Divider from "../../ui/common/Divider";
import Input from "../../ui/common/Input";
import { OfflineQuestionNAnswerData } from "../suggest-category-N-question-modal";
import Image from "next/image";
//icons
import UploadImageIcon from "@/app/assets/icons/upload-image-icon.svg";
import VideoIcon from "@/app/assets/icons/video-icon.svg";
import AudioIcon from "@/app/assets/icons/audio-icon.svg";
import { MdDelete } from "react-icons/md";

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

const initialOptions: Option[] = [
    { text: "", translated: "" },
    { text: "", translated: "" },
    { text: "", translated: "" },
    { text: "", translated: "" },
];

const QuestionNAnswer = ({ editQuestionData, setQuestionsData, goBack, mode }: QuestionNAnswerProps) => {
    const [questionState, setQuestionState] = useState<OfflineQuestionNAnswerData | null>({
        questionEN: editQuestionData?.questionEN || "",
        questionAR: editQuestionData?.questionAR || "",
        questionMedia: editQuestionData?.questionMedia || "",
        answerEN: editQuestionData?.answerEN || "",
        answerAR: editQuestionData?.answerAR || "",
        answerMedia: editQuestionData?.answerMedia || "",
        options: editQuestionData?.options || [...initialOptions],
    });
    const [questionMediaObj, setQuestionMediaObj] = useState<File | null>(null);
    const [answerMediaObj, setAnswerMediaObj] = useState<File | null>(null);

    const questionFileInputRef = useRef<HTMLInputElement>(null);
    const triggerQuestionFileInput = () => {
        questionFileInputRef.current?.click();
    };
    const answerFileInputRef = useRef<HTMLInputElement>(null);
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
            options: [...initialOptions],
        });
        setQuestionMediaObj(null);
        setAnswerMediaObj(null);
    };

    const handleChange = (index: number, value: string) => {
        const newOptions = [...(questionState?.options || [])];
        newOptions[index].text = value;
        setQuestionState((prevState) => ({
            ...prevState!,
            options: newOptions
        }));
    };

    const handleTranslate = () => {
        // const newOptions = [...options];
        // // Fake translation (you can integrate API later)
        // newOptions[index].translated = newOptions[index].text
        //     ? `Translated: ${newOptions[index].text}`
        //     : "";
        // setQuestionState((prevState) => ({
        //     ...prevState,
        //     options: newOptions
        // }));
    };

    return (
        <div className='w-full pb-10 pt-5  space-y-5 h-auto max-h-[800px] font-secondary'>
            <div className='px-4 md:px-10 space-y-5 overflow-y-auto h-auto max-h-[600px]'>
                {/* Question */}
                <div>
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
                <div>
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
                <div className={`${mode === 'offline' ? 'hidden' : ''}`}>
                    <h2 className='w-full  text-lg mb-5 flex items-center gap-x-5'>{"Add MCQ’s"} <span className='h-[2px] flex-1 bg-border-gray'></span></h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                        {questionState?.options.map((option, index) => (
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
                                    onClick={() => handleTranslate()}
                                    className="w-36  h-12 border border-black underline font-medium -skew-x-6 md:-skew-x-12 hover:no-underline"
                                >
                                    Translate
                                </button>
                            </div>
                        ))}
                    </div>

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


export default QuestionNAnswer;
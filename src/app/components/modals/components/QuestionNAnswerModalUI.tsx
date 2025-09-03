import { useRef, useState } from "react";
import Button from "../../ui/common/Button";
import Divider from "../../ui/common/Divider";
import Input from "../../ui/common/Input";
import { OfflineQuestionNAnswerData } from "../suggest-category-N-question-modal";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useDirection } from "@/app/hooks/useGetDirection";
//icons
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

type UploadedFileType = "image" | "video" | "audio";

const initialOptions: Option[] = [
    { text: "", translated: "" },
    { text: "", translated: "" },
    { text: "", translated: "" },
    { text: "", translated: "" },
];

const QuestionNAnswer = ({ editQuestionData, setQuestionsData, goBack, mode }: QuestionNAnswerProps) => {
    const { t } = useTranslation();
    const direction = useDirection();
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
    const [uploadedFileType, setUploadedFileType] = useState<UploadedFileType>();

    const questionFileInputRef = useRef<HTMLInputElement>(null);
    const triggerQuestionFileInput = (type: UploadedFileType) => {
        setUploadedFileType(type);
        if (!questionFileInputRef.current) return;

        if (type === "image") {
            questionFileInputRef.current.accept = ".jpg,.jpeg,.png,.gif,.webp";
        } else if (type === "video") {
            questionFileInputRef.current.accept = ".mp4,.webm,.ogg";
        } else if (type === "audio") {
            questionFileInputRef.current.accept = ".mp3,.wav,.ogg";
        }
        questionFileInputRef.current?.click();
    };
    const answerFileInputRef = useRef<HTMLInputElement>(null);
    const triggerAnswerFileInput = (type: UploadedFileType) => {
        setUploadedFileType(type);
        if (!answerFileInputRef.current) return;

        if (type === "image") {
            answerFileInputRef.current.accept = ".jpg,.jpeg,.png,.gif,.webp";
        } else if (type === "video") {
            answerFileInputRef.current.accept = ".mp4,.webm,.ogg";
        } else if (type === "audio") {
            answerFileInputRef.current.accept = ".mp3,.wav,.ogg";
        }
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

    const validateUploadedFile = (file: File | undefined) => {
        if (!file) return "No file selected";
        if (!["image/jpeg", "image/png", "video/mp4", "audio/mpeg"].includes(file.type)) {
            return "Invalid file type";
        }
        if (file.size > 5 * 1024 * 1024) {
            return "File size exceeds 5MB";
        }
        return null;
    }

    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const name = event.target.name;
        const error = validateUploadedFile(file);
        console.log("error", error, uploadedFileType);
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
                    <h2 className='w-full  text-lg mb-5 flex items-center gap-x-5'>{t("addQuestion")} <span className='h-[2px] flex-1 bg-border-gray'></span></h2>
                    <div className='space-y-5'>
                        <Input
                            name='questionEN'
                            type='text'
                            placeholder={t("question")}
                            value={questionState?.questionEN}
                            onChange={(e) => handleOnChange(e)}
                            className="w-full !border"
                            inputClassName='!px-4'
                        />
                        <div className='relative'>
                            <button dir={direction} className='absolute top-4 start-5 z-50  underline hover:no-underline'>
                                {t("translate")}
                            </button>
                            <Input
                                type='text'
                                name='questionAR'
                                readOnly
                                placeholder={t("questionTranslation")}
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

                                    <div
                                        className="w-full h-full flex items-center justify-between gap-x-5 bg-white"

                                    >
                                        <span className="border-r h-full pe-4 flex-centered border-border-gray text-lg text-center ">Upload Media</span>
                                        <div className='flex items-center justify-between flex-1 px-8'>
                                            <button className='flex-centered gap-x-4 hover:text-light-gray transition-colors duration-300' onClick={() => triggerQuestionFileInput("image")}>
                                                <Image src="/images/icons/upload-image-icon.svg" alt='image-icon' width={20} height={20} />
                                                <span className="text-base ">Image</span>
                                            </button>
                                            <button className='flex-centered gap-x-4 hover:text-light-gray transition-colors duration-300' onClick={() => triggerQuestionFileInput("video")}>
                                                <Image src="/images/icons/video-icon.svg" alt='video-icon' width={20} height={20} />
                                                <span className="text-base ">Video</span>
                                            </button>
                                            <button className='flex-centered gap-x-4 hover:text-light-gray transition-colors duration-300' onClick={() => triggerQuestionFileInput("audio")}>
                                                <Image src="/images/icons/audio-icon.svg" alt='audio-icon' width={20} height={20} />
                                                <span className="text-base ">Audio</span>
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* Answer */}
                <div>
                    <h2 className='w-full  text-lg mb-5 flex items-center gap-x-5'>{t("addAnswer")} <span className='h-[2px] flex-1 bg-border-gray'></span></h2>
                    <div className='space-y-5'>
                        <Input
                            name='answerEN'
                            type='text'
                            placeholder={t("answer")}
                            value={questionState?.answerEN}
                            onChange={(e) => handleOnChange(e)}
                            className="w-full !border"
                            inputClassName='!px-4'
                        />
                        <div className='relative'>
                            <button dir={direction} className='absolute top-4 start-5 z-50  underline hover:no-underline'>
                                {t("translate")}
                            </button>
                            <Input
                                type='text'
                                name='answerAR'
                                readOnly
                                placeholder={t("answerTranslation")}
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

                                    <div
                                        className="w-full h-full flex items-center justify-between gap-x-5 bg-white"
                                    >
                                        <span className="border-r h-full pe-4 flex-centered border-border-gray text-lg text-center ">Upload Media</span>
                                        <div className='flex items-center justify-between flex-1 px-8'>
                                            <button className='flex-centered gap-x-4 hover:text-light-gray transition-colors duration-300' onClick={() => triggerAnswerFileInput("image")}>
                                                <Image src="/images/icons/upload-image-icon.svg" alt='image-icon' width={20} height={20} />

                                                <span className="text-base ">Image</span>
                                            </button>
                                            <button className='flex-centered gap-x-4 hover:text-light-gray transition-colors duration-300' onClick={() => triggerAnswerFileInput("video")}>
                                                <Image src="/images/icons/video-icon.svg" alt='video-icon' width={20} height={20} />
                                                <span className="text-base ">Video</span>
                                            </button>
                                            <button className='flex-centered gap-x-4 hover:text-light-gray transition-colors duration-300' onClick={() => triggerAnswerFileInput("audio")}>
                                                <Image src="/images/icons/audio-icon.svg" alt='audio-icon' width={20} height={20} />
                                                <span className="text-base ">Audio</span>
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* <MCQOptions /> */}
                <div className={`${mode === 'offline' ? 'hidden' : ''}`}>
                    <h2 className='w-full  text-lg mb-5 flex items-center gap-x-5'>{t("addMcqs")} <span className='h-[2px] flex-1 bg-border-gray'></span></h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                        {questionState?.options.map((option, index) => (
                            <div key={index} className="flex flex-col items-center space-y-2">
                                {/* Label */}
                                <label className="font-medium mb-1">{t("option")} {index + 1}</label>

                                {/* Input */}
                                <Input
                                    type="text"
                                    value={option.text}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    placeholder={t("typeOption")}
                                    inputClassName='!px-4 text-center'
                                    className="w-36 h-12 !border text-center"
                                />

                                {/* Translate button */}
                                <button
                                    onClick={() => handleTranslate()}
                                    className="w-36  h-12 border border-black underline font-medium -skew-x-6 md:-skew-x-12 hover:no-underline"
                                >
                                    {t("translate")}
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <Divider />
            <div className='flex-centered mt-5'>
                <Button className='w-80 text-4xl' onClick={handleAddQuestion}>
                    {t("addQuestion")}
                </Button>
            </div>
        </div>
    )
};


export default QuestionNAnswer;
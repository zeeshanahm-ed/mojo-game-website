import { useDirection } from "@/app/hooks/useGetDirection";
import { useGameSession } from "@/app/store/gameSession";
import Image from "next/image";
import { useTranslation } from "react-i18next";


type QuestionsScoreListProp = {
    onScoreClick?: (question: any) => void;
    categoriesData: any[];
};

const QuestionsScoreList: React.FC<QuestionsScoreListProp> = ({ onScoreClick, categoriesData = [] }) => {
    const { t } = useTranslation();
    const direction = useDirection();
    const { session } = useGameSession();

    return (
        <div className='flex justify-center flex-col'>
            <div className='text-center sm:text-start mb-10'>
                <h2 className="md:text-8xl text-5xl  text-black mb-2 uppercase">
                    {t("questions")}
                </h2>
                <p className={`text-sm ${direction === "rtl" ? "font-arabic" : "font-secondary"} sm:text-base md:text-lg leading-6 text-black max-w-2xl`}>
                    {t("opposingCategories")}
                </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 gap-y-10 place-items-center'>
                {categoriesData?.map((category: any, index: number) => (
                    <ScoreCard
                        key={index}
                        category={category}
                        onScoreClick={onScoreClick}
                        direction={direction}
                    />
                ))}
            </div>
        </div>
    );
};

export default QuestionsScoreList;

type ScoreCardProps = {
    category: any;
    imageSrc?: string;
    onScoreClick?: (question: any) => void;
    direction?: string;
};

const ScoreCard: React.FC<ScoreCardProps> = ({ direction, category, onScoreClick }) => {
    const { session } = useGameSession();

    const answeredQuestionsIds = session?.gameData?.answers?.map((answer: any) => answer.questionId) || [];
    // Mark each question with answered=true if its _id is in answeredQuestionsIds
    category.questions = category.questions.map((question: any) => ({
        ...question,
        answered: answeredQuestionsIds.includes(question?.questionId)
    }));

    const handleClick = (question: any) => {
        onScoreClick?.(question);
    };


    return (
        <div className=" flex items-center justify-center  w-[240px] h-[110px] md:h-[130px] lg:h-[180px] md:w-[240px] lg:w-[320px] 2xl:w-[440px]">
            <div className="relative w-full h-full font-primary">
                <div className='w-full'>
                    {[0, 2, 4].map((rowIdx) => (
                        <div key={rowIdx} className='flex items-center justify-between'>
                            {[0, 1].map((colIdx) => {
                                const qIdx = rowIdx + colIdx;
                                const question = category.questions[qIdx];
                                return (
                                    <div
                                        key={qIdx}
                                        className={
                                            `${question?.answered ? "bg-gray-200 cursor-not-allowed pointer-events-none text-gray-500" : "bg-white cursor-pointer text-black"} border border-black w-[100px] md:h-10 lg:h-14 md:w-[120px] lg:w-[170px] 2xl:w-[200px] hover:bg-gray-200 -skew-x-12 text-2xl md:text-2xl lg:text-4xl flex items-center ` +
                                            (colIdx === 0 ? "justify-start px-4" : "justify-end px-4")
                                        }
                                        onClick={() => handleClick(question)}
                                    >
                                        {question?.questionPoints}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className="relative left-[75px] -top-[7.5rem] md:-top-[9rem] lg:-top-[12.2rem] md:left-[65px] lg:left-[85px] 2xl:left-[118px] w-fit flex flex-col justify-center items-center">
                    <div className={`w-24 h-24 md:w-28 md:h-28 lg:w-40 lg:h-40 bg-white rounded-full lg:border-[12px] md:border-[8px] border-[6px] border-orange flex items-center justify-center`}>
                        <Image src={"/images/quiz-app.png"} alt={category?.name} width={100} height={100} className='w-1/2 h-1/2' />
                    </div>
                    <div dir={direction} className={`relative truncate ${direction === "rtl" ? "font-arabic text-xl md:text-2xl text-nowrap" : "font-primary  text-xl md:text-2xl lg:text-3xl"} -mt-1 pb-0 w-full lg:w-40 2xl:w-52 md:pt-1 lg:pt-2 text-center text-white  uppercase bg-orange`}>
                        {category?.name}
                        <div className="absolute -top-[4px] -left-[15px] w-0 h-0 -rotate-[44deg] lg:border-l-[20px] lg:border-r-[20px] lg:border-b-[20px] md:border-l-[15px] md:border-r-[15px] md:border-b-[15px] border-l-transparent border-r-transparent border-b-white" />
                        <div className="absolute -top-[4px] rotate-[47deg] -right-[15px] w-0 h-0 lg:border-l-[20px] lg:border-r-[20px] lg:border-b-[20px]  md:border-l-[15px] md:border-r-[15px] md:border-b-[15px] border-l-transparent border-r-transparent border-b-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};



// <div className='w-full'>
// <div className='flex items-center justify-between'>
//     <div className='border border-black w-[100px] md:h-10 lg:h-14 md:w-[120px] lg:w-[170px] 2xl:w-[200px] cursor-pointer hover:bg-gray-200 text-2xl  -skew-x-12  md:text-2xl lg:text-4xl flex items-center justify-start px-4' onClick={() => handleClick(category.questions[0])}>{category.questions[0].questionPoints}</div>
//     <div className='border border-black w-[100px] md:h-10 lg:h-14 md:w-[120px] lg:w-[170px] 2xl:w-[200px] cursor-pointer hover:bg-gray-200 -skew-x-12 text-2xl  md:text-2xl lg:text-4xl flex items-center justify-end px-4' onClick={() => handleClick(category.questions[1])}>{category.questions[1].questionPoints}</div>
// </div>
// <div className='flex items-center justify-between'>
//     <div className='border border-black w-[100px] md:h-10 lg:h-14 md:w-[120px] lg:w-[170px] 2xl:w-[200px] cursor-pointer hover:bg-gray-200  -skew-x-12 text-2xl  md:text-2xl lg:text-4xl flex items-center justify-start px-4' onClick={() => handleClick(category.questions[2])}>{category.questions[2].questionPoints}</div>
//     <div className='border border-black w-[100px] md:h-10 lg:h-14 md:w-[120px] lg:w-[170px] 2xl:w-[200px] cursor-pointer hover:bg-gray-200 -skew-x-12 text-2xl  md:text-2xl lg:text-4xl flex items-center justify-end px-4' onClick={() => handleClick(category.questions[3])}>{category.questions[3].questionPoints}</div>
// </div>
// <div className='flex items-center justify-between'>
//     <div className='border border-black w-[100px] md:h-10 lg:h-14 md:w-[120px] lg:w-[170px] 2xl:w-[200px] cursor-pointer  hover:bg-gray-200 -skew-x-12 text-2xl  md:text-2xl lg:text-4xl flex items-center justify-start px-4' onClick={() => handleClick(category.questions[4])}>{category.questions[4].questionPoints}</div>
//     <div className='border border-black w-[100px] md:h-10 lg:h-14 md:w-[120px] lg:w-[170px] 2xl:w-[200px] cursor-pointer  hover:bg-gray-200 -skew-x-12 text-2xl  md:text-2xl lg:text-4xl flex items-center justify-end px-4' onClick={() => handleClick(category.questions[5])}>{category.questions[5].questionPoints}</div>
// </div>
// </div>

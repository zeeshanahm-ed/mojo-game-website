import Image from "next/image";
import { useTranslation } from "react-i18next";

const categories = [
    "Horror Movies",
    "Wrestling",
    "History",
    "Cricket",
    "Boxing",
    "Funny Memes"
];

type QuestionsScoreListProp = {
    onScoreClick?: (score: number, category: string) => void;
};

const QuestionsScoreList: React.FC<QuestionsScoreListProp> = ({ onScoreClick }) => {
    const { t } = useTranslation();
    return (
        <div className='flex justify-center flex-col'>
            <div className='text-center sm:text-start mb-10'>
                <h2 className="md:text-8xl text-5xl font-popfun text-black mb-2 uppercase">
                    {t("questions")}
                </h2>
                <p className="text-sm sm:text-base md:text-lg leading-6 text-black max-w-2xl">
                    {t("opposingCategories")}
                </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 gap-y-10 place-items-center'>
                {categories.map((category) => (
                    <ScoreCard
                        key={category}
                        title={category}
                        onScoreClick={onScoreClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default QuestionsScoreList;

type ScoreCardProps = {
    title: string;
    imageSrc?: string;
    onScoreClick?: (score: number, category: string) => void;
};

const ScoreCard: React.FC<ScoreCardProps> = ({ title, onScoreClick }) => {

    const handleClick = (score: number) => {
        onScoreClick?.(score, title);
    };


    return (
        <div className=" flex items-center justify-center font-popfun w-[240px] h-[110px] md:h-[130px] lg:h-[180px] md:w-[240px] lg:w-[320px] 2xl:w-[440px]">
            <div className="relative w-full h-full">
                <div className='w-full'>
                    <div className='flex items-center justify-between'>
                        <div className='border border-black w-[100px] md:h-10 lg:h-14 md:w-[120px] lg:w-[170px] 2xl:w-[200px] cursor-pointer hover:bg-gray-200 text-2xl  -skew-x-12  md:text-2xl lg:text-4xl flex items-center justify-start px-4' onClick={() => handleClick(200)}>200</div>
                        <div className='border border-black w-[100px] md:h-10 lg:h-14 md:w-[120px] lg:w-[170px] 2xl:w-[200px] cursor-pointer hover:bg-gray-200 -skew-x-12 text-2xl  md:text-2xl lg:text-4xl flex items-center justify-end px-4' onClick={() => handleClick(200)}>200</div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='border border-black w-[100px] md:h-10 lg:h-14 md:w-[120px] lg:w-[170px] 2xl:w-[200px] cursor-pointer hover:bg-gray-200  -skew-x-12 text-2xl  md:text-2xl lg:text-4xl flex items-center justify-start px-4' onClick={() => handleClick(400)}>400</div>
                        <div className='border border-black w-[100px] md:h-10 lg:h-14 md:w-[120px] lg:w-[170px] 2xl:w-[200px] cursor-pointer hover:bg-gray-200 -skew-x-12 text-2xl  md:text-2xl lg:text-4xl flex items-center justify-end px-4' onClick={() => handleClick(400)}>400</div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='border border-black w-[100px] md:h-10 lg:h-14 md:w-[120px] lg:w-[170px] 2xl:w-[200px] cursor-pointer  hover:bg-gray-200 -skew-x-12 text-2xl  md:text-2xl lg:text-4xl flex items-center justify-start px-4' onClick={() => handleClick(600)}>600</div>
                        <div className='border border-black w-[100px] md:h-10 lg:h-14 md:w-[120px] lg:w-[170px] 2xl:w-[200px] cursor-pointer  hover:bg-gray-200 -skew-x-12 text-2xl  md:text-2xl lg:text-4xl flex items-center justify-end px-4' onClick={() => handleClick(600)}>600</div>
                    </div>
                </div>

                <div className="relative left-[75px] -top-[7.5rem] md:-top-[9rem] lg:-top-[12.5rem] md:left-[65px] lg:left-[85px] 2xl:left-[118px] w-fit flex cursor-pointer flex-col justify-center items-center">
                    <div className={`w-24 h-24 md:w-28 md:h-28 lg:w-40 lg:h-40 bg-white rounded-full lg:border-[12px] md:border-[8px] border-[6px] border-orange flex items-center justify-center`}>
                        <Image src={"/categories-images/horror-movies.png"} alt={"hallo"} width={100} height={100} className='w-1/2 h-1/2' />
                    </div>
                    <div className={`relative -mt-1 pb-0 w-full lg:w-40 2xl:w-52 md:pt-1 lg:pt-2 text-center text-white font-popfun text-xl md:text-2xl lg:text-3xl uppercase bg-orange`}>
                        {title}
                        <div className="absolute -top-[4px] -left-[15px] w-0 h-0 -rotate-[44deg] lg:border-l-[20px] lg:border-r-[20px] lg:border-b-[20px] md:border-l-[15px] md:border-r-[15px] md:border-b-[15px] border-l-transparent border-r-transparent border-b-white" />
                        <div className="absolute -top-[4px] rotate-[47deg] -right-[15px] w-0 h-0 lg:border-l-[20px] lg:border-r-[20px] lg:border-b-[20px]  md:border-l-[15px] md:border-r-[15px] md:border-b-[15px] border-l-transparent border-r-transparent border-b-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

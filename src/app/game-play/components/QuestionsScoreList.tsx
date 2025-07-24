import Image from "next/image";

type QuestionsScoreListProp = {
    imageSrc?: string;
    title?: string;
    scores?: number[]; // Should be 3 scores
    onScoreClick?: (value: string) => void;
};

const QuestionsScoreList: React.FC<QuestionsScoreListProp> = ({ onScoreClick }) => {
    return (
        <div className='flex justify-center flex-col'>
            <div className='text-center sm:text-start mb-10'>
                <h2 className="md:text-8xl text-5xl font-popfun text-black mb-2 uppercase">
                    Questions
                </h2>
                <p className="text-sm sm:text-base md:text-lg leading-6 text-black max-w-2xl">
                    and 3 categories for the opposing team.
                </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 gap-y-10 place-items-center'>
                <ScoreCard onScoreClick={onScoreClick} />
                <ScoreCard onScoreClick={onScoreClick} />
                <ScoreCard onScoreClick={onScoreClick} />
                <ScoreCard onScoreClick={onScoreClick} />
                <ScoreCard onScoreClick={onScoreClick} />
                <ScoreCard onScoreClick={onScoreClick} />
            </div>
        </div>
    );
};

export default QuestionsScoreList;

type ScoreCardProps = {
    imageSrc?: string;
    title?: string;
    scores?: number[]; // Should be 3 scores
    onScoreClick?: (value: string) => void;
};

const ScoreCard: React.FC<ScoreCardProps> = ({ onScoreClick }) => {
    return (
        <div className=" flex items-center justify-center font-popfun w-[220px] h-[110px] md:h-[130px] lg:h-[180px] md:w-[240px] lg:w-[320px] xl:w-[440px]">
            <div className="relative w-full h-full">
                <div className='w-full'>
                    <div className='flex items-center justify-between'>
                        <div className='border border-black w-[100px] md:h-10 lg:h-14 md:w-[120px] lg:w-[170px] xl:w-[200px] cursor-pointer hover:bg-gray-200 text-2xl  -skew-x-12  md:text-2xl lg:text-4xl flex items-center justify-start px-4' onClick={() => onScoreClick && onScoreClick("onlineQuestion")}>200</div>
                        <div className='border border-black w-[100px] md:h-10 lg:h-14 md:w-[120px] lg:w-[170px] xl:w-[200px] cursor-pointer hover:bg-gray-200 -skew-x-12 text-2xl  md:text-2xl lg:text-4xl flex items-center justify-end px-4' onClick={() => onScoreClick && onScoreClick("offlineQuestion")}>200</div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='border border-black w-[100px] md:h-10 lg:h-14 md:w-[120px] lg:w-[170px] xl:w-[200px] cursor-pointer hover:bg-gray-200  -skew-x-12 text-2xl  md:text-2xl lg:text-4xl flex items-center justify-start px-4'>400</div>
                        <div className='border border-black w-[100px] md:h-10 lg:h-14 md:w-[120px] lg:w-[170px] xl:w-[200px] cursor-pointer hover:bg-gray-200 -skew-x-12 text-2xl  md:text-2xl lg:text-4xl flex items-center justify-end px-4'>400</div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='border border-black w-[100px] md:h-10 lg:h-14 md:w-[120px] lg:w-[170px] xl:w-[200px] cursor-pointer  hover:bg-gray-200 -skew-x-12 text-2xl  md:text-2xl lg:text-4xl flex items-center justify-start px-4'>600</div>
                        <div className='border border-black w-[100px] md:h-10 lg:h-14 md:w-[120px] lg:w-[170px] xl:w-[200px] cursor-pointer  hover:bg-gray-200 -skew-x-12 text-2xl  md:text-2xl lg:text-4xl flex items-center justify-end px-4'>600</div>
                    </div>
                </div>

                <div className="relative left-[60px] -top-[8rem] md:-top-[9.3rem] lg:-top-[12.6rem] md:left-[65px] lg:left-[85px] xl:left-[140px] w-fit flex cursor-pointer flex-col justify-center items-center">
                    <div className={`w-24 h-24 md:w-28 md:h-28 lg:w-40 lg:h-40 bg-white rounded-full lg:border-[12px] md:border-[8px] border-[6px] border-orange flex items-center justify-center`}>
                        <Image src={"/categories-images/horror-movies.png"} alt={"hallo"} width={100} height={100} className='w-1/2 h-1/2' />
                    </div>
                    <div className={`relative -mt-1 lg:pb-1 pb-0 pt-1 md:pt-2 px-2 lg:px-6 text-center text-white font-popfun text-2xl md:text-2xl lg:text-3xl uppercase tracking-wide bg-orange`}
                    >
                        {"Horror Movies"}
                        {/* Left Triangle */}
                        <div className="absolute -top-[3px] -left-[15px] w-0 h-0 -rotate-[44deg] lg:border-l-[20px] lg:border-r-[20px] lg:border-b-[20px] md:border-l-[15px] md:border-r-[15px] md:border-b-[15px] border-l-transparent border-r-transparent border-b-white" />
                        {/* Right Triangle */}
                        <div className="absolute -top-[3px] rotate-[47deg] -right-[15px] w-0 h-0 lg:border-l-[20px] lg:border-r-[20px] lg:border-b-[20px]  md:border-l-[15px] md:border-r-[15px] md:border-b-[15px] border-l-transparent border-r-transparent border-b-white" />
                    </div>
                </div>
            </div>
        </div>
    );
}
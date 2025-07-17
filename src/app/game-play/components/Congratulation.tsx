import Image from "next/image";
import GroupIcon from "@/app/assets/icons/group-icon.svg"
import Button from "@/app/components/ui/common/Button";
import CongratulationImage from "@/app/assets/images/congratulation-image.png";
import { useRouter } from "next/navigation";

type QuestionsScoreListProp = {
    imageSrc?: string;
    title?: string;
    scores?: number[]; // Should be 3 scores
    onClick?: (value: string) => void;
};

const Congratulation: React.FC<QuestionsScoreListProp> = () => {
    const router = useRouter();
    return (
        <div className='relative flex items-center sm:items-start justify-center flex-col'>
            <div className="md:-right-36 rotate-[150deg] md:rotate-0 -top-[370px] right-[150px] md:-top-24 w-[30rem] h-[40rem] absolute">
                <Image src={CongratulationImage} alt='Congratulation' className='object-contain w-full h-full' />
            </div>
            <div className='text-center sm:text-start mb-10'>
                <h2 className="md:text-8xl text-5xl font-popfun text-[#75C704] mb-2 uppercase">
                    congratulations
                </h2>
                <p className="text-sm sm:text-base md:text-lg leading-6 text-black max-w-2xl">
                    An interactive group game in which we test your knowledge and culture.
                </p>
            </div>
            <div className="flex justify-center sm:justify-start flex-row gap-4 sm:gap-8 font-popfun">
                {/* H2 Team Card (Blue - Winner) */}
                <div className=" md:w-60 -skew-x-3  p-4 sm:p-6 flex flex-col items-center justify-center text-center border-4 border-dark-blue text-blue-500">
                    <div className="mb-4">
                        <GroupIcon className="w-8 h-8 sm:h-12 sm:w-12 text-dark-blue fill-dark-blue" />
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl uppercase text-dark-blue">H2 TEAM</h2>
                    <p className="text-2xl sm:text-3xl md:text-4xl -mt-2  uppercase mb-4 leading-tight text-dark-blue">HAS WON THE GAME</p>
                    <p className="text-black text-xl sm:text-3xl md:text-4xl">200 SCORE</p>
                </div>

                {/* H1 Team Card (Red - Loser) */}
                <div className=" md:w-60 sm:h-52 -skew-x-3 mt-auto p-4 sm:p-6 flex flex-col items-center justify-center text-center border-4 border-red text-blue-500">
                    <div className="mb-4">
                        <GroupIcon className="w-8 h-8 sm:h-12 sm:w-12 text-red fill-red" />
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl uppercase text-red">H1 TEAM</h2>
                    <p className="text-black text-xl sm:text-3xl md:text-4xl">200 SCORE</p>
                </div>
            </div>
            <Button
                onClick={() => router.push("/offline-play")}
                className="text-3xl sm:text-4xl sm:px-16 mt-10 -skew-x-6 w-fit"
                style={{ boxShadow: "none", }}>
                Play again
            </Button>
        </div >
    );
};

export default Congratulation;
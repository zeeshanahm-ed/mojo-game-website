'use client';

import Image, { StaticImageData } from 'next/image';
import WorldImage from '../../assets/images/world.png';
import RocketImage from '../../assets/images/rocket.png';
import StarImage from '../../assets/images/star.png';
import LightBulbImage from '../../assets/images/light-bulb.png';
import BookImage from '../../assets/images/book.png';
import PrivateGameImage from '../../assets/images/private-game.png';
import KidsGameImage from '../../assets/images/kids-quest.png';
import StudentGameImage from '../../assets/images/student-quest.png';
import CreateGameImage from '../../assets/images/create-game.png';
import RamadanGameImage from '../../assets/images/ramadan-quest.png';

export default function Banner() {
    return (
        <section className="w-full bg-red text-white px-10 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
                {/* Left: Text + Buttons */}
                <div>
                    <h1 className="text-4xl md:text-5xl lg:text-9xl font-popfun leading-tight">
                        CHALLENGE YOUR <br />
                        <span className="text-yellow">MIND</span> WITH ULTIMATE <br />
                        QUIZ EXPERIENCE
                    </h1>
                    <p className="text-sm md:text-base">The answer is up to you, and the question is up to us</p>

                    <div className="mt-10 flex gap-5">
                        <div className={`relative cursor-pointer text-black skew-custom w-[240px] h-[210px] py-4 px-6 border-[6px] border-black bg-yellow flex-col flex justify-center`}>
                            <div className='font-popfun text-8xl'>CREATE</div>
                            <div className='font-popfun text-[60px] -mt-5'> A GAME</div>
                            <Image src={CreateGameImage} alt="CREATE" className="absolute w-14 h-14 inline-block mt-auto bottom-9 right-2" />
                        </div>
                        <div className='space-y-2'>
                            <GameCard image={StudentGameImage} title="MOJO" subtitle="STUDENTS" bgColor="bg-orange" />
                            <GameCard image={RamadanGameImage} title="MOJO" subtitle="RAMADAN" bgColor="bg-light-green" className="-ml-2" />
                        </div>
                        <div className='space-y-2'>
                            <GameCard image={KidsGameImage} title="MOJO" subtitle="kIDS QUEST" bgColor="bg-green" />
                            <GameCard image={PrivateGameImage} title="MOJO" subtitle="PRIVATE GAME" bgColor="bg-light-blue" className="-ml-2" />
                        </div>
                    </div>
                </div>

                {/* Right: Images */}
                <div className="relative h-full">
                    <Image
                        src={WorldImage}
                        alt="World"
                        className="absolute -right-10 -top-14 w-[200px] lg:w-[300px]"
                    />
                    <Image
                        src={StarImage}
                        alt="Star"
                        className="w-[45px] h-[55px]"
                    />
                    <div className='flex mt-20'>
                        <Image
                            src={RocketImage}
                            alt="Rocket"
                            className="w-[200px] h-[200px]"
                        />
                        <Image
                            src={LightBulbImage}
                            alt="Rocket"
                            width={180}
                            height={180}
                            className="w-[180px] h-[180px] self-end"
                        />
                    </div>
                    <Image
                        src={BookImage}
                        alt="Book"
                        className="absolute right-[25%] bottom-[5%] w-[120px] lg:w-[220px]"
                    />
                </div>
            </div>
        </section>
    );
}

interface GameCardProps {
    image: StaticImageData;
    bgColor: string;
    title: string;
    subtitle: string;
    centered?: boolean;
    onClick?: () => void;
    className?: string;
}

function GameCard({
    image,
    bgColor,
    title,
    subtitle,
    onClick,
    className
}: GameCardProps) {
    return (
        <div
            onClick={onClick}
            className={`relative cursor-pointer text-black skew-custom w-[220px] h-[100px] py-4 px-6 border-[6px] border-black ${bgColor} ${className} flex-col flex`}
        >

            <div className='font-bulletproof text-base'>{title}</div>
            <div className='font-popfun text-5xl'>
                {subtitle}
            </div>
            <Image src={image} alt={title} className="absolute w-6 h-6 inline-block mt-auto top-2 right-2" />
        </div>
    );
}
import React from 'react';

//icons
import OfflineImage from "../../../assets/images/offlinemode-image.png"
import OnlineImage from "../../../assets/images/onlinemode-image.png"
import Image from 'next/image';

const PlayingModeSection: React.FC = () => {
  return (
    <section className="w-full bg-orange py-16 px-4 md:px-8 flex flex-col items-center justify-center">
      <div className="relative z-10 flex flex-col items-center max-w-4xl text-center">
        <h2 className="text-black text-6xl lg:text-8xl font-popfun leading-tight mb-4 uppercase">
          PLAYING MODES
        </h2>
        <p className="text-black text-base lg:text-xl mb-12 max-w-2xl">
          It is a fun cultural game suitable for all ages, testing your group's knowledge. The
          game includes all types of questions according to the selected category.
        </p>

        {/* Playing Mode Cards */}
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-12">
          <div className="w-64 skew-custom h-64 bg-green border-[6px] font-popfun border-black flex flex-col items-center justify-center p-6 gap-5">
            <Image src={OfflineImage} alt='Offline Mode' className='w-28 h-28' />
            <p className="text-black text-7xl uppercase">
              OFFLINE <span className="text-5xl">PLAY</span>
            </p>
          </div>

          {/* Online Play Card */}
          <div className="w-64 h-64 skew-custom bg-yellow font-popfun border-[6px] border-black flex flex-col items-center justify-center p-6 gap-5">
            <Image src={OnlineImage} alt='Online Mode' className='w-28 h-28' />
            <p className="text-black text-7xl uppercase" >
              ONLINE <span className="text-5xl">PLAY</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayingModeSection;
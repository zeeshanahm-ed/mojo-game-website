import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Wrapper from '../common/Wrapper';
import { useTranslation } from 'react-i18next';

//icons
import OfflineImage from "@/app/assets/images/offlinemode-image.png"
import OnlineImage from "@/app/assets/images/onlinemode-image.png"
import { useDirection } from '@/app/hooks/useGetDirection';

const PlayingModeSection: React.FC = () => {
  const { t } = useTranslation();
  const direction = useDirection();
  const router = useRouter();

  const handleNavigate = (type: string) => {
    if (type === 'online') {
      router.push('/online-play'); // ✅ client-side navigation
    } else if (type === 'offline') {
      router.push('/offline-play'); // ✅ client-side navigation
    }
  };

  return (
    <section className="w-full bg-orange">
      <Wrapper>
        <div className='w-full py-16 px-4 md:px-10 flex flex-col items-center justify-center'>
          <div className="relative z-10 flex flex-col items-center max-w-4xl text-center">
            <h2 className="text-black text-6xl lg:text-8xl  mb-2 uppercase">
              {t("playingModes")}
            </h2>
            <p className="text-black font-secondary text-sm md:text-base xl:text-xl mb-12 max-w-2xl">
              {t("playingModeseDescription")}
            </p>

            {/* Playing Mode Cards */}
            <div className="flex flex-row items-center gap-5">
              <div className="w-36 xsm:w-44 sm:w-56 md:w-64 cursor-pointer skew-custom h-44 sm:h-52 md:h-64 bg-green border-[4px] sm:border-[6px]  border-black flex flex-col items-center justify-center px-4 md:px-6 gap-5"
                onClick={() => handleNavigate("offline")}>
                <Image src={OfflineImage} alt='Offline Mode' className='sm:w-20 w-16 h-auto md:w-24 xl:w-28' />
                <p dir={direction} className="text-black text-5xl md:text-6xl xl:text-7xl uppercase flex">
                  {t('offline')}
                  <span className="sm:text-4xl text-3xl md:text-4xl xl:text-5xl mt-2 ml-2 md:mt-4">
                    {t('play')}
                  </span>
                </p>
              </div>

              {/* Online Play Card */}
              <div className="w-36 xsm:w-44 sm:w-56 md:w-64 cursor-pointer h-44 sm:h-52 md:h-64 skew-custom bg-yellow  border-[4px] sm:border-[6px] border-black flex flex-col items-center justify-center px-4 md:px-6 gap-5"
                onClick={() => handleNavigate("online")}>
                <Image src={OnlineImage} alt='Online Mode' className='sm:w-20 w-16 h-auto md:w-24 xl:w-28' />
                <p dir={direction} className="text-black text-5xl md:text-6xl xl:text-7xl uppercase flex">
                  {t('online')}
                  <span className="sm:text-4xl text-3xl md:text-4xl xl:text-5xl mt-2 ml-2 md:mt-4">
                    {t('play')}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default PlayingModeSection;
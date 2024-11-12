import { React, useState, useMemo } from 'react';
import HeroRightContainer from "./Sub-component/HeroRightContainer";
import CarouselBanner from './Sub-component/CarouselBanner';
import gamedata from "../../Data/gamedata.json";

const Hero = () => {
  const randomData = useMemo(() => {
    return [...gamedata]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
  }, []);

  const [selectedId, setSelectedId] = useState(randomData[0]?.id || null);

  return (
    <div className='w-full px-[135px] flex py-10 bg-gray-900'>
      <div className='w-[70%]'>
        <CarouselBanner selectedId={selectedId} initialData={randomData[0]} />
      </div>
      <div className='w-[30%] pl-[24px]'>
        <HeroRightContainer name="" setSelectedId={setSelectedId} randomData={randomData} />
      </div>
    </div>
  );
};

export default Hero;
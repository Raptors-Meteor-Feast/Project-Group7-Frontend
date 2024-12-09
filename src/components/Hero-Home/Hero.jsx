import { React, useState, useMemo, useEffect } from 'react';
import HeroRightContainer from "./Sub-component/HeroRightContainer";
import CarouselBanner from './Sub-component/CarouselBanner';
import api from "../../Instance";

const Hero = () => {
  const [gameData, setGameData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/game');
        const data = response.data.game;

        const randomData = data
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);

          setGameData(randomData);
        setSelectedId(randomData[0]?._id || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-full px-[135px] flex py-10 bg-gray-900'>
      <div className='w-[70%]'>
        <CarouselBanner selectedId={selectedId} initialData={gameData[0]} />
      </div>
      <div className='w-[30%] pl-[24px]'>
        <HeroRightContainer name="" setSelectedId={setSelectedId} randomData={gameData} />
      </div>
    </div>
  );
};

export default Hero;

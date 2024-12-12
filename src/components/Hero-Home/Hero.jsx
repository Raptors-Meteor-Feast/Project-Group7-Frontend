import React, { useState, useEffect } from 'react';
import HeroRightContainer from "./Sub-component/HeroRightContainer";
import CarouselBanner from './Sub-component/CarouselBanner';
import api from "../../Instance";

const Hero = () => {
  const [gameData, setGameData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    if (gameData.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % gameData.length;
          setSelectedId(gameData[newIndex]._id);
          return newIndex;
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [gameData]);

  const handleCardSelection = (id) => {
    const newIndex = gameData.findIndex((game) => game._id === id);
    if (newIndex !== -1) {
      setCurrentIndex(newIndex);
      setSelectedId(id);
    }
  };

  return (
    <div className='w-full px-[135px] flex py-10 bg-neutral-900'>
      <div className='w-[70%]'>
        <CarouselBanner selectedId={selectedId} />
      </div>
      <div className='w-[30%] pl-[24px]'>
        <HeroRightContainer
          name=""
          setSelectedId={handleCardSelection}
          randomData={gameData}
          selectedId={selectedId}
        />
      </div>
    </div>
  );
};

export default Hero;

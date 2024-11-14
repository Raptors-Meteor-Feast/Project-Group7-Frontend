import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import gamedata from "../../../Data/gamedata.json";

function CarouselImage({ gameId }) {
  const [current, setCurrent] = useState(0);
  const [mainContent, setMainContent] = useState({
    title: "",
    imgUrl: "",
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const thumbnailContainerRef = useRef(null);

  const gameData = gamedata.find((game) => game.id === parseInt(gameId));

  useEffect(() => {
    if (gameData) {
      setMainContent({
        title: gameData.title,
        imgUrl: gameData.pictureaddress,
      });
      setSelectedImageIndex(null);
    }
  }, [gameData]);

  useEffect(() => {
    const container = thumbnailContainerRef.current;
    const selectedThumbnail = container?.children[selectedImageIndex];
    if (container && selectedThumbnail) {
      const offsetLeft =
        selectedThumbnail.offsetLeft - container.offsetWidth / 2 + selectedThumbnail.offsetWidth / 2;
      container.scrollTo({ left: offsetLeft, behavior: "smooth" });
    }
  }, [selectedImageIndex]);

  const previousSlide = () => {
    const newCurrent = current === 0 ? gameData.exampicture.length - 1 : current - 1;
    setCurrent(newCurrent);
    setSelectedImageIndex(newCurrent);
    setMainContent({
      ...mainContent,
      imgUrl: gameData.exampicture[newCurrent],
    });
  };

  const nextSlide = () => {
    const newCurrent = current === gameData.exampicture.length - 1 ? 0 : current + 1;
    setCurrent(newCurrent);
    setSelectedImageIndex(newCurrent);
    setMainContent({
      ...mainContent,
      imgUrl: gameData.exampicture[newCurrent],
    });
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    setCurrent(index);
    setMainContent({
      ...mainContent,
      imgUrl: gameData.exampicture[index],
    });
  };

  return (
    <div>
      <div className="overflow-hidden relative rounded-xl">
        <motion.div
          key={mainContent.imgUrl}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
          className="flex transition ease-out duration-400"
        >
          <img src={mainContent.imgUrl} alt="Main Image" />
        </motion.div>

        <div className="absolute top-0 h-full w-full flex justify-between items-center text-white px-4">
          <button onClick={previousSlide}>
            <IoIosArrowBack size={50} />
          </button>
          <button onClick={nextSlide}>
            <IoIosArrowForward size={50} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          ref={thumbnailContainerRef}
          className="flex overflow-x-auto pt-6 gap-4 justify-center"
        >
          {gameData.exampicture.map((item, index) => (
            <div
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className="hover:cursor-pointer"
            >
              <img
                src={item}
                width={160}
                height={108}
                className={`rounded-lg h-full ${
                  selectedImageIndex === index ? "border-2 border-blue-500" : "opacity-60"
                }`}
                alt={`Thumbnail ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarouselImage;

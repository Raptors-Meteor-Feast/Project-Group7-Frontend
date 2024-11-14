import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import gamedata from "../../Data/gamedata.json";

function CarouselImage() {
  const [current, setCurrent] = useState(0);
  const [mainContent, setMainContent] = useState({
    title: "",
    imgUrl: "",
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const imagesData = gamedata;

  useEffect(() => {
    setMainContent(() => ({
      title: imagesData[current].title,
      imgUrl: imagesData[current].pictureaddress,
    }));
  }, [current]);

  const previousSlide = () => {
    const newCurrent = current === 0 ? imagesData.length - 1 : current - 1;
    setCurrent(newCurrent);
    setSelectedImageIndex(0);
  };

  const nextSlide = () => {
    const newCurrent = current === imagesData.length - 1 ? 0 : current + 1;
    setCurrent(newCurrent);
    setSelectedImageIndex(0);
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index + 1);
    setMainContent(() => ({
      title: imagesData[current].title,
      imgUrl: imagesData[current].pictureaddress,
    }));
  };

  return (
    <div>
      <div className="text-2xl font-bold pb-3">{mainContent.title}</div>
      <div className="overflow-hidden relative rounded-xl">
        <div className="flex transition ease-out duration-400">
          <img src={mainContent.imgUrl} alt="Main Image" />
        </div>

        <div className="absolute top-0 h-full w-full flex justify-between items-center text-white px-4">
          <button disabled={current === 0} onClick={previousSlide}>
            <IoIosArrowBack size={50} />
          </button>
          <button onClick={nextSlide}>
            <IoIosArrowForward size={50} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="flex transition ease-out duration-400 pt-6 gap-4 justify-center">
          {imagesData[current].exampicture.map((item, index) => (
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
                  selectedImageIndex - 1 === index ? "bg-white" : "opacity-60"
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

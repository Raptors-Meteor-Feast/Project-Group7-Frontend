import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import GameData from "../../assets/Data/GameData.json";

function CaroselImage() {
  const [current, setCurrent] = useState(0);
  const slides = GameData;

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <>
      <div className="overflow-hidden relative rounded-xl">
        <div
          className={`flex transition ease-out duration-400`}
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {slides.map((item) => {
            return (
              <img key={item.id} src={item.pictureaddress} alt={item.title} />
            );
          })}
        </div>

        <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-4">
          <button onClick={previousSlide}>
            <IoIosArrowBack size={50} />
          </button>
          <button onClick={nextSlide}>
            <IoIosArrowForward size={50} />
          </button>
        </div>
      </div>
      <div className="overflow-hidden ">
        <div className="flex transition ease-out duration-400 pt-6 gap-4 justify-center">
          {slides[current].exampicture.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setCurrent(index);
                }}
                className="hover:cursor-pointer"
              >
                <img
                  src={item}
                  width={160}
                  height={108}
                  className={`rounded-lg h-full ${
                    index == current ? "bg-white" : "opacity-60"
                  }`}
                  alt={`Thumbnail ${index + 1}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CaroselImage;

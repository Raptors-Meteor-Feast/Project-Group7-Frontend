import { div } from "framer-motion/client";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function CaroselIamge({ slides }) {
  const [current, setCurrent] = useState(0);

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
          {slides.map((s) => {
            return <img src={s} />;
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
          {slides.map((s, i) => {
            return (
              <div
                key={"image" + i}
                onClick={() => {
                  setCurrent(i);
                }}
                className="hover:cursor-pointer"
              >
                <img
                  src={s}
                  width={160}
                  height={108}
                  className={`rounded-lg ${
                    i == current ? "bg-white" : "contrast-50"
                  } hover: hover:bg-gray-300`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CaroselIamge;

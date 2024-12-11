import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import api from "../../../Instance";

function CarouselImage({ currentIndex, gameImages, setCurrentIndex, setGameImages }) {
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [gameImages, setGameImages] = useState([]);  // เก็บภาพทั้งหมด
  const thumbnailContainerRef = useRef(null);
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await api.get(`game/${gameId}`);
  //       const images = response.data?.game?.images || [];
  //       setGameImages(images);
  //       setCurrentIndex(0);  // เริ่มต้นที่ภาพแรก
  //     } catch (error) {
  //       console.error("Error fetching game images:", error);
  //     }
  //   };
  //   fetchData();
  // }, [gameId]);

  useEffect(() => {
    const container = thumbnailContainerRef.current;
    const selectedThumbnail = container?.children[currentIndex];
    if (container && selectedThumbnail) {
      const offsetLeft =
        selectedThumbnail.offsetLeft - container.offsetWidth / 2 + selectedThumbnail.offsetWidth / 2;
      container.scrollTo({ left: offsetLeft, behavior: "smooth" });
    }
  }, [currentIndex]);

  const previousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? gameImages.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === gameImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  if (gameImages.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Section สำหรับภาพหลัก */}
      <div className="relative overflow-hidden rounded-xl group">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <img
            src={gameImages[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="w-full h-auto"
          />
          {/* เงาด้านซ้าย */}
          <div
            className="absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-800 ease-in-out cursor-pointer"
            onClick={previousSlide} // เพิ่ม onClick เพื่อเปลี่ยนภาพ
          ></div>
          {/* เงาด้านขวา */}
          <div
            className="absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-800 ease-in-out cursor-pointer"
            onClick={nextSlide} // เพิ่ม onClick เพื่อเปลี่ยนภาพ
          ></div>
        </motion.div>
        <div className="absolute top-0 h-full w-full flex justify-between items-center text-white px-4 pointer-events-none">
          <button onClick={previousSlide} className="pointer-events-auto">
            <IoIosArrowBack size={50} />
          </button>
          <button onClick={nextSlide} className="pointer-events-auto">
            <IoIosArrowForward size={50} />
          </button>
        </div>
      </div>

      {/* Section สำหรับ Thumbnail */}
      <div className="overflow-hidden pt-6">
        <div
          ref={thumbnailContainerRef}
          className="flex overflow-x-auto gap-4 justify-center"
        >
          {gameImages.map((image, index) => (
            <div
              key={index}
              className={`relative w-[160px] h-[108px] rounded-lg cursor-pointer ${
                currentIndex === index ? "border-2 border-blue-500" : "opacity-60"
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              {currentIndex === index && (
                <div className="absolute inset-0 border-2 border-blue-500 rounded-lg"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarouselImage;

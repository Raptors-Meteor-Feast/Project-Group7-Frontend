import React, { useEffect, useState } from "react";
import { Card, CardBody, Image, CardFooter, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function CardNews() {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/news`)
      .then((res) => {
        console.log(res.data); // debugging
        // Set news to res.data.news if it's an array, else set to an empty array
        setNewsData(Array.isArray(res.data.data) ? res.data.data : []);
      })
      .catch((err) => console.log(err));
  }, []);

  const itemsPerPage = 3;

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + itemsPerPage) % newsData.length);
  };

  const handlePrev = () => {
    setStartIndex(
      (prevIndex) =>
        (prevIndex - itemsPerPage + newsData.length) % newsData.length
    );
  };

  const currentData = newsData.slice(startIndex, startIndex + itemsPerPage);
  console.log(currentData);

  const handleClick = (_id) => {
    navigate(`/news/${_id}`);
  };

  if (!newsData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full px-[135px] py-14 bg-neutral-900">
        <div className="flex justify-between">
          <h2 className="mb-5 text-[28px] font-bold text-white">News</h2>
          <div className="flex justify-end mb-4">
            <Button
              onClick={handlePrev}
              className="mr-2 px-5 py-1 bg-[#252525] text-white rounded-full text-2xl hover:text-3xl"
            >
              <IoIosArrowBack className="transform transition-all duration-300" />
            </Button>
            <Button
              onClick={handleNext}
              className="px-5 py-1 bg-[#252525] text-white rounded-full text-2xl hover:text-3xl"
            >
              <IoIosArrowForward className="transform transition-all duration-300" />
            </Button>
          </div>
        </div>
        <div className="gap-[40px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3">
          {currentData.map((item, index) => (
            <Card
              key={index}
              shadow="sm"
              isPressable
              onClick={() => handleClick(item._id)}
              className="drop-shadow-md hover:bg-gray-300 transform transition-all duration-300 hover:scale-105 hover:[box-shadow:_0_0_10px_white,_0_0_20px_white]"
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  isBlurred
                  alt={item.newsHeading}
                  className="w-full object-cover h-[300px]"
                  src={item.newsImageUrl}
                />
              </CardBody>
              <CardFooter className="text-small flex flex-col justify-start items-start">
                <div className="flex flex-col text-left gap-3 px-3">
                  <p className="h-[48px] text-[18px] font-bold text-default-700 items-center">
                    {item.newsHeading}
                  </p>
                  <p className="text-[16px] line-clamp-3 text-default-700">
                    {item.newsContent}
                  </p>
                </div>
                <div className="px-3 pt-3">
                  <a className="text-default-500 underline">
                    Readmore
                  </a>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const GenresCard = ({ setSelectedCategory }) => {
    const navigate = useNavigate();
    const [gameData, setGameData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState({});
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 3;

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/game`);
            const games = response.data.game;
            const shuffledData = [...games].sort(() => 0.5 - Math.random());
            setGameData(shuffledData);

            const uniqueCategories = [
                ...new Set(games.flatMap((game) => game.categories)),
            ];
            setCategories(uniqueCategories);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/game/${id}`);
    };

    const handleHoverEnter = (category, index) => {
        setHoveredIndex((prev) => ({ ...prev, [category]: index }));
    };

    const handleHoverLeave = (category) => {
        setHoveredIndex((prev) => ({ ...prev, [category]: null }));
    };

    const handleNext = () => {
        setStartIndex((prevIndex) => (prevIndex + itemsPerPage) % categories.length);
    };

    const handlePrev = () => {
        setStartIndex((prevIndex) => (prevIndex - itemsPerPage + categories.length) % categories.length);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };


    return (
        <div className="w-full px-[150px] py-10 bg-neutral-900">
            <div className='flex justify-between pb-2 px-[100px]'>
                <h2 className='mb-1 text-[28px] font-bold text-white'>GENRES</h2>
                <div className="flex justify-end mb-2">
                <Button onClick={handlePrev} className="mr-2 px-5 py-1 bg-[#252525] text-white rounded-full text-2xl hover:text-3xl"><IoIosArrowBack className='transform transition-all duration-300'/></Button>
                <Button onClick={handleNext} className="px-5 py-1 bg-[#252525] text-white rounded-full text-2xl hover:text-3xl"><IoIosArrowForward className='transform transition-all duration-300'/></Button>
                </div>
            </div>            
            <div className="flex flex-wrap gap-6 justify-center">
                {categories.slice(startIndex, startIndex + itemsPerPage).map((category) => (
                <Button
                    key={category}
                    className="relative bg-[#252525] rounded-lg p-1 shadow-lg flex-shrink-0 w-[30%] h-[250px] cursor-pointer transform transition-all duration-300 hover:scale-105 hover:[box-shadow:_0_0_10px_white,_0_0_20px_white]"
                    onClick={() => handleCategoryClick(category)}
                >
                    <h3 className="absolute top-2 left-[50%] -translate-x-1/2 text-white text-lg font-semibold text-center whitespace-nowrap">
                        {category.toUpperCase()}
                    </h3>
                    <div className="flex items-center justify-center  h-full">
                        {gameData
                            .filter((game) => game.categories.includes(category))
                            .slice(0, 4) 
                            .map((game, index) => (
                            <motion.div
                                key={game._id}
                                className={`absolute transition-all duration-300 ${
                                    index === 0
                                        ? "z-10 left-[12%] -translate-x-1/2"
                                        : index === 1
                                        ? "z-8 left-[27%]"
                                        : index === 2
                                        ? "z-6 left-[42%]"
                                        : "z-4 left-[54%]"
                                }`}
                                style={{
                                    zIndex:
                                        hoveredIndex[category] === index
                                            ? 10 
                                            : 10 - index * 1,
                                    transform: `scale(${
                                        hoveredIndex[category] === index
                                            ? 1.1
                                            : 1 - index * 0.1
                                    })`,
                                    filter:
                                        hoveredIndex[category] === null
                                            ? index === 0
                                                ? "brightness(0.5)"
                                                : "brightness(0.5)"
                                            : hoveredIndex[category] === index
                                            ? "brightness(1)"
                                            : "brightness(0.5)",
                                }}
                                onMouseEnter={() => handleHoverEnter(category, index)}
                                onMouseLeave={() => handleHoverLeave(category)}
                            >
                                <Card
                                    shadow="md"
                                    isPressable
                                    className="w-[200px] h-[150px] hover:[box-shadow:_0_0_10px_white,_0_0_20px_white,_0_0_30px_white,_0_0_40px_white] hover:bg-gray-300 transition-transform transform duration-300 ease-in-out"
                                    onClick={() => handleCardClick(game._id)}
                                >
                                <CardBody className="overflow-visible p-0">
                                    <Image
                                        shadow="sm"
                                        radius="lg"
                                        width="100%"
                                        isBlurred
                                        alt={game.title}
                                        className="w-full object-cover h-[150px]"
                                        src={game.images[0]}
                                    />
                                </CardBody>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </Button>
                ))}
            </div>
        </div>
    );
};

export default GenresCard;

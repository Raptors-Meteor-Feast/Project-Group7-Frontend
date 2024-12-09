import React, { useState, useEffect } from 'react';
import { Card, CardBody, Image, CardFooter, Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import api from "../../Instance";

const RecommendCard = ({ name }) => {
    const navigate = useNavigate();
    const [gameData, setGameData] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await api.get("/game");
                const data = response.data.game;
                const shuffledData = [...data].sort(() => 0.5 - Math.random());
                setGameData(shuffledData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchGameData();
    }, []);

    const handleNext = () => {
        setStartIndex((prevIndex) => (prevIndex + itemsPerPage) % gameData.length);
    };

    const handlePrev = () => {
        setStartIndex((prevIndex) => (prevIndex - itemsPerPage + gameData.length) % gameData.length);
    };

    const handleCardClick = (id) => {
        navigate(`/game/${id}`);
    };

    return (
        <div className='w-full px-[135px] py-10 bg-gray-800'>
            <div className='flex justify-between'>
                <h2 className='mb-5 text-[28px] font-bold text-white'>{name}</h2>
                <div className="flex justify-end mb-4">
                    <Button onClick={handlePrev} className="mr-2 px-5 py-1 bg-gray-700 text-white rounded-full">←</Button>
                    <Button onClick={handleNext} className="px-5 py-1 bg-gray-700 text-white rounded-full">→</Button>
                </div>
            </div>
            <div className='gap-[22px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5'>
                {gameData.slice(startIndex, startIndex + itemsPerPage).map(game => (
                    <Card 
                        shadow="md" key={game._id} 
                        isPressable
                        onPress={() => handleCardClick(game._id)}
                        className='drop-shadow-md hover:bg-gray-300 transition-transform transform duration-300 ease-in-out'>
                        <CardBody className="overflow-visible p-0">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                isBlurred
                                alt={game.title}
                                className="w-full object-cover h-[230px]"
                                src={game.images[0]}
                            />
                        </CardBody>
                        <CardFooter className="text-small flex flex-col justify-start items-start">
                            <div className='flex justify-start gap-2'>
                                {game.categories.slice(0, 2).map((category, index) => (
                                    <p key={index} className="text-[12px] text-default-700">{category}</p>
                                ))}
                            </div>
                                <b className='text-[16px] text-gray-800 text-ellipsis whitespace-nowrap overflow-hidden w-[100%] text-start'>{game.title}</b>
                                {game.price === 0 ? 
                                (<p className="text-[12px] text-default-800"><span>Free to Play</span></p>) :
                                (<p className="text-[12px] text-default-800">THB <span>{game.price}</span></p>)
                            }
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RecommendCard;

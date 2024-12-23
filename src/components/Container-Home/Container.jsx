import React, { useState, useEffect } from 'react';
import { Card, CardBody, Image } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Container = ({ name }) => {
    const navigate = useNavigate();
    const [gameData, setGameData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/game`);
                const data = response.data.game;
                const randomData = [...data]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 5);
                setGameData(randomData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/game/${id}`);
    };

    return (
        <div className="w-full text-white">
            {name !== "" ? (
                <h2 className="mb-5 text-[28px] font-bold">{name}</h2>
            ) : null}
            <div className="gap-[12px] grid grid-rows-5 grid-cols-1">
                {gameData.map((game) => (
                    <Card
                        shadow="sm"
                        key={game._id}
                        isPressable
                        onPress={() => handleCardClick(game._id)}
                        className="drop-shadow-md hover:bg-gray-300 transform transition-all duration-300 hover:scale-105 hover:[box-shadow:_0_0_10px_white,_0_0_20px_white,_0_0_30px_white,_0_0_40px_white]">
                        <CardBody className="overflow-visible p-3 text-small flex flex-row justify-start items-center">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                isBlurred
                                alt={game.title}
                                className="object-cover h-[80px] w-[80px]"
                                src={game.images[0]}
                            />
                            <div className="flex flex-col justify-start items-start pl-2 w-[70%]">
                                <b className="text-[16px] text-gray-800 w-[100%] text-ellipsis whitespace-nowrap overflow-hidden">{game.title}</b>
                                {game.price === 0 ? (
                                <p className="text-[12px] text-default-500 font-semibold">
                                    <span>Free to Play</span>
                                </p> ) : ( 
                                <p className="text-[12px] text-default-500 font-semibold">
                                    THB <span>{game.price}</span>
                                </p>
                                )}
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Container;
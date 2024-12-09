import React, { useState, useEffect } from 'react';
import { Card, CardBody, Image } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import api from "../../Instance";

const Container = ({ name }) => {
    const navigate = useNavigate();
    const [randomData, setRandomData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/game");
                const fetchedData = response.data.game;
                const randomizedData = [...fetchedData]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 5);
                setRandomData(randomizedData);
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
                {randomData.map((item) => (
                    <Card
                        shadow="sm"
                        key={item._id}
                        isPressable
                        onPress={() => handleCardClick(item._id)}
                        className="drop-shadow-md hover:bg-gray-300"
                    >
                        <CardBody className="overflow-visible p-3 text-small flex flex-row justify-start items-center">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                isBlurred
                                alt={item.title}
                                className="object-cover h-[80px] w-[80px]"
                                src={item.images[0]}
                            />
                            <div className="flex flex-col justify-start items-start pl-2 w-[70%]">
                                <b className="text-[16px] text-gray-800 w-[100%] text-ellipsis whitespace-nowrap overflow-hidden">{item.title}</b>
                                {item.price === 0 ? (
                                    <p className="text-[12px] text-default-500 font-semibold">
                                        <span>Free to Play</span>
                                    </p>
                                ) : (
                                    <p className="text-[12px] text-default-500 font-semibold">
                                        THB <span>{item.price}</span>
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
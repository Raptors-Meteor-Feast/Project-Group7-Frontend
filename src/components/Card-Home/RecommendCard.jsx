import React, { useEffect, useState } from 'react';
import { Card, CardBody, Image, CardFooter, Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import gamedata from "../../Data/gamedata.json";

const RecommendCard = ({ name }) => {
    const navigate = useNavigate();
    const itemsPerPage = 5;
    const [randomData, setRandomData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const shuffledData = [...gamedata].sort(() => 0.5 - Math.random());
        setRandomData(shuffledData);
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % randomData.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - itemsPerPage + randomData.length) % randomData.length);
    };

    const handleCardClick = (id) => {
        navigate(`/card/${id}`);
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
                {randomData.slice(currentIndex, currentIndex + itemsPerPage).map(item => (
                    <Card 
                        shadow="md" 
                        key={item.id} 
                        isPressable
                        onPress={() => handleCardClick(item.id)}
                        className='drop-shadow-md hover:bg-gray-300 transition-transform transform duration-300 ease-in-out'
                    >
                        <CardBody className="overflow-visible p-0">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                isBlurred
                                alt={item.title}
                                className="w-full object-cover h-[230px]"
                                src={item.pictureaddress}
                            />
                        </CardBody>
                        <CardFooter className="text-small flex flex-col justify-start items-start">
                            <div className='flex justify-start gap-2'>
                                <p className="text-[12px] text-default-700">{item.categories[0]}</p>
                                <p className="text-[12px] text-default-700">{item.categories[1]}</p>
                            </div>
                            <b className={`text-${item.title.length >= 25 ? '15' : '16'} text-gray-800`}>
                                {item.title}
                            </b>
                            {item.price === 0 ? 
                                (<p className="text-[12px] text-default-800"><span>Free to Play</span></p>) :
                                (<p className="text-[12px] text-default-800">THB <span>{item.price}</span></p>)
                            }
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RecommendCard;

import React from 'react'
import { useState } from 'react';
import { Card, CardBody, Image, CardFooter, Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import gamedata from "../../Data/gamedata.json"

const RecommendCard = ({name}) => {
    const navigate = useNavigate();
    const itemsPerPage = 5;
    const [randomData, setRandomData] = useState(
        [...gamedata].sort(() => 0.5 - Math.random()).slice(0, itemsPerPage)
    );

    const handleRandomize = () => {
        const newRandomData = [...gamedata].sort(() => 0.5 - Math.random()).slice(0, itemsPerPage);
        setRandomData(newRandomData);
    };

    const handleCardClick = (id) => {
        navigate(`/card/${id}`);
    };

    return (
    <div className='w-full px-[135px] py-10 bg-neutral-900'>
            <div className='flex justify-between'>
                <h2 className='mb-5 text-[28px] font-bold text-white'>{name}</h2>
                <div className="flex justify-end mb-4">
                    <Button onClick={handleRandomize} className="mr-2 px-5 py-1 bg-gray-700 text-white rounded-full">←</Button>
                    <Button onClick={handleRandomize} className="px-5 py-1 bg-gray-700 text-white rounded-full">→</Button>
                </div>
            </div>
            <div className='gap-[22px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5'>
            {randomData.map(items => (
                <Card 
                    shadow="md" key={items.id} 
                    isPressable
                    onPress={() => handleCardClick(items.id)}
                    className='drop-shadow-md hover:bg-gray-300 '>
                    <CardBody className="overflow-visible p-0">
                        <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            isBlurred
                            alt={items.title}
                            className="w-full object-cover h-[230px]"
                            src={items.pictureaddress}
                        />
                    </CardBody>
                    <CardFooter className="text-small flex flex-col justify-start items-start">
                        <div className='flex justify-start gap-2'>
                            <p className="text-[12px] text-default-700">{items.categories[0]}</p>
                            <p className="text-[12px] text-default-700">{items.categories[1]}</p>
                        </div>
                        {items.title.length >= 25 ? 
                            (<b className='text-[15px] text-gray-800'>{items.title}</b>) :
                            (<b className='text-[16px] text-gray-800'>{items.title}</b>)
                        }
                        {items.price === 0 ? 
                            (<p className="text-[12px] text-default-800"><span>Free to Play</span></p>) :
                            (<p className="text-[12px] text-default-800 ">THB <span>{items.price}</span></p>)
                        }
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
    )
}

export default RecommendCard;

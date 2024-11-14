import React from 'react';
import { Card, CardBody, Image } from "@nextui-org/react";
import gamedata from "../../Data/gamedata.json";
import { useNavigate } from 'react-router-dom';

const Container = ({name}) => {
    const navigate = useNavigate();

    const randomData = [...gamedata]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

    const handleCardClick = (id) => {
        navigate(`/card/${id}`);
    };

    return (
    <div className='w-full text-white'>
    {name !== "" ? (<h2 className='mb-5 text-[28px] font-bold'>{name}</h2>) : (<></>)}
        <div className='gap-[12px] grid grid-rows-5 grid-cols-1 '>
            {randomData.map(items => (
                <Card shadow="sm" key={items.id} isPressable onPress={() => handleCardClick(items.id)} className='drop-shadow-md hover:bg-gray-300'>
                    <CardBody className="overflow-visible p-3 text-small flex flex-row justify-start items-center">
                        <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            isBlurred
                            alt={items.title}
                            className="object-cover h-[80px] w-[80px]"
                            src={items.pictureaddress}
                        />
                        <div className='flex flex-col justify-start items-start pl-2'>
                            <b className='text-[16px] text-gray-800'>{items.title}</b>
                            {items.price === 0 ? 
                                (<p className="text-[12px] text-default-500 font-semibold"><span>Free to Play</span></p>) :
                                (<p className="text-[12px] text-default-500 font-semibold">THB <span>{items.price}</span></p>)
                            }                    
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    </div>
    );
}

export default Container;



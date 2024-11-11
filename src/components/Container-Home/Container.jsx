import React from 'react';
import { Card, CardBody, Image } from "@nextui-org/react";
import gamedata from "../../Data/gamedata.json";
import { useNavigate } from 'react-router-dom';

const Container = () => {
    const navigate = useNavigate();

    const randomData = [...gamedata]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

    const handleCardClick = (id) => {
        navigate(`/card/${id}`);
    };

    return (
        <>
            {randomData.map(items => (
                <Card shadow="sm" key={items.id} isPressable onPress={() => handleCardClick(items.id)}>
                    <CardBody className="overflow-visible p-3 text-small flex flex-row justify-start items-center">
                        <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={items.title}
                            className="object-cover h-[80px] w-[80px]"
                            src={items.pictureaddress}
                        />
                        <div className='flex flex-col justify-start items-start pl-2'>
                            <b className='text-[16px]'>{items.title}</b>
                            {items.price === 0 ? 
                                (<p className="text-[12px] text-default-500"><span>Free to Play</span></p>) :
                                (<p className="text-[12px] text-default-500">THB <span>{items.price}</span></p>)
                            }                    
                        </div>
                    </CardBody>
                </Card>
            ))}
        </>
    );
}

export default Container;



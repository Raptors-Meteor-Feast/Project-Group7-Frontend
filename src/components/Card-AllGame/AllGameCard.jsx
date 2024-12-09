import React from 'react'
import { Card, CardBody, Image, CardFooter, Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import gamedata from '../../Data/gamedata.json'


const data = gamedata;

const AllGameCard = () => {
  return (
    <div className='gap-[22px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5'>
    {data.map(item => (
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
  )
}

export default AllGameCard

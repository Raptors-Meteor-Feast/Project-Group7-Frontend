import React from 'react'
import {Card, CardBody, Image} from "@nextui-org/react";


const mockData = [
    {
        id: 1,
        categorie: 'openworld',
        name: "Outlaws",
        price: 200,
        src: 'https://lumiere-a.akamaihd.net/v1/images/star-wars-outlaws-key-art-square_b893fc9e.jpeg?region=0%2C0%2C1080%2C1080'
    },
    {
        id: 2,
        categorie: 'openworld',
        name: "Outlaws",
        price: 200,
        src: 'https://lumiere-a.akamaihd.net/v1/images/star-wars-outlaws-key-art-square_b893fc9e.jpeg?region=0%2C0%2C1080%2C1080'
    },
    {
        id: 3,
        categorie: 'openworld',
        name: "Outlaws",
        price: 200,
        src: 'https://lumiere-a.akamaihd.net/v1/images/star-wars-outlaws-key-art-square_b893fc9e.jpeg?region=0%2C0%2C1080%2C1080'
    },
    {
        id: 4,
        categorie: 'openworld',
        name: "Outlaws",
        price: 200,
        src: 'https://lumiere-a.akamaihd.net/v1/images/star-wars-outlaws-key-art-square_b893fc9e.jpeg?region=0%2C0%2C1080%2C1080'
    },
    {
        id: 5,
        categorie: 'openworld',
        name: "Outlaws",
        price: 200,
        src: 'https://lumiere-a.akamaihd.net/v1/images/star-wars-outlaws-key-art-square_b893fc9e.jpeg?region=0%2C0%2C1080%2C1080'
    },
];

const Container = () => {
    return (
    <>
        {mockData.map(items => (
        <Card shadow="sm" key={items.id} isPressable onPress={() => console.log("item pressed")} className=''>
            <CardBody className="overflow-visible p-3 text-small flex flex-row justify-start items-center">
                <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={items.name}
                    className="w-full object-cover h-[80px]"
                    src={items.src}
                />
                <div className='flex flex-col justify-start items-start pl-2'>
                    <b className='text-[16px]'>{items.name}</b>
                    <p className="text-[12px] text-default-500">THB <span>{items.price}</span></p>
                </div>
            </CardBody>
        </Card>
        ))}
    </>
    )
}

export default Container


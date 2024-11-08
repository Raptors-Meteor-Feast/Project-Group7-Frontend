import React from 'react'
import {Card, CardBody, Image, CardFooter} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';



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
    {
        id: 6,
        categorie: 'openworld',
        name: "Outlaws",
        price: 200,
        src: 'https://lumiere-a.akamaihd.net/v1/images/star-wars-outlaws-key-art-square_b893fc9e.jpeg?region=0%2C0%2C1080%2C1080'
    },
];

const CardComponent = () => {

    const navigate = useNavigate(); // useNavigate hook from react-router-dom

    const handleCardClick = (id) => {
        navigate(`/card/${id}`); // Navigate to the card detail page
    };

    return (
    <>
        {mockData.map(items => (
        <Card 
            shadow="sm" key={items.id} 
            isPressable 
            onPress={() => handleCardClick(items.id)} >
            <CardBody className="overflow-visible p-0">
                <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={items.name}
                    className="w-full object-cover h-[230px]"
                    src={items.src}
                />
            </CardBody>
            <CardFooter className="text-small flex flex-col justify-start items-start">
                <p className="text-[12px] text-default-400">{items.categorie}</p>
                <b className='text-[16px]'>{items.name}</b>
                <p className="text-[12px] text-default-500">THB <span>{items.price}</span></p>
            </CardFooter>
        </Card>
        ))}
    </>
    )
}

export default CardComponent

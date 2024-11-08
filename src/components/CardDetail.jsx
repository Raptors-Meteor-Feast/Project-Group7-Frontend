import React from 'react';
import { useParams } from 'react-router-dom';
import {Button, ButtonGroup} from "@nextui-org/button";

const mockData = [
    {
        id: 1,
        categorie: 'openworld',
        categorie2: 'fantasy',
        categorie3: '',
        name: 'Outlaws',
        price: 200.00,
        src: 'https://lumiere-a.akamaihd.net/v1/images/star-wars-outlaws-key-art-square_b893fc9e.jpeg?region=0%2C0%2C1080%2C1080',
        gamesubdis: "Lorem ipsum dolor sit amet consectetur. Odio nunc dolor tempor in urna egestas sed praesent. Tellus mauris egestas ac amet tellus ut. Est duis ornare arcu cras congue ornare at id convallis. Sed tellus consectetur quam luctus viverra duis id ultrices iaculis.",
        gamedis: "Lorem ipsum dolor sit amet consectetur. Nam libero a mauris lectus sed. Tortor ornare maecenas malesuada diam porta lobortis arcu consectetur. In varius maecenas non tortor nibh. Sit euismod praesent tristique tellus pellentesque et nisi odio maecenas. Habitasse commodo sed pharetra ac pellentesque dui habitant orci elementum. Neque dui pellentesque adipiscing aliquam. Molestie vel sed ullamcorper est in nibh eu risus quis.",
        gamedis2: "Lorem ipsum dolor sit amet consectetur. Nam libero a mauris lectus sed. Tortor ornare maecenas malesuada diam porta lobortis arcu consectetur. In varius maecenas non tortor nibh. Sit euismod praesent tristique tellus pellentesque et nisi odio maecenas. Habitasse commodo sed pharetra ac pellentesque dui habitant orci elementum. Neque dui pellentesque adipiscing aliquam. Molestie vel sed ullamcorper est in nibh eu risus quis.",
    },
    {
        id: 2,
        categorie: 'openworld',
        categorie2: 'fantasy',
        categorie3: 'online',
        name: 'God of War Ragnarök',
        price: 2000.00,
        src: 'https://c4.wallpaperflare.com/wallpaper/835/36/912/god-of-war-ragnarok-god-of-war-kratos-video-games-artwork-hd-wallpaper-preview.jpg',
        gamesubdis: "Lorem ipsum dolor sit amet consectetur. Odio nunc dolor tempor in urna egestas sed praesent. Tellus mauris egestas ac amet tellus ut. Est duis ornare arcu cras congue ornare at id convallis. Sed tellus consectetur quam luctus viverra duis id ultrices iaculis.",
        gamedis: "Lorem ipsum dolor sit amet consectetur. Nam libero a mauris lectus sed. Tortor ornare maecenas malesuada diam porta lobortis arcu consectetur. In varius maecenas non tortor nibh. Sit euismod praesent tristique tellus pellentesque et nisi odio maecenas. Habitasse commodo sed pharetra ac pellentesque dui habitant orci elementum. Neque dui pellentesque adipiscing aliquam. Molestie vel sed ullamcorper est in nibh eu risus quis.",
        gamedis2: "Lorem ipsum dolor sit amet consectetur. Nam libero a mauris lectus sed. Tortor ornare maecenas malesuada diam porta lobortis arcu consectetur. In varius maecenas non tortor nibh. Sit euismod praesent tristique tellus pellentesque et nisi odio maecenas. Habitasse commodo sed pharetra ac pellentesque dui habitant orci elementum. Neque dui pellentesque adipiscing aliquam. Molestie vel sed ullamcorper est in nibh eu risus quis.",
    },
    {
        id: 3,
        categorie: 'openworld',
        categorie2: 'fantasy',
        categorie3: 'online',
        name: 'Monster Hunter Wilds',
        price: 1400.00,
        src: 'https://blog.playstation.com/uploads/2024/06/a6f2f4429dadcad43c092af0fe340f80af1c2c92.jpg',
        gamesubdis: "Lorem ipsum dolor sit amet consectetur. Odio nunc dolor tempor in urna egestas sed praesent. Tellus mauris egestas ac amet tellus ut. Est duis ornare arcu cras congue ornare at id convallis. Sed tellus consectetur quam luctus viverra duis id ultrices iaculis.",
        gamedis: "Lorem ipsum dolor sit amet consectetur. Nam libero a mauris lectus sed. Tortor ornare maecenas malesuada diam porta lobortis arcu consectetur. In varius maecenas non tortor nibh. Sit euismod praesent tristique tellus pellentesque et nisi odio maecenas. Habitasse commodo sed pharetra ac pellentesque dui habitant orci elementum. Neque dui pellentesque adipiscing aliquam. Molestie vel sed ullamcorper est in nibh eu risus quis.",
        gamedis2: "Lorem ipsum dolor sit amet consectetur. Nam libero a mauris lectus sed. Tortor ornare maecenas malesuada diam porta lobortis arcu consectetur. In varius maecenas non tortor nibh. Sit euismod praesent tristique tellus pellentesque et nisi odio maecenas. Habitasse commodo sed pharetra ac pellentesque dui habitant orci elementum. Neque dui pellentesque adipiscing aliquam. Molestie vel sed ullamcorper est in nibh eu risus quis.",
    },
    {
        id: 4,
        categorie: 'openworld',
        name: 'Outlaws',
        price: 200,
        src: 'https://lumiere-a.akamaihd.net/v1/images/star-wars-outlaws-key-art-square_b893fc9e.jpeg?region=0%2C0%2C1080%2C1080',
    },
    {
        id: 5,
        categorie: 'openworld',
        name: 'Outlaws',
        price: 200,
        src: 'https://lumiere-a.akamaihd.net/v1/images/star-wars-outlaws-key-art-square_b893fc9e.jpeg?region=0%2C0%2C1080%2C1080',
    },
    {
        id: 6,
        categorie: 'openworld',
        name: 'Outlaws',
        price: 200,
        src: 'https://lumiere-a.akamaihd.net/v1/images/star-wars-outlaws-key-art-square_b893fc9e.jpeg?region=0%2C0%2C1080%2C1080',
    },
    ];

    const mockDataSystem = [
      {
        id: 1,
        operater: "Windows",
        mimimum: {
          osversion: "Window 8",
          cpu: "Intel i3-61000U",
          memory: 2,
          gpu: "Intel UHD Graphics 620",
          storage: "250 MB"
        },
        recomend: {
          osversion: "Window 10",
          cpu: "Intel i5",
          memory: 4,
          gpu: "GEForce GTX970",
          storage: "250 MB"
        },
        language : "Audio: N/A",
        text: "Text: Lorem ipsum dolor sit amet consectetur. Nam libero a mauris lectus sed. Tortor ornare maecenas malesuada diam porta lobortis arcu consectetur. In varius maecenas non tortor nibh. Sit euismod praesent tristique tellus pellentesque et nisi odio maecenas. Habitasse commodo sed pharetra ac pellentesque dui habitant orci elementum. Neque dui pellentesque adipiscing aliquam. Molestie vel sed ullamcorper est in nibh eu risus quis."
      },
      {
        id: 2,
        operater: "Windows",
        mimimum: {
          osversion: "Window 8",
          cpu: "Intel i3-61000U",
          memory: 2,
          gpu: "Intel UHD Graphics 620",
          storage: "250 MB"
        },
        recomend: {
          osversion: "Window 10",
          cpu: "Intel i5",
          memory: 4,
          gpu: "GEForce GTX970",
          storage: "250 MB"
        },
        language : "Audio: N/A",
        text: "Text: Lorem ipsum dolor sit amet consectetur. Nam libero a mauris lectus sed. Tortor ornare maecenas malesuada diam porta lobortis arcu consectetur. In varius maecenas non tortor nibh. Sit euismod praesent tristique tellus pellentesque et nisi odio maecenas. Habitasse commodo sed pharetra ac pellentesque dui habitant orci elementum. Neque dui pellentesque adipiscing aliquam. Molestie vel sed ullamcorper est in nibh eu risus quis."
      },
      {
        id: 3,
        operater: "Windows",
        mimimum: {
          osversion: "Window 8",
          cpu: "Intel i3-61000U",
          memory: 2,
          gpu: "Intel UHD Graphics 620",
          storage: "250 MB"
        },
        recomend: {
          osversion: "Window 10",
          cpu: "Intel i5",
          memory: 4,
          gpu: "GEForce GTX970",
          storage: "250 MB"
        },
        language : "Audio: N/A",
        text: "Text: Lorem ipsum dolor sit amet consectetur. Nam libero a mauris lectus sed. Tortor ornare maecenas malesuada diam porta lobortis arcu consectetur. In varius maecenas non tortor nibh. Sit euismod praesent tristique tellus pellentesque et nisi odio maecenas. Habitasse commodo sed pharetra ac pellentesque dui habitant orci elementum. Neque dui pellentesque adipiscing aliquam. Molestie vel sed ullamcorper est in nibh eu risus quis."
      },
      {
        id: 4,
        operater: "Windows",
        mimimum: {
          osversion: "Window 8",
          cpu: "Intel i3-61000U",
          memory: 2,
          gpu: "Intel UHD Graphics 620",
          storage: "250 MB"
        },
        recomend: {
          osversion: "Window 10",
          cpu: "Intel i5",
          memory: 4,
          gpu: "GEForce GTX970",
          storage: "250 MB"
        },
        language : "Audio: N/A",
        text: "Text: Lorem ipsum dolor sit amet consectetur. Nam libero a mauris lectus sed. Tortor ornare maecenas malesuada diam porta lobortis arcu consectetur. In varius maecenas non tortor nibh. Sit euismod praesent tristique tellus pellentesque et nisi odio maecenas. Habitasse commodo sed pharetra ac pellentesque dui habitant orci elementum. Neque dui pellentesque adipiscing aliquam. Molestie vel sed ullamcorper est in nibh eu risus quis."
      },
      {
        id: 5,
        operater: "Windows",
        mimimum: {
          osversion: "Window 8",
          cpu: "Intel i3-61000U",
          memory: 2,
          gpu: "Intel UHD Graphics 620",
          storage: "250 MB"
        },
        recomend: {
          osversion: "Window 10",
          cpu: "Intel i5",
          memory: 4,
          gpu: "GEForce GTX970",
          storage: "250 MB"
        },
        language : "Audio: N/A",
        text: "Text: Lorem ipsum dolor sit amet consectetur. Nam libero a mauris lectus sed. Tortor ornare maecenas malesuada diam porta lobortis arcu consectetur. In varius maecenas non tortor nibh. Sit euismod praesent tristique tellus pellentesque et nisi odio maecenas. Habitasse commodo sed pharetra ac pellentesque dui habitant orci elementum. Neque dui pellentesque adipiscing aliquam. Molestie vel sed ullamcorper est in nibh eu risus quis."
      },
      {
        id: 6,
        operater: "Windows",
        mimimum: {
          osversion: "Window 8",
          cpu: "Intel i3-61000U",
          memory: 2,
          gpu: "Intel UHD Graphics 620",
          storage: "250 MB"
        },
        recomend: {
          osversion: "Window 10",
          cpu: "Intel i5",
          memory: 4,
          gpu: "GEForce GTX970",
          storage: "250 MB"
        },
        language : "Audio: N/A",
        text: "Text: Lorem ipsum dolor sit amet consectetur. Nam libero a mauris lectus sed. Tortor ornare maecenas malesuada diam porta lobortis arcu consectetur. In varius maecenas non tortor nibh. Sit euismod praesent tristique tellus pellentesque et nisi odio maecenas. Habitasse commodo sed pharetra ac pellentesque dui habitant orci elementum. Neque dui pellentesque adipiscing aliquam. Molestie vel sed ullamcorper est in nibh eu risus quis."
      },
    ]

const CardDetail = () => {
  const { id } = useParams();

  const card = mockData.find((item) => item.id === parseInt(id));
  const cardsystem = mockDataSystem.find((item) => item.id === parseInt(id));

  if (!card) {
    return <p>Card not found</p>;
  }

  return (
    <div className=' bg-slate-300 px-[300px] pt-[60px] pb-[120px]'>
      <div className='pb-[40px]'>
      <h1 className='font-bold text-[28px]'>{card.name}</h1>
        <div className='py-5'>
          <img className='h-[800px] w-full rounded-xl ' src={card.src} alt={card.name} />
          <p className='pt-4'>{card.gamesubdis}</p>
        </div>
        <div className='flex justify-end gap-3'>
          <Button className='py-3 px-7 bg-slate-100 text-xl'>THB {card.price}</Button>
          <Button className='py-3 px-7 text-xl' color="primary">Buy Now</Button>
          <Button className='py-3 px-7 bg-gray-600 text-white text-xl'>Add To Cart</Button>
        </div>
      </div>
      <div>
        <div className='pb-10'>
          <h2 className='font-bold text-[28px]'>{card.name}</h2>
          <p>{card.gamedis}</p>
          <p>{card.gamedis2}</p>
          <div className='flex justify-start gap-3 pt-5'>
            <a className='underline cursor-pointer'>{card.categorie}</a>
            <a className='underline cursor-pointer'>{card.categorie2}</a>
            <a className='underline cursor-pointer'>{card.categorie3}</a>
          </div>
        </div>
        <div>
        <h2 className='font-bold text-[28px] pb-8'>{card.name} System Requirement</h2>
        <div className='flex flex-col p-11 gap-5 bg-white rounded-xl'>
          <p className='font-bold text-xl'>{cardsystem.operater}</p>
          <div className='flex w-full'>
            <div className='flex flex-col gap-3 w-[50%]'>
              <p className='font-bold'>Minimum</p>
                <div>
                  <p className='text-default-400'>Os Version</p>
                  <p className='font-semibold'>{cardsystem.mimimum.osversion}</p>
                </div>
                <div>
                  <p className='text-default-400'>CPU</p>
                  <p className='font-semibold'>{cardsystem.mimimum.cpu}</p>
                </div>
                <div>
                  <p className='text-default-400'>Memory</p>
                  <p className='font-semibold'>{cardsystem.mimimum.memory}</p>
                </div>
                <div>
                  <p className='text-default-400'>GPU</p>
                  <p className='font-semibold'>{cardsystem.mimimum.gpu}</p>
                </div>
                <div>
                  <p className='text-default-400'>Storage</p>
                  <p className='font-semibold'>{cardsystem.mimimum.storage}</p>
                </div>
            </div>
            <div className='flex flex-col gap-3 w-[50%]'>
                <p className='font-bold'>Recommended</p>
                <div>
                  <p className='text-default-400'>Os Version</p>
                  <p className='font-semibold'>{cardsystem.recomend.osversion}</p>
                </div>
                <div>
                  <p className='text-default-400'>CPU</p>
                  <p className='font-semibold'>{cardsystem.recomend.cpu}</p>
                </div>
                <div>
                  <p className='text-default-400'>Memory</p>
                  <p className='font-semibold'>{cardsystem.recomend.memory}</p>
                </div>
                <div>
                  <p className='text-default-400'>GPU</p>
                  <p className='font-semibold'>{cardsystem.recomend.gpu}</p>
                </div>
                <div>
                  <p className='text-default-400'>Storage</p>
                  <p className='font-semibold'>{cardsystem.recomend.storage}</p>
                </div>
            </div>
          </div>
          <div>
            <p className='text-default-400'>Languages Supported</p>
            <p className='font-semibold'>{cardsystem.language}</p>
          </div>
          <p>{cardsystem.text}</p>
        </div>

      </div>
    </div>
    </div>
  );
};

export default CardDetail;

import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@nextui-org/button";
import gamedata from "../../Data/gamedata.json"
import gamesystem from "../../Data/gamesystem.json"

const data = gamedata;
const system = gamesystem;

console.log(system);


const CardDetail = () => {
  const { id } = useParams();

  const card = data.find((item) => item.id === parseInt(id));
  const cardsystem = system.find((item) => item.id === parseInt(id));

  if (!card) {
    return <p>Card not found</p>;
  }

  return (
    <div className=' bg-slate-300 px-[300px] pt-[60px] pb-[120px]'>
      <div className='pb-[40px]'>
      <h1 className='font-bold text-[28px]'>{card.title}</h1>
        <div className='py-5'>
          <img className='h-[800px] w-full rounded-xl ' src={card.pictureaddress} alt={card.title} />
          <p className='pt-4'>{card.short_description}</p>
        </div>
        <div className='flex justify-end gap-3'>
          <Button className='py-3 px-7 bg-slate-100 text-xl'>THB {card.price}</Button>
          <Button className='py-3 px-7 text-xl' color="primary">Buy Now</Button>
          <Button className='py-3 px-7 bg-gray-600 text-white text-xl'>Add To Cart</Button>
        </div>
      </div>
      <div>
        <div className='pb-10'>
          <h2 className='font-bold text-[28px]'>{card.title}</h2>
          <p>{card.full_description}</p>
          <div className='flex justify-start gap-3 pt-5'>
            <a className='underline cursor-pointer'>{card.categories[0]}</a>
            <a className='underline cursor-pointer'>{card.categories[1]}</a>
            <a className='underline cursor-pointer'>{card.categories[2]}</a>
            <a className='underline cursor-pointer'>{card.categories[3]}</a>
            <a className='underline cursor-pointer'>{card.categories[4]}</a>
          </div>
        </div>
        <div>
        <h2 className='font-bold text-[28px] pb-8'>{card.title} System Requirement</h2>
        <div className='flex flex-col p-11 gap-5 bg-white rounded-xl'>
          <p className='font-bold text-xl'>{cardsystem.operater}</p>
          <div className='flex w-full'>
            <div className='flex flex-col gap-3 w-[50%]'>
              <p className='font-bold'>Minimum</p>
                <div>
                  <p className='text-default-400'>Os Version</p>
                  <p className='font-semibold'>{cardsystem.minimum.osversion}</p>
                </div>
                <div>
                  <p className='text-default-400'>CPU</p>
                  <p className='font-semibold'>{cardsystem.minimum.cpu}</p>
                </div>
                <div>
                  <p className='text-default-400'>Memory</p>
                  <p className='font-semibold'>{cardsystem.minimum.memory}</p>
                </div>
                <div>
                  <p className='text-default-400'>GPU</p>
                  <p className='font-semibold'>{cardsystem.minimum.gpu}</p>
                </div>
                <div>
                  <p className='text-default-400'>Storage</p>
                  <p className='font-semibold'>{cardsystem.minimum.storage}</p>
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

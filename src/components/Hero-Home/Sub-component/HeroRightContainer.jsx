import React, { useState } from 'react';
import { Card, CardBody, Image } from "@nextui-org/react";
import { motion } from 'framer-motion';

const HeroRightContainer = ({ name, setSelectedId, randomData }) => {
  const [expandedCardId, setExpandedCardId] = useState(null);

  const handleCardClick = (id) => {
    if (expandedCardId === id) {
      setExpandedCardId(null);
    } else {
      setExpandedCardId(id);
    }
    setSelectedId(id);
  };

  return (
    <div className='w-full text-white h-[570px]'>
      {name !== "" ? (<h2 className='mb-5 text-[28px] font-bold'>{name}</h2>) : (<></>)}
      <div className='gap-[12px] grid grid-rows-5 grid-cols-1'>
        {randomData.map(items => (
          <motion.div
            key={items._id}
            initial={{ width: '100%' }} 
            animate={{
              width: expandedCardId === items._id ? 'calc(100% + 100px)' : '100%',
              x: expandedCardId === items._id ? '-100px' : '0', 
            }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'relative',
              zIndex: expandedCardId === items._id ? 10 : 1,
            }}
          >
            <Card
              shadow="sm"
              isPressable
              onPress={() => handleCardClick(items._id)}
              className="drop-shadow-md hover:bg-gray-300"
              style={{
                width: expandedCardId === items._id ? 'calc(100% + 100px)' : '100%',
                position: 'relative',
                transition: 'width 0.5s ease-in-out, transform 0.5s ease-in-out, box-shadow 0.3s ease',
                boxShadow: expandedCardId === items._id ? '10px 0px 15px rgba(96, 16, 146, 0.9)' : 'none',
              }}
            >
              <CardBody className="overflow-visible p-3 text-small flex flex-row justify-start items-center text-ellipsis">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  isBlurred
                  alt={items.title}
                  className="object-cover h-[80px] w-[80px]"
                  src={items.images[0]}
                />
                <div className='flex flex-col justify-start items-start pl-2'>
                  <b className='text-[16px] text-gray-800 text-ellipsis whitespace-nowrap overflow-hidden w-[100%] text-start'>{items.title}</b>
                  {items.price === 0 ? 
                    (<p className="text-[12px] text-default-500"><span>Free to Play</span></p>) :
                    (<p className="text-[12px] text-default-500">THB <span>{items.price}</span></p>)
                  }                    
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroRightContainer;

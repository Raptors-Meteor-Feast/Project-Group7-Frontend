import React, { useState , useEffect} from 'react';
import { Card, CardBody, Image } from "@nextui-org/react";
import { motion } from 'framer-motion';

const HeroRightContainer = ({ name, setSelectedId, randomData, selectedId }) => {
  const [expandedCardId, setExpandedCardId] = useState(null);

  useEffect(() => {
    setExpandedCardId(selectedId);
  }, [selectedId]);

  const handleCardClick = (id) => {
    setExpandedCardId(id);
    setSelectedId(id);
  };

  return (
    <div className='w-full text-white h-[570px]'>
      {name !== "" ? (<h2 className='mb-5 text-[28px] font-bold'>{name}</h2>) : (<></>)}
      <div className='gap-[12px] grid grid-rows-5 grid-cols-1'>
        {randomData.map((game) => (
          <motion.div
            key={game._id}
            initial={{ width: '100%' }} 
            animate={{
              width: expandedCardId === game._id ? 'calc(100% + 100px)' : '100%',
              x: expandedCardId === game._id ? '-100px' : '0',
            }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'relative',
              zIndex: expandedCardId === game._id ? 10 : 1,
            }}
          >
            <Card
              shadow="sm"
              isPressable
              onPress={() => handleCardClick(game._id)}
              className="drop-shadow-md hover:bg-gray-300"
              style={{
                width: expandedCardId === game._id ? 'calc(100% + 100px)' : '100%',
                position: 'relative',
                transition: 'width 0.5s ease-in-out, transform 0.5s ease-in-out, box-shadow 0.3s ease',
                boxShadow: expandedCardId === game._id ? '10px 0px 15px rgba(96, 16, 146, 0.9)' : 'none',
              }}
            >
              <CardBody className="overflow-visible p-3 text-small flex flex-row justify-start items-center text-ellipsis">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  isBlurred
                  alt={game.title}
                  className="object-cover h-[80px] w-[80px]"
                  src={game.images[0]}
                />
                <div className='flex flex-col justify-start items-start pl-2 w-[80%]'>
                  <b className='text-[16px] text-gray-800 text-ellipsis whitespace-nowrap overflow-hidden w-[100%] text-start'>{game.title}</b>
                  {game.price === 0 ? 
                    (<p className="text-[12px] text-default-500"><span>Free to Play</span></p>) :
                    (<p className="text-[12px] text-default-500">THB <span>{game.price}</span></p>)
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

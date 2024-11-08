import React from 'react'
import CardComponent from './CardComponent'


const BoxFiveCard = ({name}) => {
  return (
    <div className='w-full px-[135px] py-10 bg-gray-800'>
        <h2 className='mb-5 text-[28px] font-bold text-white'>{name}</h2>
        <div className='gap-[22px] grid grid-cols-2 sm:grid-cols-6'>
          <CardComponent />
        </div>
    </div>
  )
}

export default BoxFiveCard

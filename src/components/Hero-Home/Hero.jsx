import React from 'react'
import BoxContainer from '../Container-Home/BoxContainer'

const Hero = () => {
  return (
    <div className='w-full px-[135px] flex py-10 bg-gray-800'>
      <div className='w-[70%] bg-slate-500'></div>
      <div className='w-[30%] pl-[24px]'>
        <BoxContainer name=""/>
      </div>
    </div>
  )
}

export default Hero

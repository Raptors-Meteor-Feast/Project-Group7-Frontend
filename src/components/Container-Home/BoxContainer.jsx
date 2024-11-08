import Container from './Container'
import React from 'react'

const BoxContainer = ({name}) => {
    return (
        <div className='w-full text-white'>
        {name !== "" ? (<h2 className='mb-5 text-[28px] font-bold'>{name}</h2>) : (<></>)}
        <div className='gap-[12px] grid grid-rows-5 grid-cols-1 '>
            <Container />
        </div>
    </div>
    )
}

export default BoxContainer

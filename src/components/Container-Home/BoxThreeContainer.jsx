import React from 'react'
import Container from './Container'

const BoxThreeContainer = () => {
  return (
    <div className=' grid grid-cols-4 gap-[150px] px-[135px] py-10 bg-neutral-900'>

        <Container name="Top Seller"/>
        <Container name="Top Player Rated"/>
        <Container name="Top Adds On"/>
        <Container name="Random"/>
    </div>
  )
}

export default BoxThreeContainer

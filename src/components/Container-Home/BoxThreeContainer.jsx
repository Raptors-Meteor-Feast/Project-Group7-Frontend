import React from 'react'
import BoxContainer from './BoxContainer'

const BoxThreeContainer = () => {
  return (
    <div className=' grid grid-cols-4 gap-[150px] px-[135px] py-10 bg-neutral-950'>

        <BoxContainer name="Top seller"/>
        <BoxContainer name="Top seller"/>
        <BoxContainer name="Top seller"/>
        <BoxContainer name="Top seller"/>
    </div>
  )
}

export default BoxThreeContainer

import React from 'react'
import BoxFiveCard from '../components/Card-Home/BoxFiveCard'
import BoxThreeContainer from '../components/Container-Home/BoxThreeContainer'
import Hero from '../components/Hero-Home/Hero'

const Home = () => {
    return (
        <div>
            <Hero />
            <BoxFiveCard name="Promotion"/>
            <BoxFiveCard name="Most Popular"/>
            <BoxThreeContainer/>
        </div>
    )
}

export default Home

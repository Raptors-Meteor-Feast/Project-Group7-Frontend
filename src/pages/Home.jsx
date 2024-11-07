import React from 'react'
import BoxFiveCard from '../components/BoxFiveCard'
import BoxThreeContainer from '../components/BoxThreeContainer'
import Hero from '../components/Hero'

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

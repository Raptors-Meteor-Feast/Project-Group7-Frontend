
import React from 'react'
import BoxThreeContainer from '../components/Container-Home/BoxThreeContainer'
import Hero from '../components/Hero-Home/Hero'
import Nav from '../components/Nav'
import Footer from '../components/Footer/Footer'
import MostPopularCard from "../components/Card-Home/MostPopularCard"
import RecommendCard from '../components/Card-Home/RecommendCard'

const Home = () => {
    return (
        <div>
            <Nav/>
            <Hero />
            <RecommendCard name="Recommend For You"/>
            <MostPopularCard name="Most Popular"/>
            <BoxThreeContainer/>
            <Footer/>
        </div>
    )
}
export default Home;

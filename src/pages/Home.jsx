import React from 'react'
import BoxThreeContainer from '../components/Container-Home/BoxThreeContainer'
import Hero from '../components/Hero-Home/Hero'
import Footer from '../components/Footer/Footer'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import CheckOut from './CheckOut'
import MostPopularCard from "../components/Card-Home/MostPopularCard"
import RecommendCard from '../components/Card-Home/RecommendCard'
import Nav from '../components/Nav'

const Home = () => {
    return (
        <div>
            <Nav />
            <Hero />
            <RecommendCard name="Recommend For You"/>
            <MostPopularCard name="Most Popular"/>
            <BoxThreeContainer/>
            <Footer/>
            <Login />
            <Register />
            <CheckOut />
        </div>
    )
}
export default Home;

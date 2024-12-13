import React, { useEffect, useState } from "react";
import BoxThreeContainer from "../components/Container-Home/BoxThreeContainer";
import Hero from "../components/Hero-Home/Hero";
import Footer from "../components/Footer/Footer";
import MostPopularCard from "../components/Card-Home/MostPopularCard";
import RecommendCard from "../components/Card-Home/RecommendCard";
import Nav from "../components/Nav";
import CardNews from "../components/News/CardNews.jsx";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const [gameData, setGameData] = useState([]);

  // useEffect(() => {
  //   const cartList = localStorage.getItem("cartList");
  //   if (cartList) {
  //     setGameData((prev) => {
  //       const updateGameData = [...JSON.parse(cartList)];
  //       return updateGameData;
  //     });
  //   }
  // }, []);

  useEffect(() => {
    axios.get(`${API_URL}/api/game`)
      .then((res) => setGameData(res.data.games))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Nav cartItem={gameData} />
      <Hero />
      <RecommendCard name="Recommend For You" />
      <MostPopularCard name="Most Popular" />
      <BoxThreeContainer />
      <CardNews />
      <Footer />
    </div>
  );
};

export default Home;

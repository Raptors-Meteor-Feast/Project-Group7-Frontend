import React, { useEffect, useState } from "react";
import BoxThreeContainer from "../components/Container-Home/BoxThreeContainer";
import Hero from "../components/Hero-Home/Hero";
import Footer from "../components/Footer/Footer";
import MostPopularCard from "../components/Card-Home/MostPopularCard";
import RecommendCard from "../components/Card-Home/RecommendCard";
import Nav from "../components/Nav";
import axios from "axios";



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
    axios.get("http://localhost:4000/api/game")
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
      <Footer />
    </div>
  );
};

export default Home;

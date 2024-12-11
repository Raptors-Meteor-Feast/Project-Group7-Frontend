import React, { useState } from 'react';
import AllGameCard from '../components/Card-AllGame/AllGameCard';
import GenresCard from '../components/Card-AllGame/GenresCard';
import Nav from '../components/Nav';
import Filter from '../components/Card-AllGame/Filter';
import Footer from '../components/Footer/Footer';

const AllGame = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      <Nav />
      <GenresCard setSelectedCategory={setSelectedCategory} />
      <Filter setSelectedCategory={setSelectedCategory} />
      <AllGameCard selectedCategory={selectedCategory} />
      <Footer/>
    </div>
  );
};

export default AllGame;

import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import { useParams } from "react-router-dom";
import { Button } from "@nextui-org/button";
import gamedata from "../../Data/gamedata.json";
import gamesystem from "../../Data/gamesystem.json";
import CarouselImage from "./Sub-component/CaroselImage";

import Footer from "../../components/Footer/Footer";
import ModalCheckOut from "../../components/Checkout/ModalButtonCheckOut/ModalCheckOut";
import { useCart } from "../../components/Checkout/CartContext";
import { useNavigate } from "react-router-dom";

const data = gamedata;
const system = gamesystem;

const CardDetail = () => {
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const card = data.find((item) => item.id === parseInt(id));
  const cardsystem = system.find((item) => item.id === parseInt(id));

  useEffect(() => {
    const cartList = localStorage.getItem("cartList");

    if (cartList) {
      setCart(JSON.parse(cartList));
    }
  }, []);

  // useEffect(() => {
  //   const cartList = localStorage.getItem("cartList");
  //   if (cartList) {
  //     setGameData((prev) => {
  //       const updateGameData = [...JSON.parse(cartList)];
  //       return updateGameData;
  //     });
  //   }
  // }, []);

  if (!card) {
    return <p>Card not found</p>;
  }

  const { addToCart, buyNow } = useCart(); // Import the addToCart function from context
  const navigate = useNavigate(); // For navigation to checkout

  const handleAddToCart = () => {
    addToCart(card.id);  // Pass the id of the selected game to CartContext
  };

  const handleBuyNow = () => {
    buyNow(card); // Replace the cart with the selected item
    navigate("/checkout"); // Navigate to the checkout page
  };

  // const handleBuyNowClick = (game) => {
  //   setSelectedGame(game);
  //   setIsModalOpen(true);
  // };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  return (
    <div>
      <Nav />
      <div className="bg-slate-300 px-[300px] pt-[32px] pb-[120px]">
        <div className="pb-[40px]">
          <h1 className="font-bold text-[28px]">{card.title}</h1>
          <div className="py-5">
            <CarouselImage gameId={id} />
            <p className="pt-4">{card.short_description}</p>
          </div>
          <div className="flex justify-end gap-3">
            <Button className="py-3 px-7 bg-slate-100 text-xl">
              THB {card.price}
            </Button>
            <Button className="py-3 px-7 text-xl" color="primary" onClick={handleBuyNow}>
              Buy Now
            </Button>
            <Button className="py-3 px-7 bg-gray-600 text-white text-xl" onClick={handleAddToCart}>
              Add To Cart
            </Button>
          </div>
        </div>
        <div>
          <div className="pb-10">
            <h2 className="font-bold text-[28px]">{card.title}</h2>
            <p>{card.full_description}</p>
            <div className="flex justify-start gap-3 pt-5">
              {card.categories.map((category, index) => (
                <a key={index} className="underline cursor-pointer">{category}</a>
              ))}
            </div>
          </div>

          {isModalOpen && selectedGame && (
            <ModalCheckOut
              game={selectedGame}
              totalPrice={selectedGame.price}
              isModalOpen={isModalOpen}
              setModalOpen={setIsModalOpen}
              onClose={handleCloseModal}
            />
          )}

          <div>
            <h2 className="font-bold text-[28px] pb-8">{card.title} System Requirement</h2>
            <div className="flex flex-col p-11 gap-5 bg-white rounded-xl">
              <p className="font-bold text-xl">{cardsystem.operater}</p>
              <div className="flex w-full">
                <div className="flex flex-col gap-3 w-[50%]">
                  <p className="font-bold">Minimum</p>
                  {Object.entries(cardsystem.minimum).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-default-400">{key}</p>
                      <p className="font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3 w-[50%]">
                  <p className="font-bold">Recommended</p>
                  {Object.entries(cardsystem.recomend).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-default-400">{key}</p>
                      <p className="font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-default-400">Languages Supported</p>
                <p className="font-semibold">{cardsystem.language}</p>
              </div>
              <p>{cardsystem.text}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CardDetail;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../../components/Nav";
import { useParams } from "react-router-dom";
import { Button } from "@nextui-org/button";
import CarouselImage from "./Sub-component/CaroselImage";
import Footer from "../../components/Footer/Footer";
import ModalCheckOut from "../../components/Checkout/ModalButtonCheckOut/ModalCheckOut";
import { useCart } from "../../components/Checkout/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../../Instance"

const CardDetail = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [cardsystem, setCardSystem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const { addToCart, buyNow } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // ดึงข้อมูลจาก JSON
    const fetchGameData = async () => {
      try {
        const gameResponse = await api.get(`/game/${id}`);

        const gameData = gameResponse.data.game
        const systemData = gameResponse.data.system

        setCard(gameData);
        setCardSystem(systemData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchGameData();
  }, [id]);

  if (!card || !cardsystem) {
    return <p>Loading...</p>;
  }

  const handleAddToCart = () => {
    addToCart(card._id);
  };

  const handleBuyNow = () => {
    buyNow(card);
    navigate("/checkout");
  };

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
            <p className="pt-4">{card.mainContent}</p>
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
            <p>{card.subContent}</p>
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
              <p className="font-bold text-xl">{cardsystem.operator}</p>
              <div className="flex w-full">
                <div className="flex flex-col gap-3 w-[50%]">
                  <p className="font-bold">Minimum</p>
                  {Object.entries(cardsystem.minimum)
                  .filter(([key]) => key !== "_id")
                  .map(([key, value]) => (
                    <div key={key}>
                      <p className="text-default-400">{key}</p>
                      <p className="font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3 w-[50%]">
                  <p className="font-bold">Recommended</p>
                  {Object.entries(cardsystem.recommended)
                  .filter(([key]) => key !== "_id")
                  .map(([key, value]) => (
                    <div key={key}>
                      <p className="text-default-400">{key}</p>
                      <p className="font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-default-400">Languages Supported</p>
                  {Object.entries(cardsystem.language)
                  .filter(([key]) => key !== "_id")
                  .map(([key, value]) => (
                    <div key={key}>
                      <p className="text-default-500">{key}</p>
                      <p className="font-semibold">{value}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CardDetail;

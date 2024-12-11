import React, { useState, useEffect } from "react";
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
  const [gameData, setGameData] = useState(null);
  const [gameDataSystem, setGameDataSystem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const { addToCart, buyNow } = useCart();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameImages, setGameImages] = useState([]); 
  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const gameResponse = await api.get(`/game/${id}`);

        const gameData = gameResponse.data.game
        const systemData = gameResponse.data.system
        const images = gameResponse.data?.game?.images || [];
        setGameImages(images);
        setCurrentIndex(0);  // เริ่มต้นที่ภาพแรก

        setGameData(gameData);
        setGameDataSystem(systemData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchGameData();
  }, [id]);

  
  if (!gameData || !gameDataSystem) {
    return <p>Loading...</p>;
  }

  const handleAddToCart = () => {
    addToCart(gameData);
  };
  

  const handleBuyNow = () => {
    buyNow(gameData);
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
          <h1 className="font-bold text-[28px]">{gameData.title}</h1>
          <div className="py-5">
            <CarouselImage currentIndex={ currentIndex}  gameImages={ gameImages } setCurrentIndex={ setCurrentIndex } setGameImages={ setGameImages }/>
            <p className="pt-4">{gameData.mainContent}</p>
          </div>
          <div className="flex justify-end gap-3">
            <Button className="py-3 px-7 bg-slate-100 text-xl">
              THB {gameData.price}
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
            <h2 className="font-bold text-[28px]">{gameData.title}</h2>
            <p>{gameData.subContent}</p>
            <div className="flex justify-start gap-3 pt-5">
              {gameData.categories.map((category, index) => (
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
            <h2 className="font-bold text-[24px] pb-4">{gameDataSystem.title} System Requirement</h2>
            <div className="flex flex-col p-11 gap-5 bg-white rounded-xl">
              <p className="font-bold text-xl">{gameDataSystem.operator}</p>
              <div className="flex w-full">
                <div className="flex flex-col gap-3 w-[50%]">
                  <p className="font-bold">Minimum</p>
                  {Object.entries(gameDataSystem.minimum)
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
                  {Object.entries(gameDataSystem.recommended)
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
                  {Object.entries(gameDataSystem.language)
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

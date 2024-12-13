import { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import { useParams } from "react-router-dom";
import { Button } from "@nextui-org/button";
import CarouselImage from "./Sub-component/CaroselImage";
import Footer from "../../components/Footer/Footer";
import ModalCheckOut from "../../components/Checkout/ModalButtonCheckOut/ModalCheckOut";
import { useCart } from "../../components/Checkout/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

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
        const gameResponse = await axios.get(`${API_URL}/api/game/${id}`);
        const gameData = gameResponse.data.game
        const systemData = gameResponse.data.system
        const images = gameResponse.data?.game?.images || [];
        setGameImages(images);
        setCurrentIndex(0);
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



  const handleAddToCart = async () => {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      toast.warning("Please sign in to proceed with checkout.", { autoClose: 2500 });
      navigate("/login");
      return;
    }
  
    await addToCart(gameData);
  };
  

  const handleBuyNow = async () => {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      toast.warning("Please sign in to proceed with checkout.", { autoClose: 2500 });
      navigate("/login");
      return;
    }
  
    await buyNow(gameData);
    navigate("/checkout");
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  return (
    <div>
      <Nav />
      <div className="bg-neutral-900 px-[300px] pt-[32px] pb-[120px] text-white">
        <div className="pb-[40px]">
          <h1 className="font-bold text-[28px]">{gameData.title}</h1>
          <div className="py-5">
            <CarouselImage currentIndex={ currentIndex}  gameImages={ gameImages } setCurrentIndex={ setCurrentIndex } setGameImages={ setGameImages }/>
            <p className="pt-4">{gameData.mainContent}</p>
          </div>
          <div className="flex justify-end gap-3 pr-10">
            <Button className="py-3 px-7 bg-slate-100 text-xl">
              THB {gameData.price}
            </Button>
            <Button
              className="py-3 px-7 text-xl font-bold bg-gradient-to-tr from-pink-500 to-yellow-500 via-red-500 text-white shadow-lg hover:from-blue-500 hover:via-teal-500 hover:to-green-500 transition-all duration-1000 transform hover:scale-105
              hover:[box-shadow:_0_0_10px_teal,_0_0_20px_teal,_0_0_30px_teal]
              hover:text-[#202020]"
              color="primary"
              onClick={handleBuyNow}
            >
              BUY NOW
            </Button>
            <Button
              className="py-3 px-7 text-xl font-bold bg-gradient-to-tr from-pink-500 to-yellow-500 via-red-500 text-white shadow-lg hover:from-blue-500 hover:via-teal-500 hover:to-green-500 transition-all duration-1000 transform hover:scale-105
              hover:[box-shadow:_0_0_10px_teal,_0_0_20px_teal,_0_0_30px_teal]
              hover:text-[#202020]"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </Button>
          </div>
        </div>
        <div>
          <div className="py-b">
            <h2 className="font-bold text-[28px]">{gameData.title}</h2>
            <p>{gameData.subContent}</p>
            <div className="flex justify-start gap-3 pt-5">
              {gameData.categories.map((category, index) => (
                <a key={index} className="underline cursor-pointer">
                  {category}
                </a>
              ))}
            </div>
            <div className="flex py-5">
              <p>Release Date: </p>
              <div className="pl-2">
                {new Date(gameData.date).toLocaleDateString("en-Gb", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </div>
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
            <h2 className="font-bold text-[24px] pb-4">
              {gameDataSystem.title} System Requirement
            </h2>
            <div className="flex flex-col p-11 gap-5 bg-[#252525] rounded-xl">
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
                {!(gameDataSystem.recommended.memory === 0) && (
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
                )}
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

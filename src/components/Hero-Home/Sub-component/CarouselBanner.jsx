import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import api from "../../../Instance";

function CarouselBanner({ selectedId }) {
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get("/game");
        if (selectedId) {
          const selectedItem = response.data.game.find((item) => item._id === selectedId);
          setSelectedData(selectedItem || null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [selectedId]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleCardClick = (id) => {
    navigate(`/game/${id}`);
  };

  if (!selectedData) {
    return null;
  }

  return (
    <div className="relative w-auto h-[570px]">
      <img
        src={selectedData.images[0]}
        alt={selectedData.title}
        className="bg-auto bg-no-repeat rounded-xl w-full h-full object-center transition-opacity duration-300 hover:opacity-70 cursor-pointer"
        onClick={() => handleCardClick(selectedData._id)}
      />

      <div className="absolute bottom-5 left-5 p-5 bg-black opacity-80 rounded-xl z-10 w-[450px]">
        <div className="text-start text-white">
          <div className="font-bold text-2xl pb-2">{selectedData.title}</div>
          <div className="text-lg">
            {selectedData.mainContent || "No description available."}
          </div>
        </div>
        <div className="mt-4">
          <Button
            color="primary"
            flat={false}
            size="large"
            className="px-7 z-30"
            key={selectedData._id}
            onClick={() => handleCardClick(selectedData._id)}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CarouselBanner;

import React, { useState, useEffect } from "react";
import gamedata from "../../../Data/gamedata.json"
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";

function CarouselBanner({ selectedId, initialData }) {
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState(initialData || null);

  useEffect(() => {
    if (selectedId) {
      const data = gamedata.find((item) => item.id === selectedId);
      setSelectedData(data || initialData);
    }
  }, [selectedId, initialData]);

  const handleCardClick = (id) => {
    navigate(`/card/${id}`);
};

  if (!selectedData) {
    return null;
  }

  return (
    <div className="relative w-auto h-[570px]">
      <img
        src={selectedData.pictureaddress}
        alt={selectedData.title}
        className="bg-auto bg-no-repeat rounded-xl w-full h-full object-cover transition-opacity duration-300 hover:opacity-70"
      />
      
      <div className="absolute bottom-5 left-5 p-5 bg-black opacity-80 rounded-xl z-10 w-[450px]">
        <div className="text-start text-white">
          <div className="font-bold text-2xl pb-2">{selectedData.title}</div>
          <div className="text-lg">{selectedData.short_description || "No description available."}</div>
        </div>
        <div className="mt-4">
          <Button color="primary" flat={false} size="large" className="px-7 z-30" key={selectedData.id} onClick={() => handleCardClick(selectedData.id)}>Buy Now</Button>
        </div>
      </div>
    </div>
  );
}

export default CarouselBanner;

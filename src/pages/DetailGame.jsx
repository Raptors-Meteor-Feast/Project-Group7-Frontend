import { div } from "framer-motion/client";
import React from "react";
import CaroselImage from "../components/Card-Detail/CaroselImage";

function DetailGame() {
  return (
    <div>
      {/* <div className="text-2xl text-start font-bold pl-20">
        Tower Defense: Goblin Wars
      </div> */}
      <div className="w-full m-auto pt-6">
        <CaroselImage />
      </div>
    </div>
  );
}
export default DetailGame;

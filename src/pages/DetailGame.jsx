import { div } from "framer-motion/client";
import React from "react";
import CaroselImage from "../components/Card-Detail/CaroselImage";

function DetailGame() {
  // const Images = [
  //   "https://cdn1.epicgames.com/spt-assets/b0070649c13940ca8e2f47ec4da76f5b/tower-defense-goblin-wars-etpan.jpg",
  //   "https://cdn1.epicgames.com/spt-assets/b0070649c13940ca8e2f47ec4da76f5b/tower-defense-goblin-wars-1qb50.jpg",
  //   "https://cdn1.epicgames.com/spt-assets/b0070649c13940ca8e2f47ec4da76f5b/tower-defense-goblin-wars-11sz9.jpg",
  //   "https://cdn1.epicgames.com/spt-assets/b0070649c13940ca8e2f47ec4da76f5b/tower-defense-goblin-wars-rmzr7.jpg",
  //   "https://cdn1.epicgames.com/spt-assets/b0070649c13940ca8e2f47ec4da76f5b/tower-defense-goblin-wars-1fjnn.jpg",
  //   "https://cdn1.epicgames.com/spt-assets/b0070649c13940ca8e2f47ec4da76f5b/tower-defense-goblin-wars-19b0g.jpg",
  // ];
  return (
    <div>
      <div className="text-2xl text-start font-bold">
        Tower Defense: Goblin Wars
      </div>
      <div className="w-auto m-auto pt-2">
        <CaroselImage slides={slides} />
      </div>
    </div>
  );
}
export default DetailGame;

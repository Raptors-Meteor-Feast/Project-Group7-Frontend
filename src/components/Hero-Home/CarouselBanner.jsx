import React from "react";
import { ButtonBanner } from "../BaseButton";

function CarouselBanner({
  title = "Defult: Raptors Meteor Feast Ecommerce",
  message = "Lorem ipsum dolor Voluptates pariatur dignissimos suscipit architecto sequi? Aperiam!",
}) {
  return (
    <div className="relative w-auto h-auto">
      <img
        src="https://cdn2.unrealengine.com/egs-tmnt-splintered-fate-carousel-desktop-1920x1080-29e9859f3f4c.jpg?resize=1&w=1280&h=720&quality=medium"
        alt=""
        className="bg-auto bg-no-repeat rounded-xl w-auto h-auto"
      />
      <div className="text-start w-[300px] absolute bottom-24 left-10">
        <div className="font-bold text-2xl text-white">{title}</div>
        <div className="text-lg text-white">{message}</div>
      </div>
      <div className="absolute bottom-10 left-10">
        <ButtonBanner />
      </div>
    </div>
  );
}

export default CarouselBanner;

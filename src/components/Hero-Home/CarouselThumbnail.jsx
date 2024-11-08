import React from "react";

const CarouselThumbnail = ({
  title = "Defult: Raptors Meteor Feast Ecommerce",
  handleClick,
  price = "",
}) => {
  return (
    <>
      <div
        className="bg-gray-100 p-3 rounded-lg w-64 hover:bg-gray-200 cursor-pointer"
        onClick={() => handleClick()}
      >
        <div className="flex gap-2 text-center items-center">
          <img
            src="https://cdn2.unrealengine.com/tmntsf-egsfeaturing-carouselbanner-thumbnail-1200x1600-1200x1600-1a4688622e35.jpg?resize=1&w=96&h=128&quality=medium"
            alt=""
            width={60}
            height={80}
            className="rounded-md"
          />
          <div className="text-left text-base">
            <div>{title}</div>
            <div className="text-[#637381] text-sm">{price}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarouselThumbnail;

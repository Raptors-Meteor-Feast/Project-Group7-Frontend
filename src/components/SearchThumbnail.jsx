import React from "react";

const SearchThumbnail = ({
  title = "Defult: Raptors Meteor Feast Ecommerce",
  handleClick,
  price = "",
}) => {
  return (
    <>
      <div
        className="rounded-lg w-96 hover:underline underline-offset-4 cursor-pointer p-2 bg-gray-100"
        onClick={() => handleClick()}
      >
        <div className="flex gap-2 text-center items-center">
          <img
            src="https://cdn2.unrealengine.com/tmntsf-egsfeaturing-carouselbanner-thumbnail-1200x1600-1200x1600-1a4688622e35.jpg?resize=1&w=96&h=128&quality=medium"
            alt=""
            width={40}
            height={52}
            className="rounded-md"
          />
          <div className="text-left text-base">
            <div>{title}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchThumbnail;

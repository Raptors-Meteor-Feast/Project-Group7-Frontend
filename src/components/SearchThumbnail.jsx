import React from "react";
import data from "../Data/gamedata.json";

export default function SearchThumbnail({}) {
  return (
    <>
      <div className="rounded-lg w-96 hover:underline underline-offset-4 cursor-pointer p-2 bg-gray-100">
        <div className="flex gap-2 text-center items-center">
          <img
            src={data.pictureaddress}
            alt={data.title}
            width={40}
            height={52}
            className="rounded-md"
          />
          <div className="text-left text-base">
            <div>{data.title}</div>
          </div>
        </div>
      </div>
    </>
  );
};



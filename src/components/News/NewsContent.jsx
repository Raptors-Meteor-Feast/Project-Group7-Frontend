import React, { useState } from "react";
import { useEffect } from "react";
import Nav from "../Nav";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function NewsContent() {
  const { newsId } = useParams();
  const [content, setContent] = useState([]);
  // console.log(content);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/news/${newsId}`)
      .then((res) => {
        setContent(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [newsId]);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Nav />
      <div className=" px-[300px] pt-[32px] pb-[120px] bg-neutral-900 text-white">
        <div className="pt-5">
          <img src={content.newsImageUrl} alt={content.newsHeading} />
        </div>
        <div className="py-5 pt-5">
          <p className="font-bold text-2xl">{content.newsHeading}</p>
          <p className="text-white">{content.date}</p>
        </div>
        <div>
          <p className="text-white">By {content.newsContributor}</p>
        </div>
        <div className="flex flex-col gap-4 pt-4">
          <p>{content.newsContent}</p>
          <p>{content.newsSubContent}</p>
          <img src={content.newsSubImageUrl} alt={content.newsHeading} />
          <p>{content.newsParagraph}</p>
          <p>{content.newsSubParagraph}</p>
        </div>
      </div>
    </div>
  );
}

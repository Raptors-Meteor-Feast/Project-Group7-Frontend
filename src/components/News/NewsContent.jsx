import React, { useState } from "react";
import { useEffect } from "react";
import Nav from "../Nav";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function NewsContent() {
  const { newsId } = useParams();
  const [content, setContent] = useState([]);
  console.log(content);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/news/${newsId}`)
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
      <div className=" px-[300px] pt-[32px] pb-[120px]">
        <div className="pt-5">
          <img src={content.newsImageUrl} alt={content.newsHeading} />
        </div>
        <div className="py-5 pt-5">
          <p className="font-bold text-2xl">{content.newsHeading}</p>
          <p>{content.date}</p>
        </div>
        <div>
          <p>By {content.newsContributor}</p>
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
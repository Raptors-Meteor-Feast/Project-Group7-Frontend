import React, { useEffect, useState } from "react";

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const baseUrl = process.env.VITE_API_BASE_URL;
    const FetchData = async () => {
      const response = await fetch();
    };
  });

  return <div>FetchData</div>;
};

export default FetchData;

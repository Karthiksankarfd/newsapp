// hooks/useNewsData.js
import { useEffect, useState } from "react";
import { fetchNews } from "../utils/api";

export function useNewsData(category) {
  const [data, setData] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    const timeout = setTimeout(async () => {
      const news = await fetchNews(category);
      setData(news);
      setIsTyping(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [category]);

  return { data, isTyping };
}

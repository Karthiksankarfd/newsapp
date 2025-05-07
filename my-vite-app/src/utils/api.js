// utils/api.js
import axios from "axios";

export async function fetchNews(category) {
  try {
    const results = await Promise.allSettled([
      axios.get(`https://api.gdeltproject.org/api/v2/doc/doc?query=${category}&mode=ArtList&format=json`),
      axios.get(`https://newsapi.org/v2/everything?q=${category}&from=2025-04-07&sortBy=publishedAt&apiKey=0b5bfb4105b74498b5f95779b5591256`)
    ]);

    const gdeltArticles = results[0].status === "fulfilled" ? results[0].value.data.articles || [] : [];
    const newsArticles = results[1].status === "fulfilled" ? results[1].value.data.articles || [] : [];

    const merged = [...gdeltArticles, ...newsArticles];

    return merged.map(item => ({
      url: item.url,
      title: item.title,
      description: item.description,
      urlToImage: item.urlToImage || item.socialimage,
    }));
  } catch (err) {
    console.error("API fetch error:", err);
    return [];
  }
}

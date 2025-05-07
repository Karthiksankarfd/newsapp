import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCards from "./NewsCards";
import logo from "../assets/logo.png";
import SkeletonLoader from "./SkeletonLoader";


const Navbar = () => {
  const [category, setCategory] = useState("india");
  const [data, setData] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const TOPICS = ["Technology", "Sports", "Cars", "Climate"];

//   async function getData() {
//     try {
//       let res = await axios.get(
//         `https://api.gdeltproject.org/api/v2/doc/doc?query=${category}&mode=ArtList&format=json`
//       );
//       setData(res.data.articles);
//     } catch (e) {
//       console.log(e);
//     }
//   }
  async function getData() {
    try {
      const results = await Promise.allSettled([
        axios.get(`https://api.gdeltproject.org/api/v2/doc/doc?query=${category}&mode=ArtList&format=json`),
        axios.get(`https://newsapi.org/v2/everything?q=${category}&from=2025-04-07&sortBy=publishedAt&apiKey=0b5bfb4105b74498b5f95779b5591256`)
      ]);
  
      // Extract data only from fulfilled promises
      const gdeltArticles = results[0].status === "fulfilled" ? results[0].value.data.articles || [] : [];
      console.log(gdeltArticles)
      const newsArticles = results[1].status === "fulfilled" ? results[1].value.data.articles || [] : [];
  
      // Merge both
      const merged = [...gdeltArticles, ...newsArticles];

    //   normalized 
    const normalizeNews =  merged.map(item => ({
        url:item.url,
        title: item.title,
        description: item.description,
        urlToImage: item.urlToImage || item.socialimage, // adapt based on API
      }));
      setData(normalizeNews);
    } catch (err) {
      console.error("Unexpected error:", err);
      setData([]);
    }
  }
  

  useEffect(() => {
    setIsTyping(true);
    let timeout = setTimeout(() => {
      getData();
      setIsTyping(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [category]);

  return (
    <>
      <nav className="flex flex-wrap items-center justify-between sticky top-0 bg-blue-400 p-4 shadow-2xl z-50">
        {/* Left Logo Section */}
        <div className="flex items-center w-full lg:w-auto justify-center lg:justify-start mb-4 lg:mb-0">
          <img src={logo} alt="logo" className="w-10 mr-2" />
          <h3 className="font-serif text-xl text-white">News App</h3>
        </div>

        {/* Topic Buttons */}
        <ul className="flex overflow-x-auto gap-x-4 mb-4 lg:mb-0 lg:flex-nowrap w-full lg:w-auto justify-center px-2 scrollbar-hide">
          {TOPICS.map((topic, index) => (
            <li
              key={index}
              className="text-sm text-white hover:underline cursor-pointer whitespace-nowrap"
              onClick={() => setCategory(topic)}
            >
              {topic}
            </li>
          ))}
        </ul>

        {/* Search Bar */}
        <form className="w-full lg:w-1/3">
          <input
            className="px-4 py-2 border border-black rounded w-full text-sm focus:outline-none placeholder-white bg-blue-300 text-white"
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            placeholder="Search"
            value={category}
          />
        </form>
      </nav>

      {/* Content Section */}
      <div className="p-4">
        {isTyping ? <SkeletonLoader /> : <NewsCards data={data} />}
      </div>
    </>
  );
};

export default Navbar;

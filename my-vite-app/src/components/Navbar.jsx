import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNewsData } from "../hooks/useNewsData";
import NewsCards from "./NewsCards";
import SkeletonLoader from "./SkeletonLoader";

const TOPICS = ["Technology", "Sports", "Cars", "Climate"];

const Navbar = () => {
  const [category, setCategory] = useState("india");
  const { data, isTyping } = useNewsData(category);

  return (
    <>
      <nav className="flex flex-wrap items-center justify-between sticky top-0 bg-blue-400 p-4 shadow-2xl z-50">
        <div className="flex items-center w-full lg:w-auto justify-center lg:justify-start mb-4 lg:mb-0">
          <img src={logo} alt="logo" className="w-10 mr-2" />
          <h3 className="font-serif text-xl text-white">News App</h3>
        </div>

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

      <div className="p-4">
        {isTyping ? <SkeletonLoader /> : <NewsCards data={data} />}
      </div>
    </>
  );
};

export default Navbar;

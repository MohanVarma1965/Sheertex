import React from "react";
import FilterComponent from "../Filter";

// HeaderBanner Component
const HeaderBanner: React.FC = () => {
  return (
    <header className="bg-black text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
        <div className="hidden sm:flex space-x-4 px-2">
          <a href="#" className="text-gray-300 hover:text-green-600">
            Discover
          </a>
          <a href="#" className="text-gray-300 hover:text-green-600">
            Shop All
          </a>
        </div>

        <div className="flex-grow text-center">
          <h1 className="text-2xl sm:text-3xl font-bold my-1">Sheertex</h1>
        </div>

        <div className="hidden md:flex space-x-4 px-2">
          <button className="text-gray-300 hover:text-white focus:outline-none">Login</button>
        </div>

        <div className="md:hidden">
          <FilterComponent />
        </div>
      </div>
    </header>
  );
};

export default HeaderBanner;

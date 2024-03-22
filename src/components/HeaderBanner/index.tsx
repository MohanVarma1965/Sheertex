import React from "react";
import FilterComponent from "../Filter";

// HeaderBanner Component
const HeaderBanner: React.FC = () => {
  return (
<header className="flex items-center justify-between h-16 px-4 text-white bg-black sm:px-16">
  <div className="flex-grow">
    <nav className="justify-start hidden sm:flex">
      <a href="#" className="mr-8 hover:text-green-600">Discover</a>
      <a href="#" className="hover:text-green-600">Shop All</a>
    </nav>
  </div>
  
  <div className="flex justify-center flex-grow md:-ml-36">
    <h1 className="text-2xl font-bold">Sheertex</h1>
  </div>

  <div className="flex items-center justify-end flex-grow">
    <div className="hidden sm:flex">
      <button className="hover:text-white focus:outline-none">Login</button>
    </div>
    <div className="flex sm:hidden">
      <FilterComponent />
    </div>
  </div>
</header>




  );
};

export default HeaderBanner;

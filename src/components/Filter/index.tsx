import React, { useState } from "react";
import AvailableForSaleFilter from "./AvailableForSaleFilter";
import SizesFilter from "./SizesFilter";
import SortComponent from "../Sort";
import ColorFilter from "./ColorFilter";
import ClearFilters from "./ClearFilters";
import { useAppSelector } from "../../redux/hooks";

const FilterComponent: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const filters = useAppSelector((state) => state.products.filters);

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some((filter) => filter !== null);

  return (
    <>
      <button className="py-4 px-4 rounded-md flex items-center justify-center space-x-2" onClick={toggleDrawer}>
        <span className="hidden md:inline">Filters</span>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      {drawerOpen && (
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={toggleDrawer}></div>

            <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
              {/* Side drawer container */}
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll p-4">
                  <header className="space-y-1 py-4 px-6 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <button className="text-gray-400 hover:text-gray-500" onClick={toggleDrawer}>
                        <span className="sr-only">Close panel</span>
                        Close
                      </button>
                    </div>
                  </header>
                  <AvailableForSaleFilter />
                  <SortComponent />
                  <SizesFilter />
                  <ColorFilter />

                  <div className="mt-auto p-4">
                    <div className="w-full  text-white py-2 px-4 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-75">
                      {hasActiveFilters && <ClearFilters />}
                    </div>
                    <button
                      className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-75"
                      onClick={toggleDrawer}
                    >
                      View Products
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterComponent;

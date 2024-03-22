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
      <button className="flex items-center justify-center py-2 text-white rounded-md sm:px-4 md:text-black" onClick={toggleDrawer}>
        <span className="hidden md:inline">Filters</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" />
        </svg>
      </button>

      {drawerOpen && (
        <div className="fixed inset-0 overflow-hidden text-black">
          <div className="absolute inset-0 overflow-hidden">
            {/* Background overlay */}
            <div className="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={toggleDrawer}></div>

            <section className="absolute inset-y-0 right-0 flex max-w-full pl-10">
              {/* Side drawer container */}
              <div className="w-screen max-w-md">
                <div className="flex flex-col h-full p-4 overflow-y-scroll bg-white shadow-xl">
                  <header className="px-4 py-4 space-y-1 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <button className="p-2 text-red-400 hover:text-gray-500" onClick={toggleDrawer}>
                        <span className="sr-only">Close panel</span>
                        Close
                      </button>
                    </div>
                  </header>
                  <div className="px-4">
                    <SortComponent />
                    <AvailableForSaleFilter />
                    <hr />
                    <SizesFilter />
                    <hr />
                    <ColorFilter />
                    <hr />
                  </div>
                  <div className="p-4 mt-auto">
                    <div className="w-full mb-4 text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-75">
                      {hasActiveFilters && <ClearFilters />}
                    </div>
                    <button
                      className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-75"
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

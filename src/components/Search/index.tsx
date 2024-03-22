import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSearchQuery } from "../../redux/slices/products/productsSlice";

const SearchComponent: React.FC = () => {
  const searchQuery = useAppSelector((state) => state.products.filters.searchQuery);
  const dispatch = useAppDispatch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    dispatch(setSearchQuery(query));
  };

  return (
    <input
      type="search"
      value={searchQuery} // Controlled by Redux state
      onChange={handleSearchChange}
      placeholder="Search products..."
      className="w-[96%] md:w-full mx-auto p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
      style={{ margin: "0.5rem", fontSize: "1rem" }}
    />
  );
};

export default SearchComponent;

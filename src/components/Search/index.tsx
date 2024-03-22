import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSearchQuery } from "../../redux/slices/products/productsSlice";
import { debounce } from "lodash";

const SearchComponent: React.FC = () => {
  const searchQuery = useAppSelector((state) => state.products.filters.searchQuery);
  const dispatch = useAppDispatch();

  const debouncedSearch = useCallback(
    debounce((query: string) => dispatch(setSearchQuery(query)), 300),
    [dispatch]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    debouncedSearch(query);
  };

  return (
    <input
      type="text"
      value={searchQuery} // Controlled by Redux state
      onChange={handleSearchChange}
      placeholder="Search products..."
      className="w-full p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      style={{ margin: "0.5rem", fontSize: "1rem" }}
    />
  );
};

export default SearchComponent;

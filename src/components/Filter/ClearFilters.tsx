import React from "react";
import { useAppDispatch } from "../../redux/hooks";
import { clearAllFilters } from "../../redux/slices/products/productsSlice";

const ClearFilters: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClearFilters = () => {
    dispatch(clearAllFilters());
  };

  return (
    <button
      onClick={handleClearFilters}
      className=" w-full  bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
    >
      Clear All Filters
    </button>
  );
};

export default ClearFilters;

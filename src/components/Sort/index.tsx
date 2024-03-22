import React from "react";
import { useAppDispatch } from "../../redux/hooks";
import { setSortCriteria } from "../../redux/slices/products/productsSlice";

const Sort: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [criteria, order] = event.target.value.split("_");
    dispatch(setSortCriteria({ criteria, order }));
  };

  return (
    <div className="flex items-center  rounded-md p-2">
      <div className="text-sm font-medium text-gray-700 mr-2">SortBy:</div>
      <select
        onChange={handleSortChange}
        className="flex-1 border-gray-300 text-sm rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="name_ascending">Name Ascending</option>
        <option value="name_descending">Name Descending</option>
        <option value="price_ascending">Price Ascending</option>
        <option value="price_descending">Price Descending</option>
      </select>
    </div>
  );
};

export default Sort;

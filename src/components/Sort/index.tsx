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
    <div className="py-4">
      <div className="pb-2 text-lg font-medium">Sort products</div>
      <select
        onChange={handleSortChange}
        className="flex-1 p-2 mb-4 font-medium border-gray-300 rounded-md accent-black text-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="name_ascending">Name Ascending</option>
        <option value="name_descending">Name Descending</option>
        <option value="price_ascending">Price Ascending</option>
        <option value="price_descending">Price Descending</option>
      </select>
      <hr />
    </div>
  );
};

export default Sort;

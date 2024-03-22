import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setAvailableForSaleFilter } from "../../redux/slices/products/productsSlice";

const AvailableForSaleFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const availableForSale = useAppSelector((state) => state.products.filters.availableForSale);

  const handleAvailableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAvailableForSaleFilter(event.target.checked));
  };

  return (
    <div className="flex items-center py-2">
      <input
        id="available-for-sale"
        type="checkbox"
        checked={!!availableForSale} // controlled by Redux state
        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        onChange={handleAvailableChange}
      />
      <label htmlFor="available-for-sale" className="ml-4 text-base font-medium text-gray-700">
        Available for Sale
      </label>
    </div>
  );
};

export default AvailableForSaleFilter;

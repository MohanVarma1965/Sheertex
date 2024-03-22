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
    <div className="flex items-center pt-2 pb-4">
      <input
        id="available-for-sale"
        type="checkbox"
        checked={!!availableForSale} // controlled by Redux state
        className="w-5 h-5 text-indigo-600 border-gray-300 rounded accent-red-500 focus:ring-indigo-500"
        onChange={handleAvailableChange}
      />
      <label htmlFor="available-for-sale" className="ml-4 text-base font-medium">
        Show only In-stock items
      </label>
    </div>
  );
};

export default AvailableForSaleFilter;

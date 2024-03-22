import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addSizeFilter, removeSizeFilter } from "../../redux/slices/products/productsSlice";

const SizesFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sizes } = useAppSelector((state) => state.products.filters);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSizeChange = (size: string, isChecked: boolean) => {
    if (isChecked) {
      dispatch(addSizeFilter(size));
    } else {
      dispatch(removeSizeFilter(size));
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const sizesOptions = ["S", "M", "L", "XL"];

  return (
    <div className="size-filters space-y-4">
      <button className="flex justify-between items-center py-3 w-full text-left font-semibold" onClick={toggleExpand}>
        <span className="text-lg font-medium">Shop By Size</span>
        {isExpanded ? <span>▲</span> : <span>▼</span>}
      </button>
      {isExpanded && (
        <div className="border-t border-gray-200 pt-2">
          {sizesOptions.map((size) => (
            <label key={size} className="flex items-center space-x-3 py-1">
              <input
                type="checkbox"
                checked={sizes.includes(size)}
                onChange={(e) => handleSizeChange(size, e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">{size}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default SizesFilter;

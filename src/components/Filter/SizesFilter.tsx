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
    <div className="pb-4 space-y-4 size-filters">
      <button className="flex items-center justify-between w-full pt-3 font-semibold text-left" onClick={toggleExpand}>
        <span className="text-lg font-medium">Shop by size</span>
        {isExpanded ? <span>▲</span> : <span>▼</span>}
      </button>
      {isExpanded && (
        <>
          {sizesOptions.map((size) => (
            <label key={size} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={sizes.includes(size)}
                onChange={(e) => handleSizeChange(size, e.target.checked)}
                className="w-4 h-4 border-gray-300 rounded accent-black focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700">{size}</span>
            </label>
          ))}
        </>
      )}
    </div>
  );
};

export default SizesFilter;

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addColorFilter, removeColorFilter } from "../../redux/slices/products/productsSlice";

const ColorsFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { colors } = useAppSelector((state) => state.products.filters);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleColorChange = (color: string, isChecked: boolean) => {
    if (isChecked) {
      dispatch(addColorFilter(color));
    } else {
      dispatch(removeColorFilter(color));
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Assume these are your color options, adjust as necessary
  const colorOptions = ["FED Green", "Syntax", "Sea Green / Desert", "Reactive Blue"];

  return (
    <div className="pb-4 space-y-4 color-filters">
      <button className="flex items-center justify-between w-full pt-3 font-semibold text-left" onClick={toggleExpand}>
        <span className="text-lg font-medium">Shop by color</span>
        {isExpanded ? <span>▲</span> : <span>▼</span>}
      </button>
      {isExpanded && (
        <>
          {colorOptions.map((color) => (
            <label key={color} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={colors.includes(color)}
                onChange={(e) => handleColorChange(color, e.target.checked)}
                className="w-4 h-4 text-black border-gray-300 rounded accent-black focus:ring-black"
              />
              <span className="text-sm font-medium text-gray-700">{color}</span>
            </label>
          ))}
        </>
      )}
    </div>
  );
};

export default ColorsFilter;

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
    <div className="color-filters space-y-4">
      <button className="flex justify-between items-center py-3 w-full text-left font-semibold" onClick={toggleExpand}>
        <span className="text-lg font-medium">Shop By Color</span>
        {isExpanded ? <span>▲</span> : <span>▼</span>}
      </button>
      {isExpanded && (
        <div className="border-t border-gray-200 pt-2">
          {colorOptions.map((color) => (
            <label key={color} className="flex items-center space-x-3 py-1">
              <input
                type="checkbox"
                checked={colors.includes(color)}
                onChange={(e) => handleColorChange(color, e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">{color}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorsFilter;

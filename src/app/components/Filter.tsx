import { useState } from "react";

const ProductFilter = ({ onFilterChange }: any) => {
  const [sortBy, setSortBy] = useState("default");

  const handleSortChange = (e: any) => {
    const value = e.target.value;
    setSortBy(value);
    onFilterChange(value);
  };

  return (
    <div className="flex items-center gap-4">
      <label className="ml-2 text-white" htmlFor="sort">
        Sort By:
      </label>
      <select
        id="sort"
        value={sortBy}
        onChange={handleSortChange}
        className="border p-2 rounded-md"
      >
        <option value="default">Default</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
      </select>
    </div>
  );
};

export default ProductFilter;

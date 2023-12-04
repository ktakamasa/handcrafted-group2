"use client";
import { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import ProductFilter from "../components/Filter";

async function getData() {
  const data = await fetch("/api/items");
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  return data.json();
}

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");

  const applyFilterAndSort = (data, sortBy) => {
    let filteredData = [...data];

    switch (sortBy) {
      case "lowToHigh":
        filteredData.sort((a, b) => a.price - b.price);
        break;
      case "highToLow":
        filteredData.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(filteredData);
  };

  const handleFilterChange = (sortBy) => {
    setSortOption(sortBy);
    applyFilterAndSort(products, sortBy);
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await getData();
      setProducts(data);
      applyFilterAndSort(data, sortOption);
    };

    loadData();
  }, [sortOption]);

  return (
    <div className="mx-auto max-w-4xl mt-4 bg-gradient-to-tr from-blue-900 to-black p-3">
      <div className="my-5 flex flex-col gap-4">
        <h1 className="text-white text-3xl font-bold">Products List</h1>

        <ProductFilter onFilterChange={handleFilterChange} />
      </div>
      <ProductList products={filteredProducts} />
    </div>
  );
}

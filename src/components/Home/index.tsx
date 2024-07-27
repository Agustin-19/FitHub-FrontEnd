"use client";

import { useState } from "react";
import RutinaList from "@/components/RoutinesList/index";
import { rutinas } from "../../../public/data/rutines.data";

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("");
  const [filterByPrice, setFilterByPrice] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handlePriceRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    setPriceRange((prev) => {
      if (checked) {
        return prev ? `${prev},${value}` : value;
      } else {
        return prev
          .split(",")
          .filter((v) => v !== value)
          .join(",");
      }
    });
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(event.target.value ? Number(event.target.value) : "");
  };

  const filteredRutinas = rutinas.filter((rutina) => {
    const categoryMatch = selectedCategories.length
      ? selectedCategories.includes(rutina.categoria)
      : true;

    const priceMatch = priceRange
      ? (() => {
          const ranges = priceRange.split(",");
          return ranges.some((range) => {
            const [min, max] = range.split("-").map(Number);
            return rutina.precio >= min && rutina.precio < max;
          });
        })()
      : true;

    return categoryMatch && priceMatch;
  });

  return (
    <div>
      <h1 className="text-center text-3xl font-bold text-[#97D6DF] mb-4 mt-9">
        Rutinas Disponibles
      </h1>
      <div className="flex">
        <div className="flex flex-col mr-4">
          <div className="flex flex-col border-3 mt-7 ml-4 ">
            <h2 className="text-center text-[#97D6DF]">Filtrar por Precio</h2>
            <label className="bg-[#447988] p-2 rounded mb-2 text-[#1A1D1A] text-center flex items-center">
              <input
                type="checkbox"
                value="0-20"
                checked={priceRange.includes("0-20")}
                onChange={handlePriceRangeChange}
              />
              <span className="ml-2 bg-[#447988]">0 - 20</span>
            </label>
            <label className="bg-[#447988] p-2 rounded mb-2 text-[#1A1D1A] text-center flex items-center">
              <input
                type="checkbox"
                value="20-40"
                checked={priceRange.includes("20-40")}
                onChange={handlePriceRangeChange}
              />
              <span className="ml-2 bg-[#447988]">20 - 40</span>
            </label>
            <label className="bg-[#447988] p-2 rounded mb-2 text-[#1A1D1A] text-center flex items-center">
              <input
                type="checkbox"
                value="40-100"
                checked={priceRange.includes("40-100")}
                onChange={handlePriceRangeChange}
              />
              <span className="ml-2 bg-[#447988]">40 - 100</span>
            </label>
          </div>
          <div className="flex flex-col w-[150px] text-center mt-2 ml-4">
            <h2 className="text-[#97D6DF]">Filtrar por Categoría</h2>
            <label className="bg-[#447988] p-2 rounded mb-2 text-[#1A1D1A] text-center flex items-center">
              <input
                type="checkbox"
                onChange={() => handleCategoryChange("Fuerza")}
              />
              <span className="ml-2 bg-[#447988]">Fuerza</span>
            </label>
            <label className="bg-[#447988] p-2 rounded mb-2 text-[#1A1D1A] text-center flex items-center">
              <input
                type="checkbox"
                onChange={() => handleCategoryChange("Cardio")}
              />
              <span className="ml-2 bg-[#447988]">Cardio</span>
            </label>
            <label className="bg-[#447988] p-2 rounded mb-2 text-[#1A1D1A] text-center flex items-center">
              <input
                type="checkbox"
                onChange={() => handleCategoryChange("Flexibilidad")}
              />
              <span className="ml-2 bg-[#447988]">Flexibilidad</span>
            </label>
          </div>
        </div>
        <div>
          <RutinaList rutinas={filteredRutinas} />
        </div>
      </div>
    </div>
  );
}

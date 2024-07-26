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
      <div>
        <h2>Filtrar por Precio</h2>
        <div>
          <label>
            <input
              type="checkbox"
              value="0-20"
              checked={priceRange.includes("0-20")}
              onChange={handlePriceRangeChange}
            />
            0 - 20
          </label>
          <label>
            <input
              type="checkbox"
              value="20-40"
              checked={priceRange.includes("20-40")}
              onChange={handlePriceRangeChange}
            />
            20 - 40
          </label>
          <label>
            <input
              type="checkbox"
              value="40-100"
              checked={priceRange.includes("40-100")}
              onChange={handlePriceRangeChange}
            />
            40 - 100
          </label>
        </div>
        {filterByPrice && (
          <input
            type="number"
            value={maxPrice}
            onChange={handlePriceChange}
            min="0"
          />
        )}
        <h2>Filtrar por Categoría</h2>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCategoryChange("Fuerza")}
          />
          Fuerza
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCategoryChange("Cardio")}
          />
          Cardio
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCategoryChange("Flexibilidad")}
          />
          Flexibilidad
        </label>
      </div>
      <RutinaList rutinas={filteredRutinas} />
    </div>
  );
}

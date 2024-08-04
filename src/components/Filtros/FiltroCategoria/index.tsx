import React from "react";

interface CategoryFilterProps {
  selectedCategories: string[];
  handleCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategories,
  handleCategoryChange,
}) => {
  const categories = ["Fuerza", "Cardio", "Flexibilidad"];

  return (
    <div className="flex flex-col w-[150px] text-center mt-2 ml-4">
      <h2 className="text-[#97D6DF]">Filtrar por Categoría</h2>
      {categories.map((category) => (
        <label
          key={category}
          className="bg-[#447988] p-2 rounded mb-2 text-[#1A1D1A] text-center flex items-center"
        >
          <input
            type="checkbox"
            checked={selectedCategories.includes(category)}
            onChange={() => handleCategoryChange(category)}
          />
          <span className="ml-2 bg-[#447988]">{category}</span>
        </label>
      ))}
    </div>
  );
};

export default CategoryFilter;
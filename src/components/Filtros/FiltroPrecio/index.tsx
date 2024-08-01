import React from "react";

interface PriceFilterProps {
    priceRange: string;
    handlePriceRangeChange: (range: string) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
    priceRange,
    handlePriceRangeChange,
}) => {
    const priceRanges = ["0-20", "20-40", "40-100"];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        handlePriceRangeChange(
            checked
                ? priceRange
                    ? `${priceRange},${value}`
                    : value
                : priceRange
                    .split(",")
                    .filter((v) => v !== value)
                    .join(",")
        );
    };

    return (
        <div className="flex flex-col border-3 mt-7 ml-4 ">
            <h2 className="text-center text-[#97D6DF]">Filtrar por Precio</h2>
            {priceRanges.map((range) => (
                <label
                    key={range}
                    className="bg-[#447988] p-2 rounded mb-2 text-[#1A1D1A] text-center flex items-center"
                >
                    <input
                        type="checkbox"
                        value={range}
                        checked={priceRange.includes(range)}
                        onChange={handleChange}
                    />
                    <span className="ml-2 bg-[#447988]">{range}</span>
                </label>
            ))}
        </div>
    );
};

export default PriceFilter;

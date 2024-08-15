"use client";
import { ICategory, ISearch } from "@/interface/plan.interface";
import { get_Category } from "@/server/fetchPlan";
import React, { useEffect, useState } from "react";
import styles from "./search.module.css";
import Link from "next/link";

interface SearchComponentProps {
  fetchItems: (params: ISearch) => Promise<any[]>;
  renderList: (items: any[]) => JSX.Element;
  error: string | null;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  fetchItems,
  renderList,
  error,
}) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<ISearch>({
    limit: "6",
    category: "",
    location: "",
    difficultyLevel: "",
    search: "",
    page: "1",
  });
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await get_Category();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    if (name === "difficultyLevel") {
      setSearchParams((prev) => {
        const currentLevels = (prev.difficultyLevel || "")
          .split(",")
          .filter(Boolean);
        if (checked) {
          return {
            ...prev,
            difficultyLevel: [...currentLevels, value].join(","),
          };
        } else {
          const updatedLevels = currentLevels.filter(
            (level) => level !== value
          );
          return {
            ...prev,
            difficultyLevel: updatedLevels.join(","),
          };
        }
      });
    } else {
      setSearchParams({
        ...searchParams,
        [name]: value,
      });
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };

  const fetchAndSetItems = async () => {
    setLoading(true);
    try {
      const data = await fetchItems(searchParams);
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetItems();
  }, [page]);

  const handlePrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
    setSearchParams((prev) => ({ ...prev, page: String(page - 1) }));
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
    setSearchParams((prev) => ({ ...prev, page: String(page + 1) }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    setSearchParams((prev) => ({ ...prev, page: "1" }));
    fetchAndSetItems();
  };

  const handleClearSearch = () => {
    setSearchParams((prev) => ({
      ...prev,
      search: "",
    }));
  };

  if (loading) {
    return <div className="text-center text-white">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <Link href="/home">
        <button className="m-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
          Volver
        </button>
      </Link>
      <div className="text-center z-10 ">
        <div className="flex justify-center items-center space-x-4 mb-8">
          <span
            className="text-5xl font-bold stroke-text text-[#FF3E1A] animate-fadeIn"
            data-text="Explora nuestros"
          >
            Explora nuestras
          </span>
          <span className="text-6xl font-bold text-[#97D6DF] animate-fadeIn">
            diversas opciones para
          </span>
          <span className="text-5xl font-bold text-[#FF3E1A] animate-fadeIn">
            dar forma a tu cuerpo
          </span>
        </div>
      </div>
      <div className="flex">
        <form
          onSubmit={handleSubmit}
          className={`${styles.form} flex flex-col `}
        >
          {/* search */}
          <div className="form relative mb-3 ">
            <button
              type="button"
              className="absolute left-2 -translate-y-1/2 top-1/2 p-1"
            >
              <svg
                width="17"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="search"
                className="w-5 h-5 text-[#97D6DF]"
              >
                <path
                  d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                  stroke="currentColor"
                  strokeWidth="1.333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
            <input
              type="text"
              name="search"
              placeholder="Buscar..."
              value={searchParams.search}
              onChange={handleChange}
              className="input  rounded-full px-8 py-3 w-5/6 border-2 border-transparent focus:outline-none focus:border-[#FF3E1A] placeholder-[#97D6DF] transition-all duration-300 shadow-md bg-[#1A1D1A]"
            />
            <button
              type="reset"
              onClick={handleClearSearch}
              className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-[#97D6DF]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          {/* select category */}
          <div className="flex border-3 flex-col p-4">
            <label className="relative text-[#97D6DF] flex cursor-pointer mb-2 gap-[1em] ">
              Categoría:
            </label>
            <select
              name="category"
              value={searchParams.category || ""}
              onChange={handleCategoryChange}
              className="relative block w-[300px] border-1 border-solid border-[#FF3E1A] rounded bg-transparent px-3 py-2 text-[#97D6DF] focus:outline-none focus:ring-2 focus:ring-[#FF3E1A] transition duration-150 ease-in-out text-center"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* checkbox difficulty level */}
          <div className="flex border-3 flex-col p-4 mb-9">
            <label className="relative text-[#97D6DF] flex cursor-pointer mb-2 gap-[1em]">
              Nivel de Dificultad:
            </label>
            <div className="relative text-[#447988] flex cursor-pointer items-center gap-[1em]">
              <input
                type="checkbox"
                name="difficultyLevel"
                value="inicial"
                checked={searchParams.difficultyLevel
                  ?.split(",")
                  .includes("inicial")}
                onChange={handleChange}
                className="form-checkbox rounded-full text-[#97D6DF] focus:ring-0 checked:bg-[#97D6DF] w-[20px] h-[20px]  "
              />
              Inicial
            </div>
            <div className="relative text-[#447988] flex cursor-pointer items-center gap-[1em]">
              <input
                type="checkbox"
                name="difficultyLevel"
                value="intermedio"
                checked={searchParams.difficultyLevel
                  ?.split(",")
                  .includes("intermedio")}
                onChange={handleChange}
                className="form-checkbox rounded-full text-[#97D6DF] focus:ring-0 checked:bg-[#97D6DF] w-[20px] h-[20px]  "
              />
              Intermedio
            </div>
            <div className="relative text-[#447988] flex cursor-pointer items-center gap-[1em]">
              <input
                type="checkbox"
                name="difficultyLevel"
                value="avanzado"
                checked={searchParams.difficultyLevel
                  ?.split(",")
                  .includes("avanzado")}
                onChange={handleChange}
                className="form-checkbox rounded-full text-[#97D6DF] focus:ring-0 checked:bg-[#97D6DF] w-[20px] h-[20px]  "
              />
              Avanzado
            </div>
            <div className="relative text-[#447988] flex cursor-pointer items-center gap-[1em]">
              <input
                type="checkbox"
                name="difficultyLevel"
                value="profesional"
                checked={searchParams.difficultyLevel
                  ?.split(",")
                  .includes("profesional")}
                onChange={handleChange}
                className="form-checkbox rounded-full text-[#97D6DF] focus:ring-0 checked:bg-[#97D6DF] w-[20px] h-[20px]  "
              />
              Profesional
            </div>
          </div>

          <button
            type="submit"
            className="relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]"
          >
            Buscar
          </button>
        </form>
        <div className="flex flex-col">
          <div>{renderList(items)}</div>
          <div className="flex justify-center items-center space-x-4 mt-4">
            <button
              onClick={handlePrevious}
              disabled={page === 1}
              className="relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]"
            >
              Anterior
            </button>
            <span className="text-[#97D6DF]">Página {page}</span>
            <button
              onClick={handleNext}
              className="relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;

"use client";
import { ICategory, ISearch } from "@/interface/plan.interface";
import { get_Category } from "@/server/fetchPlan";
import React, { useEffect, useState, useCallback } from "react";
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
    limit: "",
    category: "",
    location: "",
    difficultyLevel: "",
    search: "",
    page: "1",
  });
  const [items, setItems] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    if (name === "category") {
      setSearchParams((prev) => {
        const currentCategories = (prev.category || "")
          .split(",")
          .filter(Boolean); // Ensure category is defined
        if (checked) {
          return {
            ...prev,
            category: [...currentCategories, value].join(","),
          };
        } else {
          const updatedCategories = currentCategories.filter(
            (cat) => cat !== value
          );
          return {
            ...prev,
            category: updatedCategories.join(","),
          };
        }
      });
    } else if (name === "difficultyLevel") {
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

  // *************** CATEGORIAS ***********************
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

  const fetchAndSetItems = async () => {
    const { limit, category, location, difficultyLevel, search } = searchParams;
    setLoading(true);
    try {
      const queryString = {
        ...searchParams,
        page: page.toString(),
        category: category,
      };
      const data = await fetchItems(queryString);
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
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    fetchAndSetItems();
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
        <button className="mt-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
          Volver
        </button>
      </Link>
      <div className="text-center z-10">
        <div className="flex justify-center space-x-4 mb-8">
          <span
            className="text-4xl font-bold stroke-text animate-fadeIn"
            data-text="Explora nuestros"
          >
            Explora nuestros
          </span>
          <span className="text-4xl font-bold text-[#97D6DF] animate-fadeIn">
            elementos para
          </span>
          <span className="text-4xl font-bold text-[#447988] animate-fadeIn">
            dar forma a tu cuerpo
          </span>
        </div>
      </div>
      <div className="flex">
        <form
          onSubmit={handleSubmit}
          className={`${styles.form} flex flex-col`}
        >
          <input
            type="text"
            name="search"
            placeholder="Buscar..."
            value={searchParams.search}
            onChange={handleChange}
            className="p-2 rounded border mb-2"
          />
          <div className="flex flex-col">
            <label className="mb-2">Categoría:</label>
            {categories.map((category) => (
              <div key={category.id} className="mb-2">
                <input
                  type="checkbox"
                  name="category"
                  value={category.id}
                  checked={
                    searchParams.category?.split(",").includes(category.id) ||
                    false
                  }
                  onChange={handleChange}
                />
                <span className="ml-2">{category.name}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Nivel de Dificultad:</label>
            <div className="mb-2">
              <input
                type="checkbox"
                name="difficultyLevel"
                value="inicial"
                checked={
                  searchParams.difficultyLevel
                    ?.split(",")
                    .includes("inicial") || false
                }
                onChange={handleChange}
              />
              <span className="ml-2">Inicial</span>
            </div>
            <div className="mb-2">
              <input
                type="checkbox"
                name="difficultyLevel"
                value="intermedio"
                checked={
                  searchParams.difficultyLevel
                    ?.split(",")
                    .includes("intermedio") || false
                }
                onChange={handleChange}
              />
              <span className="ml-2">Intermedio</span>
            </div>
            <div className="mb-2">
              <input
                type="checkbox"
                name="difficultyLevel"
                value="avanzado"
                checked={
                  searchParams.difficultyLevel
                    ?.split(",")
                    .includes("avanzado") || false
                }
                onChange={handleChange}
              />
              <span className="ml-2">Avanzado</span>
            </div>
            <div className="mb-2">
              <input
                type="checkbox"
                name="difficultyLevel"
                value="profesional"
                checked={
                  searchParams.difficultyLevel
                    ?.split(",")
                    .includes("profesional") || false
                }
                onChange={handleChange}
              />
              <span className="ml-2">Profesional</span>
            </div>
          </div>
          <button type="submit" className="p-2 rounded bg-blue-500 text-white">
            Buscar
          </button>
        </form>
        <div className="ml-4 flex-grow">
          {renderList(items)}
          <div className="daisy-join flex justify-center">
            <button
              className="daisy-join-item daisy-btn z-10"
              onClick={handlePrevious}
            >
              «
            </button>
            <button className="daisy-join-item daisy-btn z-10">
              Page {page}
            </button>
            <button
              className="daisy-join-item daisy-btn z-10"
              onClick={handleNext}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;

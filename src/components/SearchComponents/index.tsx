"use client";
import { ICategory, ISearch } from "@/interface/plan.interface";
import { get_Category } from "@/server/fetchPlan";
import React, { useEffect, useState, useCallback } from "react";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
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

  const fetchAndSetItems = useCallback(async () => {
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
  }, [page, searchParams, fetchItems]);

  useEffect(() => {
    fetchAndSetItems();
  }, [fetchAndSetItems]);

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
    <div className="bg-[#1A1D1A] p-8">
      <div className="text-center">
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
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex space-x-4">
          <input
            type="text"
            name="search"
            placeholder="Buscar..."
            value={searchParams.search}
            onChange={handleChange}
            className="p-2 rounded border"
          />
          <select
            id="category"
            name="category"
            value={searchParams.category}
            onChange={handleChange}
            className="daisy-select daisy-select-bordered w-full max-w-xs"
          >
            <option value="">Seleccionar Categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            name="difficultyLevel"
            value={searchParams.difficultyLevel}
            onChange={handleChange}
            className="p-2 rounded border"
          >
            <option value="">Nivel de Dificultad</option>
            <option value="inicial">Inicial</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
            <option value="profesional">Profesional</option>
          </select>
          <button type="submit" className="p-2 rounded bg-blue-500 text-white">
            Buscar
          </button>
        </div>
      </form>
      {renderList(items)}
      <div className="daisy-join flex justify-center">
        <button className="daisy-join-item daisy-btn" onClick={handlePrevious}>
          «
        </button>
        <button className="daisy-join-item daisy-btn">Page {page}</button>
        <button className="daisy-join-item daisy-btn" onClick={handleNext}>
          »
        </button>
      </div>
    </div>
  );
};

export default SearchComponent;

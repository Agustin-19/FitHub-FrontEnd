"use client";
import { ICategory, ISearch } from "@/interface/plan.interface";
import { get_Category } from "@/server/fetchPlan";
import React, { useEffect, useState } from "react";
import styles from "./search.module.css";

interface SearchComponentProps {
  fetchItems: (params: ISearch) => Promise<any[]>;
  renderList: (items: any[]) => JSX.Element;
  error: string | null;
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
  useEffect(() => {
    fetchAndSetItems();
  }, [page]);

  const handlePrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handlePrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    fetchAndSetItems();
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    fetchAndSetItems();
  };

  if (loading) {
    return <div className="text-center text-white">Cargando...</div>;
  }
  if (loading) {
    return <div className="text-center text-white">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col w-[400px]  items-start justify-center">
      <form onSubmit={handleSubmit} className=" border w-[300px] ml-6 p-4 z-10">
        <div className="flex flex-col  ">
          <div className={styles.group}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>

            <input
              type="text"
              name="search"
              placeholder="Buscar..."
              value={searchParams.search}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <select
            id="category"
            name="category"
            value={searchParams.category}
            onChange={handleChange}
            className="daisy-select daisy-select-bordered max-w-xs"
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
      <div className="daisy-join z-10">
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

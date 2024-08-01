"use client";
import { useContext, useEffect, useState, useCallback } from "react";
import RutinaList from "../RoutinesList";
import "./programs.module.css";
import { RutinaContext } from "@/context/trainingContext";

const Programas: React.FC = () => {
  const { rutinas, setRutinas, error, setError, getAllRutinas } =
    useContext(RutinaContext);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    limit: "",
    category: "",
    location: "",
    difficultyLevel: "",
    search: "",
  });

  const fetchRutinas = async () => {
    const { limit, category, location, difficultyLevel, search } = searchParams;
    setLoading(true);
    try {
      const queryString = {
        page: page.toString(),
        limit,
        category,
        location,
        difficultyLevel,
        search,
      };

      const data = await getAllRutinas(queryString);
      setRutinas(data);
    } catch (err) {
      setError("Error al obtener las rutinas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRutinas();
  }, []);

  const handlePrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
    fetchRutinas(); // Fetch routines for the new page
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
    fetchRutinas(); // Fetch routines for the new page
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
            className={`text-4xl font-bold stroke-text animate-fadeIn`}
            data-text="Explora nuestros"
          >
            Explora nuestros
          </span>
          <span className="text-4xl font-bold text-[#97D6DF] animate-fadeIn">
            programas para
          </span>
          <span className="text-4xl font-bold text-[#447988] animate-fadeIn">
            dar forma a tu cuerpo
          </span>
        </div>
      </div>
      <RutinaList rutinas={rutinas} />
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

export default Programas;

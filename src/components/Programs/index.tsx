"use client";
import { useEffect, useState } from "react";
import RutinaList from "../RoutinesList";
import "./programs.module.css";
const API = "http://localhost:3001";

export default function Programas() {
  const [rutinas, setRutinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Función para obtener los datos del backend
    const fetchRutinas = async () => {
      try {
        const response = await fetch(`${API}/rutina?limit=${6}&page=${page}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener las rutinas");
        }
        const rutinas = await response.json();
        console.log(rutinas);

        setRutinas(rutinas);
      } catch (err) {
        console.log("error");
      } finally {
        setLoading(false);
      }
    };

    fetchRutinas();
  }, [page]);

  const handlePrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
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
}

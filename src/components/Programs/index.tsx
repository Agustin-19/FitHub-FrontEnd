'use client';
import { useEffect, useState } from "react";
import RutinaList from "../RoutinesList";
import "./programs.module.css";

import { get_Rutinas } from "@/server/fetchRoutines";
import { IRutina } from "@/interface/interface"; // Asegúrate de importar el tipo correctamente

const Programas = () => {
  const [rutinas, setRutinas] = useState<IRutina[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRutinas = async () => {
      try {
        const fetchedRutinas: IRutina[] = await get_Rutinas();
        setRutinas(fetchedRutinas);
      } catch (err) {
        console.error("Error fetching rutinas:", err);
        console.log(err);
        
      } finally {
        setLoading(false);
      }
    };

    fetchRutinas();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar las rutinas</div>;
  }

  return (
    <div className="relative z-10 p-8" data-aos="fade-up">
      <div className="text-center">
        <div className="flex justify-center space-x-4 mb-8">
          <span
            className={`text-5xl font-bold stroke-text animate-fadeIn`}
            data-text="Explora nuestros"
          >
            Explora nuestros
          </span>
          <span className="text-4xl font-bold text-[#97D6DF] animate-fadeIn">
            programas para
          </span>
          <span className="text-5xl font-bold text-[#447988] animate-fadeIn">
            dar forma a tu cuerpo
          </span>
        </div>
      </div>
      <RutinaList rutinas={rutinas} />
    </div>
  );
};

export default Programas;

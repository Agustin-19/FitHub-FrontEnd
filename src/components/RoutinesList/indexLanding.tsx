"use client";

import RutinaList from ".";
import { RutinaContext } from "@/context/trainingContext";
import { useContext, useEffect, useState } from "react";
import { ISearch } from "@/interface/plan.interface";

const RutinaListLanding: React.FC = () => {
  const { rutinas, getAllRutinas } = useContext(RutinaContext);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [selectedRutinas, setSelectedRutinas] = useState([]);

  useEffect(() => {
    const searchQuery: ISearch = {};

    const fetchRutinas = async () => {
      try {
        const data = await getAllRutinas(searchQuery);
        setSelectedRutinas(getRandomRutinas(data, 3));
      } catch (e) {
        if (e instanceof Error) {
          setFetchError(e);
        } else {
          setFetchError(new Error("Error desconocido"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRutinas();
  }, []);

  useEffect(() => {
    if (!isLoading && rutinas.length > 0) {
      const interval = setInterval(() => {
        setSelectedRutinas(getRandomRutinas(rutinas, 3));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [rutinas, isLoading]);

  const getRandomRutinas = (rutinas: any, num: any) => {
    const shuffled = rutinas.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  if (isLoading) {
    return <div>Cargando rutinas...</div>;
  }

  if (fetchError) {
    return <div>Error al cargar rutinas: {fetchError.message}</div>;
  }

  return (
    <div className="flex justify-center">
      <RutinaList rutinas={selectedRutinas} />
    </div>
  );
};

export default RutinaListLanding;

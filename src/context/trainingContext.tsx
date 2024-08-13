"use client";
import { IRutina } from "@/interface/interface";
import { IRutinaContextProps, ISearch } from "@/interface/plan.interface";
import { get_Rutinas } from "@/server/fetchRoutines";
import { createContext, useContext, useState, ReactNode } from "react";

export const RutinaContext = createContext<IRutinaContextProps>({
  rutinas: [],
  setRutinas: () => {},
  error: null,
  setError: () => {},
  getAllRutinas: async () => [],
});

export const RutinaProvider = ({ children }: { children: ReactNode }) => {
  const [rutinas, setRutinas] = useState<IRutina[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getAllRutinas = async (queryString: ISearch): Promise<IRutina[]> => {
    try {
      const data = await get_Rutinas(queryString);
      setRutinas(data);
      return data;
    } catch (error) {
      console.error("Error en getAllRutinas:", error);
      setError("Error al obtener las rutinas");
      return [];
    }
  };

  return (
    <RutinaContext.Provider
      value={{ rutinas, setRutinas, error, setError, getAllRutinas }}
    >
      {children}
    </RutinaContext.Provider>
  );
};
export const useRutinaContext = () => {
  const context = useContext(RutinaContext);
  if (!context) {
    throw new Error("useRutinaContext must be used within a RutinaProvider");
  }
  return context;
};

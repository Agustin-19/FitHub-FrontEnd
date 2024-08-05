"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { IPlan, IPlanContextProps, ISearch } from "@/interface/plan.interface";
import { get_Plan } from "@/server/fetchPlan";

export const PlanContext = createContext<IPlanContextProps>({
  plans: [],
  setPlans: () => {},
  error: null,
  setError: () => {},
  getAllPlanes: async () => [],
});

export const PlanProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getAllPlanes = async (queryString: ISearch): Promise<IPlan[]> => {
    try {
      const data = await get_Plan(queryString);
      setPlans(data);
      return data;
    } catch (err) {
      setError("Error al obtener los Planes");
      return [];
    }
  };

  return (
    <PlanContext.Provider
      value={{ plans, setPlans, error, setError, getAllPlanes }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlanContext = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlanContext debe usarse dentro de PlanProvider");
  }
  return context;
};

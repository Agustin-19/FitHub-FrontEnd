import { Dispatch, SetStateAction } from "react";
import { IRutina, IRutinaEjercicio, IUser } from "./interface";

enum Dificultad {
  INICIAL = "inicial",
  INTERMEDIO = "intermedio",
  AVANZADO = "avanzado",
  PROFESIONAL = "profesional",
}

interface ICreatePlan {
  name: string;
  category: string[];
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  difficultyLevel: string;
  imgUrl: string;
  price: number;
}

interface IPlan {
  id: string;
  name: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  difficultyLevel?: string;
  admin?: string;
  category: ICategory[];
  check?: boolean;
  date?: string;
  isActive: boolean;
  price: string;
  imgUrl: string;
}

interface IPlanUpdate {
  id?: string;
  name: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  difficultyLevel?: string;
  admin?: string;
  category?: string[];
  categoryToUpdate: string[];
  check?: boolean;
  date?: string;
  isActive?: boolean;
  price: number;
  imgUrl: string;
}

interface ICategory {
  id: string;
  name: string;
}

interface IGetRutYPlan {
  id: string;
  routine: IRutina[];
  subsciption: IPlan[];
}

interface IGetCouchRutYPlan {
  id: string;
  routineAdmin: IRutina[];
  planAdmin: IPlan[];
  exercise: IRutinaEjercicio[];
}

interface IRutinaContextProps {
  rutinas: IRutina[];
  setRutinas: (rutinas: IRutina[]) => void;
  error: string | null;
  setError: (error: string | null) => void;
  getAllRutinas: (queryString: ISearch) => Promise<IRutina[]>;
}

interface IPlanContextProps {
  plans: IPlan[];
  setPlans: (planes: IPlan[]) => void;
  error: string | null;
  setError: (error: string) => void;
  getAllPlanes: (params: ISearch) => Promise<IPlan[]>;
  selectedPlanId: string | null;
  setSelectedPlanId: (id: string | null) => void;
}

interface ISearch {
  limit?: string;
  page?: string;
  category?: string;
  location?: string;
  difficultyLevel?: string;
  search?: string;
}

export type {
  IGetCouchRutYPlan,
  IGetRutYPlan,
  ICreatePlan,
  IPlan,
  ICategory,
  Dificultad,
  IRutinaContextProps,
  ISearch,
  IPlanContextProps,
  IPlanUpdate
};

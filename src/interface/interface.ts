import { Dificultad } from "@/interface/plan.interface";
// Users:

interface IUser {
  name: string;
  email: string;
  dni: number;
  address: string;
  phone: number;
  country: string;
  city: string;
  statusMembrecia?: string;
  fotosPerfil?: string;
  role?: string;
  password: string;
  rutinas?: IRutina[];
  actividades?: number[];
  id: number;
  borradologico: boolean;
}

interface IRegisterUser {
  name: string;
  email: string;
  dni: number;
  password: string;
  passwordConfirm: string;
  phone: number;
  country: string;
  address: string;
  city: string;
  delete: boolean;
}

interface ICreateCredential {
  password: string;
  id: number;
}

interface ILogin {
  email: string;
  password: string;
}

interface IloginUserRegister {
  name: string;
  login: boolean;
  token: string;
  role: string;
  user: Partial<IUser> | null;
}

interface IUserConext {
  user: Partial<IloginUserRegister> | null;
  setUser: React.Dispatch<
    React.SetStateAction<Partial<IloginUserRegister> | null>
  >;
  isLogged: boolean;
  signIn: (credentials: ILogin) => Promise<boolean>;
  signUp: (user: IRegisterUser) => Promise<string | false>;
  logOut: () => void;
  getRutinas: () => void;
  getActividades: () => void;
  setIsLogged: (isLogged: boolean) => void;
  rutinas: IRutina[];
  actividades: ICreateActividadDpto[];
}

// Rutinas

interface IRutina {
  id: number;
  name: string;
  description: string;
  precio?: number;
  imgUrl?: string;
  category: string;
  difficultyLevel: Dificultad;
  exercise: IRutinaEjercicio[];
}

interface IRutinaEjercicio {
  id?: string;
  titulo: string;
  descripcion: string;
  imgUrl: string[] | null;
}

interface ICreateRutinaDpto {
  id: number;
  user: IUser;
  rutinas: number[];
}

interface IRutinaList {
  rutinas: IRutina[];
}

interface IFilters {
  fuerza: boolean;
  cardio: boolean;
  flexibilidad: boolean;
}

interface IRutinaListProps {
  rutinas: IRutina[];
  filters: IFilters;
}
// Actividades

interface IActividad {
  id: number;
  name: string;
  description: string;
  imagen: string;
  dias: string[];
  horarios: string[];
  precio: number;
  categoria: string;
  borradologico: boolean;
}

interface ICreateActividadDpto {
  id: number;
  user: IUser;
  actividades: number[];
}

interface IActividadList {
  actividades: IActividad[];
}

// Login and Register

interface IErrorsLogin {
  email?: string;
  password?: string;
}

interface IErrorsRegister {
  name?: string;
  email?: string;
  dni?: string;
  address?: string;
  city?: string;
  country?: string;
  password?: string;
  passwordConfirm?: string;
  phone?: string;
  delete?: boolean;
}

export type {
  IUser,
  ILogin,
  IloginUserRegister,
  IUserConext,
  IRutina,
  IRutinaEjercicio,
  ICreateRutinaDpto,
  IActividad,
  ICreateActividadDpto,
  IRutinaList,
  IRegisterUser,
  ICreateCredential,
  IActividadList,
  IErrorsLogin,
  IErrorsRegister,
  IRutinaListProps,
  IFilters,
};

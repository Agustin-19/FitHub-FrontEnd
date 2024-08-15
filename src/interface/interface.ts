import {
  Dificultad,
  ICategory,
  IGetCouchRutYPlan,
  IGetRutYPlan,
} from "@/interface/plan.interface";
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
  imgUrl?: string;
  role?: string;
  password: string;
  rutinas?: IRutina[];
  solicitud: string;
  actividades?: number[];
  id: string;
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

interface IRegister3ros {
  name: string;
  email: string;
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
  sub: string;
  email ?: string;
  imgUrl ?: string;
  id ?: string;
}

interface IUserConext {
  user: Partial<IloginUserRegister> | null;
  setUser: React.Dispatch<
    React.SetStateAction<Partial<IloginUserRegister> | null>
  >;
  isLogged: boolean;
  signIn: (credentials: ILogin) => Promise<boolean>;
  loginAuth0: (credentials: IRegister3ros) => Promise<boolean>;
  signUp: (user: IRegisterUser) => Promise<string | false>;
  logOut: () => void;
  getRutinas: () => void;
  getActividades: () => void;
  setIsLogged: (isLogged: boolean) => void;
  rutinas: IRutina[];
  actividades: ICreateActividadDpto[];
  ejercicios: IRutinaEjercicio[];
  getUserRutinasYPlanes: (userId: string) => Promise<IGetRutYPlan | null>;
  getCouchRutinasYPlanes: (userId: string) => Promise<IGetCouchRutYPlan | null>;
}

// Rutinas

interface IRutina {
  id: string;
  name: string;
  description: string;
  price?: number;
  imgUrl?: string;
  category: ICategory[];
  difficultyLevel: Dificultad;
  exercise: IRutinaEjercicio[];
}

export interface ICreateRutina {
  id?: string;
  name: string;
  description: string;
  precio?: number;
  imgUrl?: string[];
  category: string[];
  difficultyLevel: Dificultad;
  exercise: string[];
}

export interface ICreateRutinaDto {
  name: string;
  description: string;
  precio?: number;
  imgUrl?: string[];
  category: string[];
  difficultyLevel: Dificultad;
  exercise: string[];
}
interface IRutinaEjercicio {
  id?: string;
  titulo: string;
  descripcion: string;
  imgUrl: string[] | null;
  videoUrl: string | null;
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

//Comentarios

// interface IAllComentarios {
//   description: string;
//   score: number;
//   routine: string;
//   id: string;
//   isActive: boolean;
//   date: string;
// }

// interface IComentarioRutina {
//   routine: string;
//   description: string;
//   score: number;
//   isActive: boolean;
// }

// interface IComentarioPlan {
//   planId: string;
//   description: string;
//   score: number;
//   isActive: boolean;
// }

export type {
  // IAllComentarios,
  // IComentarioPlan,
  // IComentarioRutina,
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
  IRegister3ros,
};

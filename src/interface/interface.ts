// Users:

interface IUser {
  name: string;
  email: string;
  address: string;
  city: string;
  telefono: string;
  statusMembrecia?: string;
  fotosPerfil?: string;
  role?: string;
  password: string;
  rutinas?: number[];
  actividades?: number[];
  id: number;
  borradologico: boolean;
}

interface IRegisterUser {
  name: string;
  email: string;
  address: string;
  city: string;
  role?: string;
  password: string;
  telefono: string;
  fotoPerfil?: string;
  statusMembrecia?: string;
  credential: ICreateCredential;
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
  login: boolean;
  token: string;
  user: Partial<IUser> | null;
}

interface IUserConext {
  user: Partial<IloginUserRegister> | null;
  setUser: React.Dispatch<
    React.SetStateAction<Partial<IloginUserRegister> | null>
  >;
  isLogged: boolean;
  signIn: (credentials: ILogin) => Promise<boolean>;
  signUp: (user: Omit<IUser, "id">) => Promise<boolean>;
  logOut: () => void;
  getRutinas: () => void;
  getActividades: () => void;
  setIsLogged: (isLogged: boolean) => void;
  rutinas: ICreateRutinaDpto[];
  actividades: ICreateActividadDpto[];
}

// Rutinas

interface IRutina {
  id: number;
  name: string;
  description: string;
  precio: number;
  imagen: string;
  categoria: string;
  ejercicios: IRutinaEjercicio[];
  borradologico: boolean;
}

interface IRutinaEjercicio {
  id: number;
  name: string;
  description: string;
  imagen: string;
  series: number;
  repeticiones: number;
  tiempoActividad: number;
  tiempoDescanso: number;
}

interface ICreateRutinaDpto {
  id: number;
  user: IUser;
  rutinas: number[];
}

interface IRutinaList {
  rutinas: IRutina[];
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
};

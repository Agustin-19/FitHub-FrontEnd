"use client";
import { useEffect, useState, createContext } from "react";
import {
  postSignin,
  postSigup,
  getUserRutinas,
  getUserActividades,
} from "../server/fetchUser";
import {
  IUserConext,
  IloginUserRegister,
  ICreateRutinaDpto,
  ICreateActividadDpto,
  IUser,
  ILogin,
} from "../interface/interface";

export const UserContext = createContext<IUserConext>({
  user: null,
  setUser: () => {},
  isLogged: false,
  signIn: async () => false,
  signUp: async () => false,
  rutinas: [],
  actividades: [],
  logOut: () => {},
  getRutinas: () => {},
  getActividades: () => {},
  setIsLogged: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Partial<IloginUserRegister> | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [rutinas, setRutinas] = useState<ICreateRutinaDpto[]>([]);
  const [actividades, setActividades] = useState<ICreateActividadDpto[]>([]);

  const signUp = async (user: Omit<IUser, "id">) => {
    try {
      const data = await postSigup(user);
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const signIn = async (credentials: ILogin) => {
    try {
      const data = await postSignin(credentials);
      if (!data.token) {
        throw new Error("Token Invalido");
      }

      setUser(data);
      typeof window !== "undefined" &&
        localStorage.setItem("user", JSON.stringify(data));
      typeof window !== "undefined" &&
        localStorage.setItem("token", data.token);
      setIsLogged(true);
      return true;
    } catch (error) {
      console.log("SignIn in Failed", error);
      return false;
    }
  };

  const getActividades = async () => {
    try {
      const token: string =
        (typeof window !== "undefined" && localStorage.getItem("token")) || "";
      const data = await getUserActividades(token);
      setActividades(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRutinas = async () => {
    try {
      const token: string =
        (typeof window !== "undefined" && localStorage.getItem("token")) || "";
      const data = await getUserRutinas(token);
      setRutinas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    typeof window !== "undefined" && localStorage.removeItem("user");
    typeof window !== "undefined" && localStorage.removeItem("token");
    setUser(null);
    setIsLogged(false);
  };

  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    }
  }, [user]);

  useEffect(() => {
    const user = typeof window !== "undefined" && localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
      return;
    }
    setUser(null);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        signIn,
        signUp,
        logOut,
        getRutinas,
        getActividades,
        setIsLogged,
        rutinas,
        actividades,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

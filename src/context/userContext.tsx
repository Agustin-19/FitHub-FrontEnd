"use client";
import { useEffect, useState, createContext } from "react";
import {
  postSignin,
  postSigup,
  getUserRutinas,
  getUserActividades,
  postSigupCoach,
} from "../server/fetchUser";
import {
  IUserConext,
  IloginUserRegister,
  ICreateRutinaDpto,
  ICreateActividadDpto,
  IUser,
  ILogin,
  IRutina,
  IRegisterUser,
} from "../interface/interface";
import { jwtDecode } from "jwt-decode";
// import { users } from "../../public/data/user.data";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [user, setUser] = useState<Partial<IloginUserRegister> | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [rutinas, setRutinas] = useState<IRutina[]>([]);
  const [actividades, setActividades] = useState<ICreateActividadDpto[]>([]);

  const signUp = async (user: IRegisterUser) => {
    try {
      const data = await postSigup(user);
      // const data = await postSigupCoach(user);
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const signIn = async (credentials: ILogin) => {
    try {
      const data = await postSignin(credentials); // Envía las credenciales

      if (!data.token) {
        throw new Error("Invalid Token");
      }

      const decodedToken: any = jwtDecode(data.token); // Decodifica el token
      console.log("Decoded Token:", decodedToken); // Muestra el contenido del token decodificado

      // Guarda el rol y otros datos del usuario
      setUser({ ...decodedToken, token: data.token });

      
      (typeof window !== "undefined" && localStorage.setItem("user", JSON.stringify(decodedToken))); // Guarda el usuario en localStorage
      (typeof window !== "undefined" && localStorage.setItem("token", data.token)); // Almacena el token
      
      setIsLogged(true);
      return true;
    } catch (error) {
      console.log("SignIn failed", error);
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
    (typeof window !== "undefined" && localStorage.removeItem("user"));
    (typeof window !== "undefined" && localStorage.removeItem("token"));
    setUser(null);
    setIsLogged(false);
    router.push("/");
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

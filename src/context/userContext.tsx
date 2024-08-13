"use client";
import { useEffect, useState, createContext } from "react";
import Cookie from 'js-cookie';
import {
  postSignin,
  postSigup,
  getUserRutinas,
  getUserActividades,
  postSigupCoach,
  post_LoginAuth0,
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
  IRegister3ros,
} from "../interface/interface";
import { jwtDecode } from "jwt-decode";
// import { users } from "../../public/data/user.data";
import { useRouter } from "next/navigation";
import { IGetRutYPlan } from "@/interface/plan.interface";

export const UserContext = createContext<IUserConext>({
  user: null,
  setUser: () => {},
  isLogged: false,
  signIn: async () => false,
  loginAuth0: async () => false,
  signUp: async () => false,
  rutinas: [],
  actividades: [],
  logOut: () => {},
  getRutinas: () => {},
  getActividades: () => {},
  setIsLogged: () => {},
  getUserRutinasYPlanes: async () => null,
});
export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
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

  const loginAuth0 = async (credencials: IRegister3ros) => {
    try {
      const data = await post_LoginAuth0(credencials); // Envía las credenciales

      if (!data.token) {
        throw new Error("Invalid Token");
      }

      const decodedToken: any = jwtDecode(data.token);
      console.log("Decoded Token:", decodedToken);
      // Guarda datos del usuario
      setUser({ ...decodedToken, token: data.token });

      Cookie.set("token", data.token, { expires: 7 }); 
      typeof window !== "undefined" &&
        localStorage.setItem("user", JSON.stringify(decodedToken)); // Guarda el usuario en localStorage
      typeof window !== "undefined" &&
        localStorage.setItem("token", data.token);

      setIsLogged(true);
      return true;
    } catch (error) {
      console.log("auth0 fallo", error);
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
      Cookie.set("token", data.token, { expires: 7 }); 

      typeof window !== "undefined" &&
        localStorage.setItem("user", JSON.stringify(decodedToken)); // Guarda el usuario en localStorage
      typeof window !== "undefined" &&
        localStorage.setItem("token", data.token); // Almacena el token

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

  const getUserRutinasYPlanes = async (
    userId: string
  ): Promise<IGetRutYPlan | null> => {
    console.log("userId:", userId);

    try {
      const token: string =
        (typeof window !== "undefined" && localStorage.getItem("token")) || "";
      console.log("Token:", token);
      const response = await fetch(
        `http://localhost:3001/users/userpyr/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener las rutinas y planes");
      }

      const data = await response.json();
      console.log("Data:", data);

      setRutinas(data.rutinas);
      setActividades(data.subscriptcion);

      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const logOut = () => {
    typeof window !== "undefined" && localStorage.removeItem("user");
    typeof window !== "undefined" && localStorage.removeItem("token");
    Cookie.remove("token");
    setUser(null);
    setIsLogged(false);
    router.push("/api/auth/logout/");
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
        loginAuth0,
        getUserRutinasYPlanes,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

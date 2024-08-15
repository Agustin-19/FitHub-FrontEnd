"use client";
import { useEffect, useState, createContext } from "react";
import Cookie from "js-cookie";
import {
  postSignin,
  postSigup,
  getUserRutinas,
  getUserActividades,
  post_LoginAuth0,
  getUser_Id,
} from "../server/fetchUser";
import {
  IUserConext,
  IloginUserRegister,
  ICreateActividadDpto,
  ILogin,
  IRutina,
  IRegisterUser,
  IRegister3ros,
  IRutinaEjercicio,
} from "../interface/interface";
import { jwtDecode } from "jwt-decode";
// import { users } from "../../public/data/user.data";
import { useRouter } from "next/navigation";
import { IGetCouchRutYPlan, IGetRutYPlan } from "@/interface/plan.interface";
import { API } from "@/helpers/helper";
import { get_EntreRyPlan } from "@/server/fetchRoutines";

export const UserContext = createContext<IUserConext>({
  user: null,
  setUser: () => {},
  isLogged: false,
  signIn: async () => false,
  loginAuth0: async () => false,
  signUp: async () => false,
  rutinas: [],
  actividades: [],
  ejercicios: [],
  logOut: () => {},
  getRutinas: () => {},
  getActividades: () => {},
  setIsLogged: () => {},
  getUserRutinasYPlanes: async () => null,
  getCouchRutinasYPlanes: async () => null,
});
export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<Partial<IloginUserRegister> | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [rutinas, setRutinas] = useState<IRutina[]>([]);
  const [actividades, setActividades] = useState<ICreateActividadDpto[]>([]);
  const [ejercicios, setEjercicios] = useState<IRutinaEjercicio[]>([]);

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

      const userData = await getUser_Id(decodedToken.sub, data.token);

      typeof window !== "undefined" &&
        localStorage.setItem("user", JSON.stringify(userData));
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
      // Realiza la solicitud de inicio de sesión
      const data = await postSignin(credentials);

      if (!data.token) {
        throw new Error("Invalid Token");
      }

      const decodedToken: any = jwtDecode(data.token);

      Cookie.set("token", data.token, { expires: 7 });

      const userData = await getUser_Id(decodedToken.sub, data.token);

      typeof window !== "undefined" &&
        localStorage.setItem("user", JSON.stringify(userData));
      typeof window !== "undefined" &&
        localStorage.setItem("token", data.token);

      setUser({ ...userData, token: data.token });

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
    try {
      const token: string =
        (typeof window !== "undefined" && localStorage.getItem("token")) || "";
      const response = await fetch(`${API}/users/userpyr/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener las rutinas y planes");
      }

      const data = await response.json();
      console.log("esta es la data..........", data);

      setRutinas(data.rutinas);
      setActividades(data.subscriptcion);

      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getCouchRutinasYPlanes = async (
    id: string
  ): Promise<IGetCouchRutYPlan | null> => {
    try {
      const token: string =
        (typeof window !== "undefined" && localStorage.getItem("token")) || "";

      const response = await fetch(`${API}/users/entrenadorpyr/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("esta es la data..........", response);

      if (!response.ok) {
        throw new Error("Error al obtener las rutinas y planes");
      }

      const data = await response.json();

      setRutinas(data.routineAdmin);
      setActividades(data.planAdmin);
      setEjercicios(data.exercise);

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
        ejercicios,
        loginAuth0,
        getUserRutinasYPlanes,
        getCouchRutinasYPlanes,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

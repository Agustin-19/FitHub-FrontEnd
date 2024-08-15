import {
  ICreateRutina,
  IRutina,
  IRutinaEjercicio,
} from "@/interface/interface";
import { API } from "@/helpers/helper";
import {
  ISearch,
  IGetRutYPlan,
  IGetCouchRutYPlan,
} from "@/interface/plan.interface";

export const get_Rutinas = async (
  queryString?: ISearch
): Promise<IRutina[]> => {
  const lim = queryString?.limit || 8;
  const pag = queryString?.page || 1;
  const cat = queryString?.category || "";
  const loc = queryString?.location || "";
  const dif = queryString?.difficultyLevel || "";
  const sea = queryString?.search || "";

  const arg = `limit=${lim}&page=${pag}&category=${cat}&location=${loc}&difficultyLevel=${dif}&search=${sea}`;

  try {
    const response = await fetch(`${API}/rutina?${arg}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener las rutinas");
    }
    const data = await response.json();

    return data;
  } catch (err) {
    console.log("Error al obtener las rutinas:", err);
    throw err;
  }
};

export const createExercise = async (ejercicio: IRutinaEjercicio) => {
  try {
    const response = await fetch(`${API}/ejercicio`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${typeof window !== "undefined" &&
          localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ejercicio),
    });

    if (!response.ok) {
      throw new Error("Error al crear el ejercicio");
    }

    return response.json();
  } catch {
    console.log("Error al crear el ejercicio:");
    return;
  }
};

export const get_Ejercicios = async (): Promise<IRutinaEjercicio[]> => {
  try {
    const response = await fetch(`${API}/ejercicio/entrenador`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${typeof window !== "undefined" &&
          localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los ejercicios");
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.log("Error al obtener los ejercicios:", err);
    throw err;
  }
};

export const create_Rutina = async (data: ICreateRutina): Promise<void> => {
  const token: string =
    (typeof window !== "undefined" && localStorage.getItem("token")) || "";

  try {
    const response = await fetch(`${API}/rutina`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al crear la rutina");
    }
  } catch (err) {
    console.error("Error al crear la rutina:", err);
    throw err;
  }
};

export const get_RutinaById = async (id: string): Promise<IRutina> => {
  try {
    const response = await fetch(`${API}/rutina/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener la rutina");
    }
    const data = await response.json();

    return data;
  } catch (err) {
    console.log("Error al obtener la rutina:", err);
    throw err;
  }
};

export const getUserRutinasYPlanes = async (
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
      const errorText = await response.text(); // Obtener el mensaje de error
      throw new Error(`Error al obtener las rutinas y planes: ${errorText}`);
    }

    const data: IGetRutYPlan = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching routines and plans:", error);
    return null;
  }
};

export const get_EntreRyPlan = async (
  id: string
): Promise<IGetCouchRutYPlan> => {
  const token: string =
    (typeof window !== "undefined" && localStorage.getItem("token")) || "";
  try {
    const response = await fetch(`${API}/users/entrenadorpyr/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener la rutina");
    }
    console.log(response);

    const data = await response.json();
    console.log("esta es la data..........", data);
    return data;
  } catch (err) {
    console.log("Error al obtener la rutina:", err);
    throw err;
  }
};

export const delete_Rutina = async (id: string): Promise<Response> => {
  try {
    const token: string =
      (typeof window !== "undefined" && localStorage.getItem("token")) || "";
    const response = await fetch(`${API}/rutina/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const data = await response.text();
    console.log("Respuesta del servidor:", data);
    return response;
  } catch (error) {
    console.error("Error en deleteRutina:", error);
    throw new Error("Error deleting rutina");
  }
};

export const put_Rutina = async (id: string, routine: ICreateRutina) => {
  try {
    const token: string =
      (typeof window !== "undefined" && localStorage.getItem("token")) || "";
    const response = await fetch(`${API}/rutina/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(routine),
    });
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const data = await response.text();
    console.log("Respuesta del servidor:", data);
    return response;
  } catch (error) {
    console.error("Error en update Rutina:", error);
    throw new Error("Error update rutina");
  }
};

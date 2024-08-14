import { API } from "@/helpers/helper";
import {
  ISolicitudes,
  ISolicitudRes,
  resEnum,
} from "@/interface/admin.interface";

export const getSolicitudes = async (): Promise<ISolicitudes> => {
  try {
    const response = await fetch(`${API}/admin/solicitudes`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${typeof window !== "undefined" &&
          localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener colicitudes");
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.log("Error al obtener solicitudes:", err);
    throw err;
  }
};

export const postSolicitudes = async (
  parans: ISolicitudRes,
  estado: resEnum
) => {
  const token: string =
    (typeof window !== "undefined" && localStorage.getItem("token")) || "";

  try {
    const response = await fetch(
      `${API}/admin/solicitudCoach?respuesta=${estado}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parans),
      }
    );

    if (!response.ok) {
      const errores = await response.text;
      console.log("Error ", errores);
      throw new Error("Error al enviar los Id");
    }

    const data = await response;

    return data;
  } catch (err) {
    console.log("Error al enviar los datos:", err);
    throw err;
  }
};

export const createCategory = async (cat: { name: string }) => {
  const token: string =
    (typeof window !== "undefined" && localStorage.getItem("token")) || "";
  try {
    const response = await fetch(`${API}/categorias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cat),
    });
    if (!response.ok) {
      throw new Error("Error al crear categoria");
    }
    return await response;
  } catch (err) {
    console.log("Error al crear categoria:", err);
    throw err;
  }
};


export const create_Admin = async (email: string, token: string) => {

  try {
    const response = await fetch(`${API}/superadmin/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Error al crear admin");
    }

    return await response;
  } catch (err) {
    console.log("Error al crear admin:", err);
    throw err;
  }
}

export const delete_Admin = async (email: string, token: string) => {

  try {
    const response = await fetch(`${API}/superadmin/delete`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      console.log(response.text);
      
      throw new Error("Error al eliminar admin");
    }

    return await response;
  } catch (err) {
    console.log("Error al eliminar admin:", err);
    throw err;
  
  }
}
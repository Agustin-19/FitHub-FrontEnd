import { IUser, ILogin } from "@/interface/interface";
const API = "http:api";

export const postSigup = async (user: Omit<IUser, "id">) => {
  const response = await fetch(`${API}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export const postSignin = async (credentials: ILogin) => {
  try {
    const response = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserRutinas = async (token: string) => {
  const response = await fetch(`${API}/users/rutinas`, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getUserActividades = async (token: string) => {
  const response = await fetch(`${API}/users/actividades`, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  });
  const data = await response.json();
  return data;
};


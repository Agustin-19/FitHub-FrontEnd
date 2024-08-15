import { ILogin, IRegister3ros, IRegisterUser } from "@/interface/interface";
import { API } from "@/helpers/helper";

export const post_LoginAuth0 = async (user: IRegister3ros) => {
  const response = await fetch(`${API}/auth/auth0`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  // const data = "usuario creado";

  return data;
};

export const postSigup = async (user: IRegisterUser) => {
  const response = await fetch(`${API}/auth/signupuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  // const data = await response.json();
  const data = "usuario creado";

  return data;
};

export const postSigupCoach = async (user: IRegisterUser) => {
  const response = await fetch(`${API}/auth/signupentrenador`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  // const data = await response.json();
  const data = "usuario creado";

  return data;
};

export const getUser_Id = async (id: string, token: string) =>{
  
  console.log(token);

  const response = await fetch(`${API}/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export const postSignin = async (credentials: ILogin) => {
  try {
    const response = await fetch(`${API}/auth/signin`, {
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
  const response = await fetch(`${API}/rutinas`, {
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

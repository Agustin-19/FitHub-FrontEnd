import { API } from "@/helpers/helper";
import { ICategory, ICreatePlan, IPlan, ISearch } from "@/interface/plan.interface";

export const get_Plan = async (queryString?: ISearch): Promise<IPlan[]> => {
  const lim = queryString?.limit || 8;
  const pag = queryString?.page || 1;
  const cat = queryString?.category || "";
  const loc = queryString?.location || "";
  const dif = queryString?.difficultyLevel || "";
  const sea = queryString?.search || "";

  const arg = `limit=${lim}&page=${pag}&category=${cat}&location=${loc}&difficultyLevel=${dif}&search=${sea}`;

  try {
    const response = await fetch(`${API}/plan?${arg}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los Planes ");
    }
    const data = await response.json();

    console.log(data);

    return data;
  } catch (err) {
    console.log("Error al obtener los Planes:", err);
    throw err;
  }
};

export const get_Category = async (): Promise<ICategory[]> => {
  try {
    const response = await fetch(`${API}/categorias`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener las Categorías ");
    }
    const data: ICategory[] = await response.json();

    data.sort((a, b) => a.name.localeCompare(b.name));
    return data;
  } catch (err) {
    console.log("Error al obtener las Categorías:", err);
    throw err;
  }
};

export const createPlan = async (
  plan: ICreatePlan,
  token: string
): Promise<Response> => {
  try {
    console.log("Enviando datos a:", `${API}/plan`);
    console.log("Datos del plan:", plan);

    const response = await fetch(`${API}/plan`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plan),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Respuesta del servidor:", data);

    return response;
  } catch (error) {
    console.error("Error en createPlan:", error);
    throw new Error("Error creating plan");
  }
};

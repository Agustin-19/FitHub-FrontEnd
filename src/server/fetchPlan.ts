import { API } from "@/helpers/helper";
import { ICreatePlan, IPlan, ISearch } from "@/interface/plan.interface";

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

    return data;
  } catch (err) {
    console.log("Error al obtener los Planes:", err);
    throw err;
  }
};

export const get_Category = async () => {
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
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error al obtener las Categorías:", err);
    throw err;
  }
};

export const createPlan = async (plan: ICreatePlan, token: string): Promise<Response> => {
  try {
    const response = await fetch("http://localhost:3001/plan", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plan),
    });

    return response;
  } catch (error) {
    console.error("Error creating plan:", error);
    throw new Error("Error creating plan");
  }
};
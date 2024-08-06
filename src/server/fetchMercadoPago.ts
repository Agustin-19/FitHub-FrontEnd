import { API } from "@/helpers/helper";

export const createRutineOrder = async (routineData: {
  id: string | undefined;
  rutinaId: string;
  title: string | undefined;
  quantity: number;
  unit_price: number | undefined;
}) => {
  try {
    const response = await fetch(`${API}/rutina/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(routineData),
    });

    if (!response.ok) {
      throw new Error("Error al crear la orden");
    }

    const preference = await response.json();
    return preference;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const createPlanOrder = async (planData: {
  id: string | undefined;
  planId: string;
  title: string | undefined;
  quantity: number;
  unit_price: number | undefined;
}) => {
  try {
    const response = await fetch(`${API}/plan/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(planData),
    });

    if (!response.ok) {
      throw new Error("Error al crear la orden");
    }

    const preference = await response.json();
    return preference;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

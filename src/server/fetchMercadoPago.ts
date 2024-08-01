import { API } from "@/helpers/helper";



export const createOrder = async (routineData: { title: string | undefined; quantity: number; unit_price: number }) => {
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
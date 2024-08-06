import { IRegisterUser } from "@/interface/interface";
import { API } from "@/helpers/helper";

export const postSigupCoach = async (user: IRegisterUser) => {
    try {
        console.log("Enviando datos a:", `${API}/auth/signupentrenador`);
        console.log("Datos del usuario:", user);

        const response = await fetch(`${API}/auth/signupentrenador`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        return data;
    } catch (error) {
        console.error("Error en postSigupCoach:", error);
        throw error;
    }
};

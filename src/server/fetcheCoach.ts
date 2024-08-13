import { IRegisterUser, IUser } from "@/interface/interface";
import { API } from "@/helpers/helper";
import { ICoach } from "@/interface/admin.interface";

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

interface IRegisterCoach {
    cvvideo: string,
    cvpdf: string
}

export const postCoach = async (parans: IRegisterCoach) => {
    try {

        const response = await fetch(`${API}/users/solictud`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${typeof window !== "undefined" && localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parans),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response;
        console.log("Respuesta del servidor:", data);

        return data;
    } catch (error) {
        console.error("Error en postCoach:", error);
        throw error;
    }
};

export const getCoach = async (): Promise<ICoach[]> => {
    try {
        const response = await fetch(`${API}/users/coach`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const coaches: ICoach[] = await response.json();

        return coaches;
    } catch (error) {
        console.error("Error en getCoach:", error);
        throw error;
    }
}


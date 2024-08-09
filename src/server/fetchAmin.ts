import { API } from "@/helpers/helper";
import { ICoach, ISolicitudes } from "@/interface/admin.interface";



export const getSolicitudes = async (): Promise<ISolicitudes> => {
    try {
        const response = await fetch(`${API}/admin/solicitudes`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${typeof window !== "undefined" && localStorage.getItem("token")
                    }`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener los ejercicios");
        }

        const data = await response.json();
        console.log(data);

        return data;
    } catch (err) {
        console.log("Error al obtener los ejercicios:", err);
        throw err;
    }
};

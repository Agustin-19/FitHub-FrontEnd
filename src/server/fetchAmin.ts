import { API } from "@/helpers/helper";
import { ICoach, ISolicitudes, ISolicitudRes, resEnum } from "@/interface/admin.interface";



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
            throw new Error("Error al obtener colicitudes");
        }

        const data = await response.json();
        // console.log(data);

        return data;
    } catch (err) {
        console.log("Error al obtener solicitudes:", err);
        throw err;
    }
};


export const postSolicitudes = async (parans: ISolicitudRes, estado: resEnum): Promise<ISolicitudes> => {

    const res = estado
    const arg = `respuesta=${res}`

    try {
        const response = await fetch(`${API}/admin/solicitudCoach?${arg}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${typeof window !== "undefined" && localStorage.getItem("token")}`,
            },
            body: JSON.stringify(parans),
        });

        if (!response.ok) {
            throw new Error("Error al enviar los Id");
        }

        const data = await response.json();
        console.log(data);

        return data;
    } catch (err) {
        console.log("Error al enviar los datos:", err);
        throw err;
    }
};

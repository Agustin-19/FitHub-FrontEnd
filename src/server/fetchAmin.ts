import { API } from "@/helpers/helper";
import { ICoach, ISolicitudes, ISolicitudRes, resEnum } from "@/interface/admin.interface";
import { ICategory } from "@/interface/plan.interface";



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
    const token: string = (typeof window !== "undefined" && localStorage.getItem("token")) || "";
    console.log(JSON.stringify(parans))

    try {
        const response = await fetch(`${API}/admin/solicitudCoach?respuesta=${estado}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parans),
        });

        if (!response.ok) {
            const errores = await response.text
            console.log("Error ", errores);
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


export const createCategory = async (cat: {name:string}) => {
    const token: string = (typeof window !== "undefined" && localStorage.getItem("token")) || "";
    console.log(cat)
    try{
        
        const response = await fetch(`${API}/categorias`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                
            },
            body: JSON.stringify(cat),
        });        
    }
    catch(err){
        console.log("Error al crear categoria:", err);
        throw err;
    }
}
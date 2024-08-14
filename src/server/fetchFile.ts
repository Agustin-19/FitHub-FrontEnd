import { API } from "@/helpers/helper";

export const uploaFile = async (file: File) => {
    const formData = new FormData();
    formData.append("files", file);
    const response = await fetch(`${API}/files`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Error al subir el archivo");
    }

    return response.json();
}


export const uploaFilePdf = async (file: File) => {
    const formData = new FormData();
    formData.append("files", file);
    const response = await fetch(`${API}/files/pdf`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Error al subir el archivo");
    }

    return response.json();
};
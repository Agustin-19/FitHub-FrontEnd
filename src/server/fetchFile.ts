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
};

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

export const uploadProfileAvatar = async (file: File) => {
  const token: string =
    (typeof window !== "undefined" && localStorage.getItem("token")) || "";
  const formData = new FormData();
  formData.append("files", file);

  try {
    const response = await fetch(`${API}/files/profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      // Obtener más detalles de la respuesta de error
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error(
        `Error al subir el archivo: ${errorData.message ||
          "Error desconocido"} (Status: ${response.status})`
      );
    }

    const result = await response.json();

    // Verificar si la respuesta contiene la URL de la imagen
    if (!result.imgUrl) {
      throw new Error("La respuesta no contiene la URL de la imagen");
    }

    return result;
  } catch (error) {
    console.error("Error en la solicitud de subida de archivo:", error);
    throw error;
  }
};

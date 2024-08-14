// import { API } from "@/helpers/helper";
// import {
//   IAllComentarios,
//   IComentarioPlan,
//   IComentarioRutina,
// } from "@/interface/interface";

// export const fetchAllComents = async (): Promise<IAllComentarios[]> => {
//   try {
//     const response = await fetch(`${API}/comentarios`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${typeof window !== "undefined" &&
//           localStorage.getItem("token")}`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Error al obtener colicitudes");
//     }

//     const data = await response.json();

//     return data;
//   } catch (err) {
//     console.log("Error al obtener solicitudes:", err);
//     throw err;
//   }
// };

// export const postComents = async (
//   comment: IComentarioRutina | IComentarioPlan
// ) => {
//   const response = await fetch(`${API}/comentarios/rutina`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${typeof window !== "undefined" &&
//         localStorage.getItem("token")}`,
//     },
//     body: JSON.stringify(comment),
//   });
//   const data = await response.json();
//   return data;
// };

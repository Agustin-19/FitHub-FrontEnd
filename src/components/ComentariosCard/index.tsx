// import React from "react";
// import { IAllComentarios } from "../../interface/interface";
// import { fetchAllComents } from "@/server/fethComent";
// import star from "../../../public/star-svgrepo-com.svg";

// export default function ComentariosCard() {
//   const [comentarios, setComentarios] = React.useState<IAllComentarios[]>([]);
//   const [activeComentarios, setActiveComentarios] = React.useState<
//     IAllComentarios[]
//   >([]);

//   React.useEffect(() => {
//     const fetchComents = async () => {
//       try {
//         const allComents = await fetchAllComents();
//         setComentarios(allComents);
//         setActiveComentarios(allComents);
//       } catch (err) {
//         console.error("Error al cargar comentarios:", err);
//       }
//     };
//     fetchComents();
//   }, []);

//   return (
//     <div className="flex flex-col gap-5 p-5">
//       {activeComentarios.length === 0 ? (
//         <p className="text-center text-lg font-semibold text-gray-600">
//           No hay comentarios disponibles.
//         </p>
//       ) : (
//         activeComentarios.map((comentario) => (
//           <div
//             key={comentario.id}
//             className="flex flex-col gap-4 p-4 border-4 border-[#97D6DF] bg-[#97D6DF]/20 rounded-lg text-white"
//           >
//             <div className="flex items-center justify-end">
//               {Array.from({ length: comentario.score }).map((_, index) => (
//                 <img
//                   key={index}
//                   src={star.src}
//                   alt={`Estrella ${index + 1}`}
//                   className="w-6 h-6"
//                 />
//               ))}
//             </div>
//             <p>{comentario.description}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

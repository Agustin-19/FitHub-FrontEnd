import React from "react";
import { IComentario } from "../../interface/interface";
import comentariosData from "../../../public/ComentariosData";
import star from "../../../public/star-svgrepo-com.svg";

export default function ComentariosCard() {
  const [comentarios, setComentarios] = React.useState<IComentario[]>([]);
  const [activeComentarios, setActiveComentarios] = React.useState<
    IComentario[]
  >([]);
  React.useEffect(() => {
    setComentarios(comentariosData);
    setActiveComentarios(comentariosData);
  }, []);
  return (
    <div className="flex flex-col gap-5 p-5">
      {activeComentarios.map((comentario) => (
        <div
          key={comentario.id}
          className="flex flex-col gap-4 p-4 border-4 border-[#97D6DF] bg-[#97D6DF]/20 rounded-lg text-white"
        >
          <div className="flex items-center justify-end">
            {Array.from({ length: comentario.score }).map((_, index) => (
              <img
                key={index}
                src={star.src}
                alt={`Estrella ${index + 1}`}
                className="w-6 h-6"
              />
            ))}
          </div>
          <p>{comentario.descripcion}</p>
        </div>
      ))}
    </div>
  );
}

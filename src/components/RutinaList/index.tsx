import React from "react";
import { IRutina } from "@/interface/interface";

interface RutinaListProps {
  rutinas: IRutina[];
}

const RutinaLista: React.FC<RutinaListProps> = ({ rutinas }) => {
  return (
    <div className="relative z-10 rutina-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-fondo">
      {rutinas.map((rutina) => (
        <div key={rutina.id} className="rutina-card">
          {/* Renderiza la rutina */}
          <h3>{rutina.name}</h3>
          {/* Agrega más detalles de la rutina aquí */}
        </div>
      ))}
    </div>
  );
};

export default RutinaLista;

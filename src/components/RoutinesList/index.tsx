import Image from "next/image";
import React from "react";
import Link from "next/link";
import { rutinas } from "../../../public/data/rutines.data";

const RutinaList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {rutinas.map((rutina) => (
        <div key={rutina.id} className="border rounded-lg p-4 shadow-lg">
          <div className="relative object-contain w-40 h-40 rounded-t-lg">
            <Image
              src={rutina.imagen}
              alt={rutina.name}
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
              className="rounded-t-lg"
            />
          </div>
          <h2 className="text-xl font-bold mt-2">{rutina.name}</h2>
          <p className="text-gray-400">{rutina.description}</p>
          <p className="text-gray-500 font-semibold mt-2">${rutina.precio}</p>
          <Link
            href={`/routines/${rutina.id}`}
            className="mt-4 inline-block boton"
          >
            Ver Detalles
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RutinaList;

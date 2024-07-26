import React from "react";
import Image from "next/image";
import Link from "next/link";

interface IRutina {
  // Define the properties of IRutina here
  id: number;
  name: string;
  imagen: string;
  description: string;
  precio: number;
}

interface RutinaListProps {
  rutinas: IRutina[];
}

const RutinaList: React.FC<RutinaListProps> = ({ rutinas }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {rutinas.map((rutina) => (
        <div
          key={rutina.id}
          className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
        >
          <div className="relative w-full h-64">
            <Image
              src={rutina.imagen}
              alt={rutina.name}
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{rutina.name}</h2>
            <p className="text-gray-600 mb-2">{rutina.description}</p>
            <p className="text-gray-700 font-semibold mb-4">${rutina.precio}</p>
            <Link
              href={`/routines/${rutina.id}`}
              className="mt-4 inline-block px-4 py-2 bg-[#FF3E1A] text-white rounded-lg hover:bg-[#FF3E1A] transition-colors"
            >
              Ver Detalles
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RutinaList;

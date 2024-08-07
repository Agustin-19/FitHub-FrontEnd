import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IRutina } from "@/interface/interface";

interface RutinaListProps {
  rutinas: IRutina[];
}

const RutinaList: React.FC<RutinaListProps> = ({ rutinas }) => {
  const imgDefect =
    "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";
  const getImageSrc = (image: string | string[] | null | undefined) => {
    if (typeof image === "string") {
      return image;
    } else if (Array.isArray(image) && image.length > 0) {
      return image[0];
    } else {
      return imgDefect;
    }
  };

  return (
    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 m-4">
      {rutinas.map((rutina) => (
        <div
          key={rutina.id}
          className=" border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
        >
          <div className="relative w-full h-48">
            <Image
              src={getImageSrc(rutina.imgUrl)}
              alt={rutina.name}
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-3">
            <h2 className="text-xl font-bold mb-2">{rutina.name}</h2>
            <p className="text-gray-600 mb-2">{rutina.description}</p>
            <p className="text-gray-700 mb-2">
              Categorias:
              {""} {rutina.category.map((cat) => cat.name).join(", ")}
            </p>
            <p className="text-gray-700 font-semibold mb-4">${rutina.price}</p>
            <Link
              href={`/routines/${rutina.id}`}
              className="mt-4 inline-block px-3 py-1 bg-[#FF3E1A] text-white rounded-lg hover:bg-[#FF5722] transition-colors"
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

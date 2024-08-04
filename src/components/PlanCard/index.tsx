import React from "react";
import Image from "next/image";
import { IPlan } from "@/interface/plan.interface";
import Link from "next/link";

interface PlanCardProps {
  plan: IPlan;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  const imgDefect =
    "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";

  return (
    <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl m-4">
      <div className="relative w-full h-48">
        <Image
          src={plan.imgUrl || imgDefect}
          alt={plan.name || "Imagen no disponible"}
          layout="fill"
          objectFit="cover"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-3">
        <h3 className="text-xl font-semibold mb-2">
          {plan.name || "Nombre no disponible"}
        </h3>
        <p className="text-gray-600 mb-2">
          {plan.description || "Descripción no disponible"}
        </p>
        <p className="text-gray-700 font-semibold mb-4">
          ${plan.price || "No especificado"}
        </p>
        <p className="mb-2">
          <span className="font-bold">Ubicación:</span>{" "}
          {plan.location || "No especificado"}
        </p>
        <p className="mb-2">
          <span className="font-bold">Categorías:</span>
          {Array.isArray(plan.category)
            ? plan.category.map((cat) => cat.name).join(", ")
            : "No especificado"}
        </p>
        <p className="mb-2">
          <span className="font-bold">Activo:</span>{" "}
          {plan.isActive ? "Sí" : "No"}
        </p>
        <Link
          href={`/plans/${plan.id}`}
          className="mt-4 inline-block px-3 py-1 bg-[#FF3E1A] text-white rounded-lg hover:bg-[#FF5722] transition-colors"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default PlanCard;

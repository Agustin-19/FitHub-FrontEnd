import React from "react";
import Image from "next/image";

interface IUser {
  name: string;
  email: string;
  address: string;
  city: string;
  telefono: string;
  fotosPerfil?: string;
  role?: string;
  rutinas?: number[];
  actividades?: number[];
  rating?: number; // La calificación es opcional
}

interface CoachCardProps {
  user: IUser;
}

const CoachCard: React.FC<CoachCardProps> = ({ user }) => {
  const rating = user.rating ?? 0; // Si la calificación es undefined, usar 0

  return (
    <div
      className="border border-gray-300 p-4 m-2 rounded-lg shadow-lg bg-[#1A1D1A] text-[#97D6DF] w-60"
      data-aos="fade-up" // Añade la animación de AOS
    >
      <div className="flex items-center">
        {/* Imagen de perfil */}
        {user.fotosPerfil ? (
          <Image
            src={user.fotosPerfil}
            alt={`${user.name}'s profile`}
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-cover border-2 border-[#447988]"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-[#447988] flex items-center justify-center text-[#97D6DF] border-2 border-[#447988]">
            No Image
          </div>
        )}
        <div className="ml-3">
          <h2 className="text-xl font-semibold text-[#FF3E1A]">{user.name}</h2>
          <p className="text-[#97D6DF] text-sm">Email: {user.email}</p>
          <p className="text-[#97D6DF] text-sm">Address: {user.address}</p>
          <p className="text-[#97D6DF] text-sm">City: {user.city}</p>
          <p className="text-[#97D6DF] text-sm">Telefono: {user.telefono}</p>
          {user.role && (
            <p className="text-[#97D6DF] text-sm mt-2">Role: {user.role}</p>
          )}

          {/* Calificación */}
          <div className="mt-2 flex items-center">
            <span className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 ${
                    rating > i ? "fill-[#FF3E1A]" : "text-[#447988]"
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-9.24-1.35L12 2 11.24 7.89 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </span>
            <span className="ml-2 text-[#97D6DF] text-sm">
              {rating !== undefined ? `${Math.floor(rating)}/5` : "No rating"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachCard;

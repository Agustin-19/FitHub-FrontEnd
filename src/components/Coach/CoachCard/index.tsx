import React from "react";
import Image from "next/image";
import { IUser } from "@/interface/interface";

interface CoachCardProps {
  user: IUser;
}

const CoachCard: React.FC<CoachCardProps> = ({ user }) => {
  return (
    <div
      className="border border-gray-300 p-4 m-2 rounded-lg shadow-lg bg-[#1A1D1A] text-[#97D6DF] w-70"
      data-aos="fade-up" // Añade la animación de AOS
    >
      <div className="flex items-center">
        {/* Imagen de perfil */}
        {user.imgUrl ? (
          <Image
            src={user.imgUrl}
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
        <div className="ml-3 ">
          <h2 className="text-xl font-semibold text-[#FF3E1A]">{user.name}</h2>
          <p className="text-[#97D6DF] text-sm  ">Email: {user.email}</p>
          <p className="text-[#97D6DF] text-sm">Address: {user.address}</p>
          <p className="text-[#97D6DF] text-sm">City: {user.city}</p>
          <p className="text-[#97D6DF] text-sm">Phone: {user.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default CoachCard;

"use client";

import { useContext, useEffect } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import CoachDashboard from "@/components/CoachDashboard";
import UserDashboard from "@/components/UserDashboard";
import { IUser } from "@/interface/interface";
import Image from "next/image";

export default function Dashboard() {
  const router = useRouter();
  const { isLogged, user } = useContext(UserContext) as {
    isLogged: boolean;
    user: {
      login: boolean;
      token: string;
      user: Partial<IUser> | null;
    } | null;
  };

  useEffect(() => {
    if (!isLogged) {
      router.push("/login");
    }
  }, [isLogged, router]);

  if (!isLogged) {
    return null;
  }

  const role = user?.user?.role;

  console.log("User role from context:", role);

  const {
    name,
    email,
    address,
    city,
    phone,
    fotosPerfil
  } = user?.user || {};

  return (
<<<<<<< HEAD
    <div className="text-black bg-gray-100">
=======
    <div className="bg-[--fondo] m-5">
      <h1>Bienvenido al Dashboard</h1>

      <div className="daisy-hero min-h-screen">
        <div className="daisy-hero-content flex-col lg:flex-row">
          {fotosPerfil ? (
            <Image
              src={fotosPerfil}
              alt={`${name}'s profile`}
              width={100}
              height={100}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#447988]"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#447988] flex items-center justify-center text-[#97D6DF] border-2 border-[#447988]">
              No Image
            </div>
          )}
          <div>
            <h1 className="text-5xl font-bold">{name}</h1>
            <div className="w-full cols columns-2">

              <p className="p-2">Email: {email} </p>
              <p className="p-2">Telefono: {phone} </p>
              <p className="p-2">Direccion: {address} </p>
              <p className="p-2">Ciudad: {city} </p>

            </div>


          </div>
        </div>
      </div>

>>>>>>> develop
      {role === "user" ? (
        <UserDashboard />
      ) : role === "coach" ? (
        <CoachDashboard />
      ) : (
        <p>Rol no reconocido.</p>
      )}
    </div>
  );
}

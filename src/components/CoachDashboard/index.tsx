"use client";
import { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import styles from "./CoachDashboard.module.css";
import Image from "next/image";
import { PencilIcon } from "@heroicons/react/24/outline";

// Define the Routine type
type Routine = {
  id: string;
  name: string;
  progress: number;
};

interface IUserConext {
  user: {
    rutinas: Routine[];
    fotosPerfil?: string[];
    name: string;
    email: string;
    address: string;
    city: string;
  } | null;
}

const CoachDashboard = () => {
  const userContext = useContext(UserContext) as IUserConext;
  const { user } = userContext;
  const [avatar, setAvatar] = useState<string | null>(null);

  if (!user) return <p>Loading...</p>;

  const purchasedRoutines = user?.rutinas || [];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-2 border border-1 ">
      <div
        className={
          styles.dashboard +
          " flex-col items-center justify-center border-r border-1 w-[400px] "
        }
      >
        <Image
          src={
            avatar ||
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          }
          alt="Avatar"
          width={500}
          height={80}
          className="rounded-full object-cover"
        />
        <label htmlFor="file-input" className="pencil-icon cursor-pointer">
          <PencilIcon className="w-6 h-6 text-white bg-[#FF3E1A] rounded-full p-1" />
        </label>

        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        <h3 className="mt-4 text-lg font-bold">{user.name}</h3>
        <p>nombre: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Dirección: {user.address}</p>
        <p>Ciudad: {user.city}</p>
      </div>
      <div className="flex flex-col items-center justify-center mt-0 text-[#97D6DF]">
        <Link href="/create/plan">
          <h3>¿Deseas crear una nueva Actividad?</h3>
          <button className="bg-[#FF3E1A] text-white p-2 rounded m-5">
            Crear Actividad
          </button>
        </Link>
        <Link href="/create/exercise">
          <div className="flex flex-col items-center justify-center mt-0 text-[#97D6DF]">
            <h3>¿Deseas crear una nueva rutina?</h3>
            <button className="bg-[#FF3E1A] text-white p-2 rounded m-5">
              Crear Rutina
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CoachDashboard;

"use client";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import styles from "./UserDasboard.module.css";
import Image from "next/image";
import { PencilIcon } from "@heroicons/react/24/outline";
import imagenPerfil from "../../../public/assets/imagenPerfil.webp";

interface Routine {
  id: string;
  name: string;
  progress: number;
}

interface Plan {
  id: string;
  name: string;
  price: number;
}

const UserDashboard = () => {
  const userContext = useContext(UserContext);
  const { user, getUserRutinasYPlanes } = userContext;
  const [avatar, setAvatar] = useState<string | null>(null);
  const [purchasedRoutines, setPurchasedRoutines] = useState<Routine[]>([]);
  const [purchasedPlans, setPurchasedPlans] = useState<Plan[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.sub) {
      getUserRutinasYPlanes(user.sub)
        .then((data) => {
          if (data) {
            const mappedRoutines = Array.isArray(data.rutinas)
              ? data.rutinas.map((rutina) => ({
                  id: rutina.id || "",
                  name: rutina.name,
                  progress: 0,
                }))
              : [];

            const mappedPlans = Array.isArray(data.plan)
              ? data.plan.map((plan) => ({
                  id: plan.id,
                  name: plan.name,
                  price: plan.price,
                }))
              : [];

            setPurchasedRoutines(mappedRoutines);
            setPurchasedPlans(mappedPlans);
            setError(null); // Limpiar el error si todo está bien
          } else {
            setPurchasedRoutines([]);
            setPurchasedPlans([]);
            setError("No se encontraron rutinas ni planes.");
          }
        })
        .catch((error) => {
          console.error("Error fetching routines and plans:", error);
          setPurchasedRoutines([]);
          setPurchasedPlans([]);
          setError("Error al obtener rutinas y planes.");
        });
    }
  }, [user, getUserRutinasYPlanes]);

  if (!user) return <p>Loading...</p>;

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
    <div>
      <Link href="/home">
        <button className="mt-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
          Volver
        </button>
      </Link>
      <div className="flex border border-1 m-5">
        <div
          className={
            styles.dashboard +
            " flex-col items-center justify-center border-r border-1 w-[400px] "
          }
        >
          <Image
            src={avatar || imagenPerfil}
            alt="Avatar"
            width={500}
            height={80}
            className="rounded-full object-cover"
          />
          <label
            htmlFor="file-input"
            className="pencil-icon cursor-pointer mt-4"
          >
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
          <p>Email: {user.role}</p>
        </div>
        <div className="flex justify-evenly items-center text-[#97D6DF]">
          <div className="flex flex-col items-center">
            <h3 className="m-5 text-lg text-center">Rutinas Compradas</h3>
            <ul>
              {error ? (
                <p>{error}</p>
              ) : purchasedRoutines.length > 0 ? (
                purchasedRoutines.map((routine) => (
                  <li key={routine.id}>
                    <Link href={`/routines/${routine.id}`}>{routine.name}</Link>
                    <p>Progreso: {routine.progress || 0}%</p>
                  </li>
                ))
              ) : (
                <p>No has comprado ninguna rutina.</p>
              )}
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="m-5 text-lg text-center">Planes Comprados</h3>
            <ul>
              {error ? (
                <p>{error}</p>
              ) : purchasedPlans.length > 0 ? (
                purchasedPlans.map((plan) => (
                  <li key={plan.id}>
                    <Link href={`/plans/${plan.id}`}>{plan.name}</Link>
                    <p>Precio: ${plan.price}</p>
                  </li>
                ))
              ) : (
                <p>No has comprado ningún plan.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

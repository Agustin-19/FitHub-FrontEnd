import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import styles from "./UserDasboard.module.css";
import Image from "next/image";
import { PencilIcon } from "@heroicons/react/24/outline";
import imagenPerfil from "../../../public/assets/imagenPerfil.webp";
import { IPlan } from "@/interface/plan.interface";
import Sidebar from "./SidebarUser";

interface Routine {
  id: string;
  name: string;
  progress: number;
  price: number;
}

interface Subscription {
  endDate: string;
  id: string;
  isActive: boolean;
  plan: IPlan;
  startDate: string;
  state: boolean;
}

const UserDashboard = () => {
  const userContext = useContext(UserContext);
  const { user, getUserRutinasYPlanes, isLogged } = userContext;
  const [avatar, setAvatar] = useState<string | null>(null);
  const [purchasedRoutines, setPurchasedRoutines] = useState<Routine[]>([]);
  const [purchasedPlans, setPurchasedPlans] = useState<IPlan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasFetchedData, setHasFetchedData] = useState<boolean>(false);

  useEffect(() => {
    if (user?.sub && !hasFetchedData) {
      getUserRutinasYPlanes(user.sub)
        .then((data) => {
          if (data) {
            const mappedRoutines = Array.isArray(data.routine)
              ? data.routine.map((routine: any) => ({
                  name: routine.name,
                  price: routine.price,
                  id: routine.id,
                  progress: routine.progress,
                }))
              : [];

            // Mapeo de suscripciones
            const mappedPlans = Array.isArray(data.subsciption)
              ? data.subsciption.map((subscription: any) => ({
                  id: subscription.plan.id,
                  name: subscription.plan.name,
                  description: subscription.plan.description,
                  isActive: subscription.isActive,
                  price: subscription.plan.price,
                  imgUrl: subscription.plan.imgUrl,
                  location: subscription.plan.location || "Unknown location",
                  latitude: subscription.plan.latitude || 0,
                  longitude: subscription.plan.longitude || 0,
                  category: subscription.plan.category || [],
                  difficultyLevel:
                    subscription.plan.difficultyLevel || "Medium",
                  admin: subscription.plan.admin || "Not assigned",
                  check: subscription.plan.check || false,
                  date: subscription.plan.date || new Date().toISOString(),
                }))
              : [];

            setPurchasedRoutines(mappedRoutines);
            setPurchasedPlans(mappedPlans);
            setError(null);
          } else {
            setPurchasedRoutines([]);
            setPurchasedPlans([]);
            setError("No se encontraron rutinas ni planes.");
          }
          setHasFetchedData(true);
        })
        .catch((error) => {
          console.error("Error fetching routines and plans:", error);
          setPurchasedRoutines([]);
          setPurchasedPlans([]);
          setError("Error al obtener rutinas y planes.");
          setHasFetchedData(true);
        });
    }
  }, [user, getUserRutinasYPlanes, hasFetchedData]);

  if (!isLogged) return <p>Debes estar logueado para acceder al dashboard.</p>;

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
        <button className="m-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
          Volver
        </button>
      </Link>
      <div className="flex border border-1 m-5">
        <div
          className={
            styles.dashboard +
            " flex-col items-center justify-center border-r border-1 w-[400px]"
          }
        >
          <Image
            src={avatar || imagenPerfil}
            alt="Avatar"
            width={100} // Ajusta el tamaño si es necesario
            height={100}
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
          <p>Nombre: {user.name}</p>
          <p>Email: {user.role}</p>{" "}
          {/* Asegúrate de que `user.email` esté disponible */}
        </div>
        <div className="flex flex-col items-center text-[#97D6DF] flex-grow">
          <div className="flex flex-col items-center">
            <h3 className="m-5 text-2xl font-bold text-center">
              Rutinas Compradas
            </h3>
            <table className="items-center  w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 text-center text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold ">
                    Rutina
                  </th>
                  <th className="px-6 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                    Precio
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                    Más
                  </th>
                </tr>
              </thead>
              <tbody>
                {purchasedRoutines.map((routine) => (
                  <tr key={routine.id}>
                    <td className="border-t-0 px-6 align-middle  border-l-0 border-r-0 text-xs whitespace-nowrap text-center p-4">
                      {routine.name}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center p-4">
                      ${routine.price}
                    </td>
                    <td className="border-t-0 text-center px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <Link href={`/rutinaComprada/${routine.id}`}>
                        <button className="m-4  relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
                          Ver rutina
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
          <div className="flex flex-col items-center  bg-black text-xl ">
            <h3 className="m-5 text-2xl font-bold text-center">
              Planes Comprados
            </h3>
            <ul>
              {error ? (
                <p>{error}</p>
              ) : purchasedPlans.length > 0 ? (
                purchasedPlans.map((plan) => (
                  <li
                    key={plan.id}
                    className="flex gap-4 items-center mt-4 bg-[#97D6DF]/10 p-4 rounded-lg"
                  >
                    <h1 className="text-lg font-bold">{plan.name}</h1>
                    <p>Precio: ${plan.price}</p>
                    <p>Estado: {plan.isActive ? "Activo" : "Inactivo"}</p>
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

import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import { IPlan } from "@/interface/plan.interface";

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
  const [errorPlan, setErrorPlan] = useState<string | null>(null);
  const [errorRutina, setErrorRutina] = useState<string | null>(null);
  const [hasFetchedData, setHasFetchedData] = useState<boolean>(false);

  useEffect(() => {
    if (user?.id && !hasFetchedData) {
      getUserRutinasYPlanes(user.id)
        .then((data) => {
          if (data) {
            const mappedRoutines = Array.isArray(data.routine)
              ? data.routine.map((routine: any) => ({
                  name: routine.name,
                  price: routine.price,
                  id: routine.id, // Asegurarse de que el id sea único
                  progress: routine.progress,
                }))
              : [];

            const mappedPlans = Array.isArray(data.subsciption)
              ? data.subsciption.map((subscription: any) => ({
                  id: subscription.plan.id,
                  name: subscription.plan.name,
                  description: subscription.plan.description,
                  isActive: subscription.plan.isActive,
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
            setErrorPlan(null);
            setErrorRutina(null);
          } else {
            setPurchasedRoutines([]);
            setPurchasedPlans([]);
            setErrorPlan("Aun no has adquirido ninguno de nuestros planes.");
            setErrorRutina("Aun no has adquirido ninguna de nuestras rutinas.");
          }
          setHasFetchedData(true);
        })
        .catch((error) => {
          console.error("Error fetching routines and plans:", error);
          setPurchasedRoutines([]);
          setPurchasedPlans([]);
          setErrorRutina("Aun no has adquirido ninguna de nuestras rutinas.");
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
    <div className="flex flex-col items-center gap-5 text-[#97D6DF] flex-grow mb-5">
      <div className="flex flex-col items-center w-full max-w-4xl">
        <h3 className="m-5 text-2xl font-bold text-center">
          Rutinas Compradas
        </h3>
        {errorRutina ? (
          <p className="text-red-500">{errorRutina}</p>
        ) : purchasedRoutines.length > 0 ? (
          <table className="w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xl font-semibold text-center uppercase align-middle border border-solid border-blueGray-100 whitespace-nowrap">
                  Rutina
                </th>
                <th className="px-6 py-3 text-xl font-semibold text-center uppercase align-middle border border-solid border-blueGray-100 whitespace-nowrap">
                  Precio
                </th>
                <th className="px-6 py-3 text-xl font-semibold text-center uppercase align-middle border border-solid border-blueGray-100 whitespace-nowrap">
                  Más
                </th>
              </tr>
            </thead>
            <tbody>
              {purchasedRoutines.map((routine) => (
                <tr key={routine.id} className="bg-[#97D6DF]/10">
                  <td className="p-4 text-xl text-center align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                    {routine.name}
                  </td>
                  <td className="p-4 text-xl text-center align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                    ${routine.price}
                  </td>
                  <td className="p-4 text-lg text-center align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                    <Link href={`/rutinaComprada/${routine.id}`}>
                      <button className="relative z-[2] px-6 py-2 m-4 font-bold text-white uppercase transition duration-150 ease-in-out rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
                        Ver rutina
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-red-500">
            Aun no has comprado ninguna de nuestras Rutinas.
          </p>
        )}
      </div>
      <br />
      <div className="flex flex-col items-center w-full max-w-4xl">
        <h3 className="m-5 text-2xl font-bold text-center">Planes Comprados</h3>
        {errorPlan ? (
          <p className="text-red-500">{errorPlan}</p>
        ) : purchasedPlans.length > 0 ? (
          <table className="w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xl font-semibold text-center uppercase align-middle border border-solid border-blueGray-100 whitespace-nowrap">
                  Plan
                </th>
                <th className="px-6 py-3 text-xl font-semibold text-center uppercase align-middle border border-solid border-blueGray-100 whitespace-nowrap">
                  Precio
                </th>
                <th className="px-6 py-3 text-xl font-semibold text-center uppercase align-middle border border-solid border-blueGray-100 whitespace-nowrap">
                  Estado
                </th>
                <th className="px-6 py-3 text-xl font-semibold text-center uppercase align-middle border border-solid border-blueGray-100 whitespace-nowrap">
                  Más
                </th>
              </tr>
            </thead>
            <tbody>
              {purchasedPlans
                .filter((plan) => plan.isActive)
                .map((plan) => (
                  <tr key={plan.id} className="bg-[#97D6DF]/10">
                    <td className="p-4 text-xl text-center align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                      {plan.name}
                    </td>
                    <td className="p-4 text-xl text-center align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                      ${plan.price}
                    </td>
                    <td className="p-4 text-xl text-center align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                      {plan.isActive ? "Activo" : "Inactivo"}
                    </td>
                    <td className="p-4 text-lg text-center align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                      <Link href={`/PlanComprado/${plan.id}`}>
                        <button className="relative z-[2] px-6 py-2 m-4 font-bold text-white uppercase transition duration-150 ease-in-out rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
                          Ver Plan
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p className="text-red-500">
            Aun no has comprado ninguno de nuestros Planes.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

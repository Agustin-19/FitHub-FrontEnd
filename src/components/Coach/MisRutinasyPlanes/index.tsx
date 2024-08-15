"use client";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import { IPlan } from "@/interface/plan.interface";
import { IRutinaEjercicio } from "@/interface/interface";
import { delete_Plan } from "@/server/fetchPlan";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { delete_Rutina } from "@/server/fetchRoutines";
import { useRouter } from "next/navigation";

interface Routine {
  id: string;
  name: string;
  progress: number;
  price: number;
  isActive: boolean;
}

interface Subscription {
  endDate: string;
  id: string;
  isActive: boolean;
  plan: IPlan;
  startDate: string;
  state: boolean;
}

const CouchDashboard = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const { user, getCouchRutinasYPlanes, isLogged } = userContext;
  const [avatar, setAvatar] = useState<string | null>(null);
  const [purchasedRoutines, setPurchasedRoutines] = useState<Routine[]>([]);
  const [purchasedPlans, setPurchasedPlans] = useState<IPlan[]>([]);
  const [purchasedExercises, setPurchasedExercises] = useState<
    IRutinaEjercicio[]
  >([]);
  const [errorPlan, setErrorPlan] = useState<string | null>(null);
  const [errorRutina, setErrorRutina] = useState<string | null>(null);
  const [hasFetchedData, setHasFetchedData] = useState<boolean>(false);

  useEffect(() => {
    if (user?.id && !hasFetchedData) {
      console.log("Fetching data...");

      getCouchRutinasYPlanes(user.id)
        .then((data) => {
          console.log("Data:", data);

          if (data) {
            const mappedRoutines = Array.isArray(data.routineAdmin)
              ? data.routineAdmin.map((routine: any) => ({
                  name: routine.name,
                  price: routine.price,
                  id: routine.id,
                  progress: routine.progress,
                  isActive: routine.isActive,
                }))
              : [];

            // Mapeo de suscripciones
            const mappedPlans = Array.isArray(data.planAdmin)
              ? data.planAdmin.map((subscription: any) => ({
                  id: subscription.id,
                  name: subscription.name,
                  description: subscription.description,
                  isActive: subscription.isActive,
                  price: subscription.price,
                  imgUrl: subscription.imgUrl,
                  location: subscription.location || "Unknown location",
                  latitude: subscription.latitude || 0,
                  longitude: subscription.longitude || 0,
                  category: subscription.category || [],
                  difficultyLevel: subscription.difficultyLevel || "Medium",
                  admin: subscription.admin || "Not assigned",
                  check: subscription.check || false,
                  date: subscription.date || new Date().toISOString(),
                }))
              : [];

            const mappedExercises = Array.isArray(data.exercise)
              ? data.exercise.map((exercise: any) => ({
                  id: exercise.id,
                  titulo: exercise.titulo,
                  descripcion: exercise.descripcion,
                  imgUrl: exercise.imgUrl,
                  videoUrl: exercise.videoUrl,
                }))
              : [];

            setPurchasedRoutines(mappedRoutines);
            setPurchasedPlans(mappedPlans);
            setPurchasedExercises(mappedExercises);
            setErrorPlan(null);
          } else {
            setPurchasedRoutines([]);
            setPurchasedPlans([]);
            setPurchasedExercises([]);
            setErrorPlan("Aun no has creado ningun plane.");
            setErrorRutina("Aun no has creado nunguna rutina.");
          }
          setHasFetchedData(true);
        })
        .catch((error) => {
          console.error("Error fetching routines and plans:", error);
          setPurchasedRoutines([]);
          setPurchasedPlans([]);
          setPurchasedExercises([]);
          setErrorRutina("Aun no has creado nunguna rutina.");
          setHasFetchedData(true);
        });
    }
  }, [user, getCouchRutinasYPlanes, hasFetchedData]);
  if (!isLogged) return <p>Debes estar logueado para acceder al dashboard.</p>;

  if (!user) return <p>Loading...</p>;

  const handleDeletePlan = (planId: string) => {
    confirmAlert({
      title: "Confirmar eliminación",
      message: "¿Estás seguro de que quieres eliminar este plan?",
      buttons: [
        {
          label: "Sí",
          onClick: async () => {
            try {
              await delete_Plan(planId);

              setPurchasedPlans((prevPlans) =>
                prevPlans.filter((plan) => plan.id !== planId)
              );
            } catch (error) {
              console.error("Error deleting plan:", error);
              setErrorPlan(
                "Error al eliminar el plan. Por favor, inténtalo de nuevo."
              );
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            // Acción a tomar si el usuario decide no eliminar el plan
            console.log("Plan deletion canceled");
          },
        },
      ],
    });
  };

  const handleDeleteRoutine = (routineId: string) => {
    confirmAlert({
      title: "Confirmar eliminación",
      message: "¿Estás seguro de que quieres eliminar esta rutina?",
      buttons: [
        {
          label: "Sí",
          onClick: async () => {
            try {
              console.log("Rutina ID to delete:", routineId);
              await delete_Rutina(routineId);

              setPurchasedRoutines((prevRoutines) =>
                prevRoutines.filter((routine) => routine.id !== routineId)
              );
            } catch (error) {
              console.error("Error deleting rutina:", error);
              setErrorPlan(
                "Error al eliminar la rutina. Por favor, inténtalo de nuevo."
              );
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            console.log("Rutina deletion canceled");
          },
        },
      ],
    });
  };

  const handleEdit = (parans: string) => {
    router.push(`/create/${parans}`);
  };

  return (
    <div className="flex flex-col items-center gap-5 text-[#97D6DF] flex-grow">
      <div className="flex flex-col items-center w-full max-w-4xl">
        <h3 className="m-5 text-2xl font-bold text-center">
          Ejercicios Creados
        </h3>
        {errorPlan ? (
          <p className="text-red-500">{errorPlan}</p>
        ) : purchasedExercises.length > 0 ? (
          <table className="w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xl font-semibold text-center uppercase align-middle border border-solid border-blueGray-100 whitespace-nowrap">
                  Ejercicio
                </th>
                <th className="px-6 py-3 text-xl font-semibold text-center uppercase align-middle border border-solid border-blueGray-100 whitespace-nowrap">
                  Descripción
                </th>
              </tr>
            </thead>
            <tbody>
              {purchasedExercises.map((exercise) => (
                <tr key={exercise.id} className="bg-[#97D6DF]/10">
                  <td className="p-4 text-xl text-center align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                    {exercise.titulo}
                  </td>
                  <td className="p-4 text-xl text-center align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                    {exercise.descripcion.length > 40
                      ? `${exercise.descripcion.slice(0, 40)}...`
                      : exercise.descripcion}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-red-500">Aun no has creado ningun ejercicio.</p>
        )}
      </div>

      <br />

      <div className="flex flex-col items-center w-full max-w-4xl">
        <h3 className="m-5 text-2xl font-bold text-center">Rutinas Creadas</h3>
        {errorRutina ? (
          <p className="text-red-500">{errorRutina}</p>
        ) : purchasedRoutines.filter((routine) => routine.isActive).length >
          0 ? (
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
                  Editar
                </th>
                <th className="px-6 py-3 text-xl font-semibold text-center uppercase align-middle border border-solid border-blueGray-100 whitespace-nowrap">
                  Borrar
                </th>
              </tr>
            </thead>
            <tbody>
              {purchasedRoutines
                .filter((routine) => routine.isActive)
                .map((routine) => (
                  <tr key={routine.id} className="bg-[#97D6DF]/10">
                    <td className="p-4 text-xl text-center align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                      {routine.name}
                    </td>
                    <td className="p-4 text-xl text-center align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                      ${routine.price}
                    </td>
                    <td className="p-4 text-lg text-center align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(`rutina/${routine.id}`)}
                        className="relative z-[2] px-6 py-2 m-4 font-bold text-white uppercase transition duration-150 ease-in-out rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]"
                      >
                        Editar
                      </button>
                    </td>
                    <td className="p-4 text-lg text-center align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteRoutine(routine.id)}
                        className="relative z-[2] px-6 py-2 m-4 font-bold text-white uppercase transition duration-150 ease-in-out rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]"
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p className="text-red-500">Aun no has creado ningun rutina.</p>
        )}
      </div>

      <br />

      <div className="flex flex-col items-center w-full max-w-4xl">
        <h3 className="m-5 text-2xl font-bold text-center">
          Actividades Creadas
        </h3>
        {errorPlan ? (
          <p className="text-red-500">{errorPlan}</p>
        ) : purchasedPlans.length > 0 ? (
          purchasedPlans.filter((plan) => plan.isActive).length > 0 ? (
            <table className="w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xl font-semibold text-center uppercase align-middle border border-solid border-blueGray-100 whitespace-nowrap">
                    Actividad
                  </th>
                  <th className="px-6 py-3 text-xl font-semibold text-center uppercase align-middle border border-solid border-blueGray-100 whitespace-nowrap">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-xl font-semibold text-center uppercase align-middle border border-solid border-blueGray-100 whitespace-nowrap">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-xl font-semibold text-center uppercase align-middle border border-solid border-blueGray-100 whitespace-nowrap">
                    Editar
                  </th>
                  <th className="px-6 py-3 text-xl font-semibold text-center uppercase align-middle border border-solid border-blueGray-100 whitespace-nowrap">
                    Borrar
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
                        <button
                          onClick={() => handleEdit(`plan/${plan.id}`)}
                          className="relative z-[2] px-6 py-2 m-4 font-bold text-white uppercase transition duration-150 ease-in-out rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]"
                        >
                          Editar
                        </button>
                      </td>
                      <td className="p-4 text-lg text-center align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                        <button
                          onClick={() => handleDeletePlan(plan.id)}
                          className="relative z-[2] px-6 py-2 m-4 font-bold text-white uppercase transition duration-150 ease-in-out rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]"
                        >
                          Borrar
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="text-red-500">Aun no has creado ningun actividad.</p>
          )
        ) : (
          <p className="text-red-500">Aun no has creado ningun actividad.</p>
        )}
      </div>
    </div>
  );
};

export default CouchDashboard;

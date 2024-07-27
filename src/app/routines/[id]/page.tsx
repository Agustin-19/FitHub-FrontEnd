"use client";
import { rutinas } from "../../../../public/data/rutines.data";
import Image from "next/image";
import { useState, useContext } from "react";
import ExerciseVideo from "@/components/ExerciseVideo";
import { IRutinaEjercicio } from "@/interface/interface";
import { UserContext } from "@/context/userContext";

interface IRoutineProps {
  params: {
    id: string;
  };
}

const Routine = ({ params }: IRoutineProps) => {
  const [selectedEjercicio, setSelectedEjercicio] =
    useState<IRutinaEjercicio | null>(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const { isLogged } = useContext(UserContext);

  console.log("Estado de isLogged:", isLogged); //

  const id = params.id;
  const routine = rutinas.find((r) => r.id === parseInt(id || "0"));

  if (!routine) {
    return <div>Rutina no encontrada</div>;
  }

  const handlePurchase = () => {
    if (!isLogged) {
      alert("Debes iniciar sesión para comprar la rutina.");
      return;
    }
    setIsPurchased(true);
    alert(`Rutina ${routine.name} comprada!`);
  };

  return (
    <div className=" ">
      <div className=" p-4 rounded-lg ">
        <div className=" flex justify-center gap-5">
          <div className="m-3">
            <h2 className="text-2xl font-bold text-titulos mb-4">
              {routine.name}
            </h2>
            <div className="relative object-contain w-40 h-40 rounded-t-lg">
              <Image
                src={routine.imagen}
                alt={routine.name}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={true}
                className="rounded-t-lg"
              />
            </div>
          </div>
          <div className="m-5 ">
            <p className="my-4">{routine.description}</p>
            <h3 className="text-xl font-semibold mb-2">Ejercicios</h3>
            <button
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              onClick={handlePurchase}
            >
              Comprar Rutina
            </button>
          </div>
        </div>
        <ul>
          {routine.ejercicios.map((ejercicio) => (
            <li key={ejercicio.id} className="mb-2 border-2 borrder-[--titulo]">
              <div className="flex gap-3 align-middle">
                <div className="m-2 text-center">
                  <h4 className="font-bold m-1">{ejercicio.name}</h4>
                  <div className="relative object-contain w-40 h-40 rounded-t-lg">
                    <Image
                      src={ejercicio.imagen}
                      alt={ejercicio.name}
                      fill={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={true}
                      className="rounded-t-lg"
                    />
                  </div>
                  {isPurchased ? (
                    <button
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                      onClick={() => setSelectedEjercicio(ejercicio)}
                    >
                      Ver Video
                    </button>
                  ) : (
                    <button
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                      onClick={() => alert("Debes comprar la rutina")}
                    >
                      Ver Video
                    </button>
                  )}
                </div>
                <div className=" text-center m-3 mt-10">
                  <p>{ejercicio.description}</p>
                  <p>Series: {ejercicio.series}</p>
                  <p>Repeticiones: {ejercicio.repeticiones}</p>
                  <p>
                    Tiempo de Actividad: {ejercicio.tiempoActividad} segundos
                  </p>
                  <p>Tiempo de Descanso: {ejercicio.tiempoDescanso} segundos</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {selectedEjercicio && (
          <ExerciseVideo
            ejercicio={selectedEjercicio}
            onClose={() => setSelectedEjercicio(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Routine;

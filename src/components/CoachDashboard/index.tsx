import React from "react";
import { useRouter } from "next/navigation";

export default function CoachDashboard() {
  const router = useRouter();

  const handleUploadRoutine = () => {
    router.push("/upload-routine"); // Redirige a la página de subir rutinas
  };

  const handleViewUploadedRoutines = () => {
    router.push("/uploaded-routines"); // Redirige a la página de rutinas subidas
  };

  return (
    <>
      <h1>Aquí va lo del profe</h1>
      <p>Bienvenido al panel de entrenadores.</p>
      <div className="flex space-x-4">
        <button
          onClick={handleUploadRoutine}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Subir Rutinas
        </button>
        <button
          onClick={handleViewUploadedRoutines}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Rutinas Subidas
        </button>
      </div>
    </>
  );
}

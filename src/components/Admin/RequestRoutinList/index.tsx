import { ISolicitudes } from "@/interface/admin.interface";
import AdminRoutinesCard from "../RoutinesCard";
import { IRutina } from "@/interface/interface";
import { getSolicitudes } from "@/server/fetchAmin";
import { useState, useEffect } from "react";

export default function RequestRoutineList() {
  const [routines, setRoutines] = useState<IRutina[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ISolicitudes = await getSolicitudes();

        setRoutines(data.rutinas);
      } catch (error) {
        console.error("Error fetching coaches:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <AdminRoutinesCard routines={routines} />
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import AdminRoutinesCard from "@/components/Admin/RoutinesCard";
import { get_Rutinas } from "@/server/fetchRoutines"; // Asegúrate de que la ruta sea correcta
import { IRutina } from "@/interface/interface";

export default function AdminRoutines() {
    const [routines, setRoutines] = useState<IRutina[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoutines = async () => {
            try {
                const fetchedRoutines = await get_Rutinas();
                setRoutines(fetchedRoutines);
            } catch (err) {
                setError("Error al obtener las rutinas");
            } finally {
                setLoading(false);
            }
        };

        fetchRoutines();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='z-10'>
            <AdminRoutinesCard routines={routines} />
        </div>
    );
}

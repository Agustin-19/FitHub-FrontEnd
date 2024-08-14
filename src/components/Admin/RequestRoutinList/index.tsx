import { ISolicitudes, resEnum } from "@/interface/admin.interface";
import AdminRoutinesCard from "../RoutinesCard";
import { IRutina } from "@/interface/interface";
import { getSolicitudes, postSolicitudes } from "@/server/fetchAmin";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RequestRoutineList() {
    const [routines, setRoutines] = useState<IRutina[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: ISolicitudes = await getSolicitudes();
                console.log("Rutinas:", data.rutinas);

                setRoutines(data.rutinas);
            } catch (error) {
                console.error("Error fetching coaches:", error);
            }
        };

        fetchData();
    }, []);

    const handleCheckboxChange = (planId: string) => {
        setSelectedIds(prevSelectedIds =>
            prevSelectedIds.includes(planId)
                ? prevSelectedIds.filter(id => id !== planId)
                : [...prevSelectedIds, planId]
        );
    };

    const handleAprobar = async (condicion: resEnum) => {
        const solicitudes = {
            coach: [],
            plan: [],
            rutina: selectedIds
        };

        try {
            const response = await postSolicitudes(solicitudes, condicion);
            console.log("Respuesta de la aprobación:", response);
            setSelectedIds([]); 

            if (response.ok) {
                toast.success("Correcto", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    onClose: () => window.location.reload(),
                });
            } else {
                toast.error("Error", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

        } catch (error) {
            toast.error("Error al aprobar las rutinas", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.error("Error al aprobar las rutinas:", error);
        }
    };

    return (
        <div>
            <div className="flex justify-center">
                <div className="flex justify-center gap-3">
                    <button type="submit" onClick={() => handleAprobar(resEnum.ACEPTAR)} className='boton-aprobar'>
                        Aprobar
                    </button>
                    <button type="submit" onClick={() => handleAprobar(resEnum.CORREGIR)} className='boton-corregir'>
                        Corregir
                    </button>
                    <button type="submit" onClick={() => handleAprobar(resEnum.DENEGAR)} className='boton-denegar'>
                        Rechazar
                    </button>
                </div>
            </div>
            <AdminRoutinesCard
                routines={routines}
                selectedIds={selectedIds}
                handleCheckboxChange={handleCheckboxChange}
            />
            <ToastContainer />
        </div>
    );
}
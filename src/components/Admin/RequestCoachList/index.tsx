'use client'
import AdminCardCoach from '@/components/Admin/CoachCard';
import { useState, useEffect } from 'react';
import { getSolicitudes, postSolicitudes } from '@/server/fetchAmin';
import { ICoach, ISolicitudes, resEnum } from '@/interface/admin.interface';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RequestCoachList() {
    const [coaches, setCoaches] = useState<ICoach[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: ISolicitudes = await getSolicitudes();
                setCoaches(data.coachs);
            } catch (error) {
                console.error("Error fetching coaches:", error);
            }
        };

        fetchData();
    }, []);

    const handleAprobar = async (condicion: resEnum) => {
        const solicitudes = {
            coach: selectedIds,
            plan: [],
            rutina: []
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
            console.error("Error al aprobar los coaches:", error);
        }
    };

    return (
        <div>
            <div className="flex justify-center gap-3 mb-4">
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
            <AdminCardCoach
                coaches={coaches}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
            />
            <ToastContainer />
        </div>
    );
}

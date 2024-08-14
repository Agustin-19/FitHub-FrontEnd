import { useState, useEffect } from "react";
import { ISolicitudes } from "@/interface/admin.interface";
import { getSolicitudes, postSolicitudes } from "@/server/fetchAmin";
import { IPlan } from "@/interface/plan.interface";
import AdminPlanCard from "../PlansCard";
import { resEnum } from "@/interface/admin.interface";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RequestPlanList() {
    const router = useRouter();
    const [plans, setPlans] = useState<IPlan[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: ISolicitudes = await getSolicitudes();
                setPlans(data.planes);
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
            plan: selectedIds,
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
            console.error("Error al aprobar los planes:", error);
        }
    };

    return (
        <div>
            <div className="flex justify-center gap-3 mb-6">
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
            <AdminPlanCard 
                plans={plans} 
                selectedIds={selectedIds} 
                handleCheckboxChange={handleCheckboxChange} 
            />
            <ToastContainer />
        </div>
    );
}

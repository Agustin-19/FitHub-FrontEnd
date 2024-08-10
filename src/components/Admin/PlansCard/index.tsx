import { resEnum } from "@/interface/admin.interface";
import { IPlan } from "@/interface/plan.interface";
import { postSolicitudes } from "@/server/fetchAmin";
import Image from "next/image";
import { useState } from "react";


interface AdminPlanCardProps {
    plans: IPlan[];
}

export default function AdminPlanCard({ plans }: AdminPlanCardProps) {
    const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>([]);


    const imgDefect = "https://img.daisyui.com/images/profile/demo/2@94.webp";
    const getImageSrc = (image: string | string[] | null | undefined) => {
        if (typeof image === "string") {
            return image;
        } else if (Array.isArray(image) && image.length > 0) {
            return image[0][0];
        } else {
            return imgDefect;
        }
    };

    const handleCheckboxChange = (planId: string) => {
        setSelectedPlanIds(prevSelectedPlanIds =>
            prevSelectedPlanIds.includes(planId)
                ? prevSelectedPlanIds.filter(id => id !== planId)
                : [...prevSelectedPlanIds, planId]
        );
    };

    const handleAprobar = async () => {
        const solicitudes = {
            coach: [],
            plan: selectedPlanIds,
            rutina: []
        };

        try {
            const response = await postSolicitudes(solicitudes, resEnum.ACEPTAR);
            console.log("Respuesta de la aprobación:", response);
        } catch (error) {
            console.error("Error al aprobar los planes:", error);
        }
    };
    
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-center">
                <button type="submit" onClick={handleAprobar} className='boton'>
                    Aprobar
                </button>
            </div>
            <div className="overflow-x-auto z-10">
                <table className="daisy-table">
                    <thead className="text-white">
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="daisy-checkbox" />
                                </label>
                            </th>
                            <th>Plan</th>
                            <th>Categoría y Dificultad</th>
                            <th>Precio</th>
                            <th>Locación</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans.map((plan) => (
                            <tr key={plan.id}>
                                <th>
                                    <label>
                                        <input 
                                        type="checkbox" 
                                        className="daisy-checkbox" 
                                        checked={selectedPlanIds.includes(plan.id)}
                                        onChange={() => handleCheckboxChange(plan.id)}
                                        />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="daisy-avatar">
                                            <div className="daisy-mask daisy-mask-squircle h-12 w-12">
                                                <div className="relative object-contain w-12 h-12 rounded-t-lg">
                                                    <Image
                                                        src={getImageSrc(plan.imgUrl)}
                                                        alt={plan.name}
                                                        fill={true}
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        priority={true}
                                                        className="rounded-lg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{plan.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {plan.category?.map((cat, index) => (
                                            <span key={index} className="daisy-badge daisy-badge-ghost daisy-badge-sm">
                                                {cat.name}
                                            </span>
                                        ))}
                                        <div className="text-sm opacity-50">{plan.difficultyLevel}</div>
                                    </div>
                                </td>
                                <td>
                                    ${plan.price}
                                </td>
                                <td>
                                    {plan.location} {/* Nueva celda que muestra la locación */}
                                </td>
                                <th>
                                    <button className="daisy-btn daisy-btn-ghost daisy-btn-xs">Detalles</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="text-white">
                        <tr>
                            <th></th>
                            <th>Plan</th>
                            <th>Categoría y Dificultad</th>
                            <th>Precio</th>
                            <th>Locación</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

import { resEnum } from "@/interface/admin.interface";
import { IPlan } from "@/interface/plan.interface";
import { postSolicitudes } from "@/server/fetchAmin";
import Image from "next/image";
import { useState } from "react";
import { Dificultad } from '../../../../../FitHub/src/Dto/Dificultad.Dto';


interface AdminPlanCardProps {
    plans: IPlan[];
}

export default function AdminPlanCard({ plans }: AdminPlanCardProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);


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
        } catch (error) {
            console.error("Error al aprobar los planes:", error);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-center">
            <div className="flex justify-center gap-3">
                <button type="submit" onClick={ ()=> handleAprobar(resEnum.ACEPTAR)} className='boton-aprobar'>
                    Aprobar
                </button>
                <button type="submit" onClick={ ()=> handleAprobar(resEnum.CORREGIR)} className='boton-corregir'>
                    Corregir
                </button>
                <button type="submit" onClick={ ()=> handleAprobar(resEnum.DENEGAR)} className='boton-denegar'>
                    Rechazar
                </button>
            </div>
            </div>
            <div className="overflow-x-auto z-10">
                <table className="daisy-table">
                    <thead className="text-white">
                        <tr>
                            <th></th>
                            <th>Plan</th>
                            <th>Descripción</th> 
                            <th>Categoría</th>
                            <th>Locación</th>
                            <th>Dificultad</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans.map((plan) => (
                            <tr key={plan.id}>
                                <th>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="daisy-checkbox border-white"
                                            checked={selectedIds.includes(plan.id)}
                                            onChange={() => handleCheckboxChange(plan.id)}
                                        />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="daisy-avatar">
                                            <div className="daisy-mask daisy-mask-squircle h-40 w-40">
                                                <div className="relative object-contain w-40 h-40 rounded-t-lg">
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
                                    <div className="font-bold">{plan.description}</div> {/* Descripción del plan */}
                                </td>
                                <td>
                                    <div className="flex flex-col">
                                        {plan.category?.map((cat, index) => (
                                            <span key={index} className="daisy-badge daisy-badge-ghost daisy-badge-sm">
                                                {cat.name}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {plan.location} {/* Locación */}
                                    </div>
                                </td>
                                <td>
                                    <div className="text-sm opacity-50">{plan.difficultyLevel}</div>
                                </td>
                                <th>
                                    ${plan.price}
                                    <div className="text-sm opacity-50">{plan.check}</div> {/* Verificación */}
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="text-white">
                        <tr>
                            <th></th>
                            <th>Plan</th>
                            <th>Descripción</th> {/* Nueva columna */}
                            <th>Categoría</th>
                            <th>Locación</th>
                            <th>Dificultad</th>
                            <th>Precio</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
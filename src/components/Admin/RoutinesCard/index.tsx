import { resEnum } from "@/interface/admin.interface";
import { IRutina } from "@/interface/interface";
import { postSolicitudes } from "@/server/fetchAmin";
import Image from "next/image";
import { useState } from "react";
import RoutineDetails from "../RoutinesDetails";

interface AdminRoutineCardProps {
    routines: IRutina[];
    selectedIds: string[];
    handleCheckboxChange: (planId: string) => void;
}


export default function AdminRoutinesCard({ routines, selectedIds, handleCheckboxChange }: AdminRoutineCardProps) {
    const [selectedRoutine, setSelectedRoutine] = useState<IRutina | null>(null);

    const imgDefect = "https://img.daisyui.com/images/profile/demo/2@94.webp";
    const getImageSrc = (image: string | string[] | null | undefined) => {
        if (typeof image === "string") {
            return image;
        } else if (Array.isArray(image) && image.length > 0) {
            return image[0];
        } else {
            return imgDefect;
        }
    };



    const handleDetailsClick = (routine: IRutina) => {
        setSelectedRoutine(routine);
    };

    const handleCloseDetails = () => {
        setSelectedRoutine(null);
    };

    return (
        <div className="flex flex-col gap-6">
            {selectedRoutine && (
                <RoutineDetails routine={selectedRoutine} onClose={handleCloseDetails} />
            )}
            <div className="overflow-x-auto z-10">
                <table className="daisy-table">
                    <thead className="text-white">
                        <tr>
                            <th>
                                <label>
                                    Seleccionar
                                </label>
                            </th>
                            <th>Rutina</th>
                            <th>Categoría y Dificultad</th>
                            <th>Precio</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {routines.map((rutina) => (
                            <tr key={rutina.id}>
                                <th>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="daisy-checkbox border-white"
                                            checked={selectedIds.includes(rutina.id)}
                                            onChange={() => handleCheckboxChange(rutina.id)}
                                        />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="daisy-avatar">
                                            <div className="daisy-mask daisy-mask-squircle h-12 w-12">
                                                <div className="relative object-contain w-12 h-12 rounded-t-lg">
                                                    <Image
                                                        src={getImageSrc(rutina.imgUrl)}
                                                        alt={rutina.name}
                                                        fill={true}
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        priority={true}
                                                        className="rounded-lg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{rutina.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {rutina.category?.map((cat, index) => (
                                            <span key={index} className="daisy-badge daisy-badge-ghost daisy-badge-sm">
                                                {cat.name}
                                            </span>
                                        ))}
                                        <div className="text-sm opacity-50">{rutina.difficultyLevel}</div>
                                    </div>
                                </td>
                                <td>
                                    ${rutina.price}
                                </td>
                                <th>
                                    <button
                                        className="daisy-btn daisy-btn-ghost daisy-btn-xs"
                                        onClick={() => handleDetailsClick(rutina)}
                                    >
                                        Detalles
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="text-white">
                        <tr>
                            <th>
                                <label>
                                    Seleccionar
                                </label>
                            </th>
                            <th>Rutina</th>
                            <th>Categoría y Dificultad</th>
                            <th>Precio</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

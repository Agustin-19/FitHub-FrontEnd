import { useState } from "react";
import { IUser } from "@/interface/interface";
import Image from "next/image";
import CvCoach from "@/components/Admin/CvCoach";  // Asegúrate de que la ruta es correcta
import { ICoach } from "@/interface/admin.interface";

interface AdminCardCoachProps {
    coaches: ICoach[];
}

export default function AdminCardCoach({ coaches }: AdminCardCoachProps) {
    const [selectedCoach, setSelectedCoach] = useState<ICoach | null>(null);

    const handleDetailsClick = (coach: ICoach) => {
        setSelectedCoach(coach);
    };

    const handleClose = () => {
        setSelectedCoach(null);
    };

    return (
        <div>
            <div className="overflow-x-auto z-10">
                <table className="daisy-table">
                    {/* head */}
                    <thead className="text-white">
                        <tr>
                            <th>
                                <label>
                                    Aprobar
                                </label>
                            </th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Solicitud</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(coaches) && coaches.map((coach) => (
                            <tr key={coach.id}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="daisy-checkbox border-white" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="daisy-avatar">
                                            <div className="daisy-mask daisy-mask-squircle h-12 w-12">
                                                <div className="relative object-contain w-40 h-40 rounded-t-lg">
                                                    <Image
                                                        src={coach.fotosPerfil || "https://img.daisyui.com/images/profile/demo/2@94.webp"}
                                                        alt={coach.name || "imagen por defecto"}
                                                        fill={true}
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        priority={true}
                                                        className="rounded-t-lg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{coach.name}</div>
                                            <div className="text-sm opacity-50">{coach.country}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {coach.email}
                                    <br />
                                    <span className="daisy-badge daisy-badge-ghost daisy-badge-sm">
                                        {coach.role}
                                    </span>
                                </td>
                                <td>{coach.solicitud}</td>
                                <th>
                                    <button
                                        className="daisy-btn daisy-btn-ghost daisy-btn-xs"
                                        onClick={() => handleDetailsClick(coach)}
                                    >
                                        Detalles
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="text-white">
                        <tr>
                            <th></th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Solicitud</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Ventana emergente */}
            {selectedCoach && (
                <CvCoach coach={selectedCoach} onClose={handleClose} />
            )}
        </div>
    );
}

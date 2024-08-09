import { IUser } from "@/interface/interface";
import Image from "next/image";

interface AdminCardCoachProps {
    coaches: IUser[];
}

export default function AdminCardCoach({ coaches }: AdminCardCoachProps) {
    return (
        <div>
            <div className="overflow-x-auto z-10">
                <table className="daisy-table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="daisy-checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {coaches.map((coach) => (
                            <tr key={coach.id}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="daisy-checkbox" />
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
                                    {coach.address}
                                    <br />
                                    <span className="daisy-badge daisy-badge-ghost daisy-badge-sm">
                                        {coach.role}
                                    </span>
                                </td>
                                <td>{coach.phone}</td>
                                <th>
                                    <button className="daisy-btn daisy-btn-ghost daisy-btn-xs">details</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

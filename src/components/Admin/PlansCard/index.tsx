import { IPlan } from "@/interface/plan.interface";
import Image from "next/image";

interface AdminPlanCardProps {
    plans: IPlan[];
    selectedIds: string[];
    handleCheckboxChange: (planId: string) => void;
}

export default function AdminPlanCard({ plans, selectedIds, handleCheckboxChange }: AdminPlanCardProps) {
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

    return (
        <div className="overflow-x-auto z-10">
            <table className="daisy-table">
                <thead className="text-white">
                    <tr>
                        <th>
                            <label>
                                Seleccionar
                            </label>
                        </th>
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
                                <div className="font-bold">{plan.description}</div>
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
                                    {plan.location}
                                </div>
                            </td>
                            <td>
                                <div className="text-sm opacity-50">{plan.difficultyLevel}</div>
                            </td>
                            <th>
                                ${plan.price}
                                <div className="text-sm opacity-50">{plan.check}</div>
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
                        <th>Plan</th>
                        <th>Descripción</th>
                        <th>Categoría</th>
                        <th>Locación</th>
                        <th>Dificultad</th>
                        <th>Precio</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

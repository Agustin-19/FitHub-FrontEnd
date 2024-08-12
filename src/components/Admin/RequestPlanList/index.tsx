import { ISolicitudes } from "@/interface/admin.interface";
import { getSolicitudes } from "@/server/fetchAmin";
import { useState, useEffect } from "react";
import { IPlan } from "@/interface/plan.interface";
import AdminPlanCard from "../PlansCard";

export default function RequestPlanList() {
    const [plans, setPlans] = useState<IPlan[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: ISolicitudes = await getSolicitudes();
                // console.log("Datos recibidos:", data.planes);

                setPlans(data.planes);
            } catch (error) {
                console.error("Error fetching coaches:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <AdminPlanCard plans={plans} />
        </div>
    );
}
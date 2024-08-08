'use client'
import AdminPlanCard from "@/components/Admin/PlansCard";
import { IPlan } from "@/interface/plan.interface";
import { get_Plan } from "@/server/fetchPlan";
import { useState, useEffect } from "react";

export default function AdminPlans() {
    const [plans, setPlan] = useState<IPlan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlanes = async () => {
            try {
                const fetchPlan = await get_Plan();
                setPlan(fetchPlan);
            } catch (err) {
                setError("Error al obtener las rutinas");
            } finally {
                setLoading(false);
            }
        };

        fetchPlanes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='z-10'>
            <AdminPlanCard plans={plans} />
        </div>
    );
}
'use client'
import AdminCardCoach from '@/components/Admin/CoachCard';
import { getCoach } from '@/server/fetcheCoach';
import { useState, useEffect } from 'react';
import { ICoach } from '@/interface/admin.interface';
import RequestCoachList from '@/components/Admin/RequestCoachList';



export default function AdminCoach() {
    const [coaches, setCoaches] = useState<ICoach[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCoach();
                setCoaches(data);
            } catch (error) {
                console.error("Error fetching coaches:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="flex flex-col justify-center text-center">
                <h3 className=" text-2xl m-3 ">Solicitudes para rol de Entrenador</h3>
                <RequestCoachList />
            </div>
            <div className="flex flex-col justify-center text-center">
                <h3 className=" text-2xl m-3 ">Entrenadores</h3>
                <AdminCardCoach coaches={coaches} />
            </div>
        </div>
    );
}


'use client'
import AdminCardCoach from '@/components/Admin/CoachCard';
import { useState, useEffect } from 'react';
import { getSolicitudes } from '@/server/fetchAmin';
import { ICoach, ISolicitudes } from '@/interface/admin.interface';



export default function RequestCoachList() {
    const [coaches, setCoaches] = useState<ICoach[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: ISolicitudes = await getSolicitudes();
                // console.log("Datos recibidos:", data.coachs);  

                setCoaches(data.coachs);
            } catch (error) {
                console.error("Error fetching coaches:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <AdminCardCoach coaches={coaches} />
        </div>
    );
}


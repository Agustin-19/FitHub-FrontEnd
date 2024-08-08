'use client'
import { GetServerSideProps } from 'next';
import AdminCardCoach from '@/components/Admin/CoachCard';
import { IUser } from '@/interface/interface'; // Ajusta la ruta según tu estructura de carpetas
import { getCoach } from '@/server/fetcheCoach';
import { useState, useEffect } from 'react';



export default function AdminCoach() {
    const [coaches, setCoaches] = useState<IUser[]>([]);

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
            <AdminCardCoach coaches={coaches} />
        </div>
    );
}


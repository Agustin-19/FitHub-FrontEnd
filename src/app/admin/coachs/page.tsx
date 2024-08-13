'use client'
import AdminCardCoach from '@/components/Admin/CoachCard';
import { getCoach } from '@/server/fetcheCoach';
import { useState, useEffect } from 'react';
import { ICoach } from '@/interface/admin.interface';
import RequestCoachList from '@/components/Admin/RequestCoachList';



export default function AdminCoach() {

    return (
        <div>
            <div className="flex flex-col justify-center text-center">
                <h3 className=" text-2xl m-3 ">Solicitudes para rol de Entrenador</h3>
                <RequestCoachList />
            </div>
        </div>
    );
}


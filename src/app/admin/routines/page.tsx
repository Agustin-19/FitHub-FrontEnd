'use client';
import RequestRoutineList from '@/components/Admin/RequestRoutinList';

export default function AdminRoutines() {


    return (
        <div>
            <div className="flex flex-col justify-center text-center">
                <h3 className=" text-2xl m-3 ">Rutinas sin aprobar</h3>
                <RequestRoutineList />
            </div>

        </div>
    );
}

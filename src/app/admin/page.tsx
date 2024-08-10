'use client';
import RequestCoachList from "@/components/Admin/RequestCoachList";
import RequestPlanList from "@/components/Admin/RequestPlanList";
import RequestRoutineList from "@/components/Admin/RequestRoutinList";

export default function Admin() {
    return (
        <div>
            <div>
                <h3>Solicitudes para rol de Entrenador</h3>
                <RequestCoachList />
            </div>
            <div>
                <h3>Rutinas sin aprobar</h3>
                <RequestRoutineList/>
            </div>
            <div>
                <h3>Planes sin aprobar</h3>
                <RequestPlanList />
            </div>
        </div>
    )
}
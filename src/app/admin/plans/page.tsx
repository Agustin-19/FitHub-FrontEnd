'use client'
import RequestPlanList from "@/components/Admin/RequestPlanList";

export default function AdminPlans() {

    return (
        <div>
            <div className="flex flex-col justify-center text-center">
                <h3 className=" text-2xl m-3 ">Planes sin aprobar</h3>
                <RequestPlanList />
            </div>
        </div>
    );
}
"use client";

import { IPlan } from "@/interface/plan.interface";
import PlanCard from "../PlanCard";

interface PlanListProps {
  plans: IPlan[];
}

const PlanList: React.FC<PlanListProps> = ({ plans }) => {
  return (
    <div className="p-8">
      <div className="plan-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-fondo">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default PlanList;

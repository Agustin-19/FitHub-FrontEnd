'use client'
import React, { useContext, useEffect, useState } from 'react';
import { IPlan, ISearch } from '@/interface/plan.interface';
import { PlanContext } from '@/context/planContext';
import PlanCard from '../PlanCard';

interface PlanListProps {
    plans: IPlan[];
}

const PlanList: React.FC<PlanListProps> = ({ plans }) => {

    return (
        <div className="bg-[#1A1D1A] p-8">
            <div className="plan-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-fondo">
                {plans.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} />
                ))}
            </div>
        </div>
    );
};

export default PlanList;


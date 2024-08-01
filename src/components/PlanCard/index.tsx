import React from 'react';
import { IPlan } from '@/interface/plan.interface';

interface PlanCardProps {
    plan: IPlan;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
    return (
        <div className="plan-card bg-[--fondo] text-white p-6 rounded-lg shadow-[white] shadow-lg">
            <h3 className="text-[--titulos] text-xl font-semibold mb-2">{plan.name || 'Nombre no disponible'}</h3>
            <p className="text-[--subTitulos] mb-2">{plan.description || 'Descripción no disponible'}</p>
            <p className="mb-2"><span className="font-bold">Dificultad:</span> {plan.difficultyLevel || 'No especificado'}</p>
            <p className="mb-2"><span className="font-bold">Ubicación:</span> {plan.location || 'No especificado'}</p>
            <p className="mb-2"><span className="font-bold">Categorías:</span> {Array.isArray(plan.category) ? plan.category.map(cat => cat.name).join(', ') : 'No especificado'}</p>
            <p className="mb-2"><span className="font-bold">Fecha:</span> {plan.date ? new Date(plan.date).toLocaleDateString() : 'No especificado'}</p>
            <p className="mb-2"><span className="font-bold">Activo:</span> {plan.isActive ? 'Sí' : 'No'}</p>
            <p className="mb-2"><span className="font-bold">Verificado:</span> {plan.check ? 'Sí' : 'No'}</p>
        </div>
    );
};

export default PlanCard;

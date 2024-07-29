import { IUser } from "./interface";

enum Dificultad {
    INICIAL = 'inicial',
    INTERMEDIO = 'intermedio',
    AVANZADO = 'avanzado',
    PROFESIONAL = 'profesional',
}

interface ICreatePlan {
    name: string;
    category: ICategory[];
    description: string;
    location: string;
    difficultyLevel: Dificultad;
}


interface IPlan {
    name: string;
    description: string;
    location: string;
    difficultyLevel: string;
    admin: IUser;
    category: ICategory[];
    id: string;
    check: boolean;
    date: string;
    isActive: boolean;
}

interface ICategory {
    id: string;
    name: string;
}


export type {
    ICreatePlan,
    IPlan,
    ICategory,
    Dificultad,
}
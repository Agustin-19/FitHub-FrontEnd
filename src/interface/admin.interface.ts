import { IRutina, IUser } from "./interface";
import { IPlan } from "./plan.interface";


interface ICoach extends IUser {
    cvvideo: string,
    cvpdf: string
}

interface ISolicitudes {
    coachs: ICoach[],
    planes: IPlan[],
    rutinas: IRutina[]
}

export type {
    ICoach,
    ISolicitudes
}
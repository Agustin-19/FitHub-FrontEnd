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

interface ISolicitudRes{
    coach: string[]| null,
    plan: string[] | null,
    rutina: string[]| null
}

export enum resEnum {
    ACEPTAR= "aceptar",
    CORREGIR='corregir',
    DENEGAR= 'denegar',
}

export type {
    ICoach,
    ISolicitudes,
    ISolicitudRes
}
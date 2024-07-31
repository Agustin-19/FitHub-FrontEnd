import { IRutina, IRutinaEjercicio } from "@/interface/interface";
import { API } from "@/helpers/helper";
import { ISearch } from "@/interface/plan.interface";

export const get_Rutinas = async (queryString: ISearch): Promise<IRutina[]> => {
    const {
        search,
        difficultyLevel,
        location,
        category,
        page,
        limit,
    } = queryString

    const lim = limit || 8;

    const arg = `limit=${lim}&page=${page}&category=${category}&location=${location}&difficultyLevel=${difficultyLevel}&search=${search}`;
    console.log(arg);
    
    try {
        const response = await fetch(`${API}/rutina?${arg}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener las rutinas");
        }
        const data = await response.json();
        console.log(data);
        
        return data;
    } catch (err) {
        console.log('Error al obtener las rutinas:', err);
        throw err;
    }
};

export const createExercise = async (ejercicio: IRutinaEjercicio) => {
    try {
        const response = await fetch(`${API}/ejercicio`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ejercicio),
        });

        if (!response.ok) {
            throw new Error("Error al crear el ejercicio");
        }
        console.log('Ejercicio creado correctamente');
        return response.json();


    } catch{
        console.log('Error al crear el ejercicio:');
        return 
    }
}

import { API } from "@/helpers/helper";
import { IPlan, ISearch } from "@/interface/plan.interface";

export const get_Plan = async (queryString: ISearch): Promise<IPlan[]> => {
    const {
        search,
        difficultyLevel,
        location,
        category,
        page,
        limit,
    } = queryString

    const lim = limit || 8;
    const pag = page || 1;

    const arg = `limit=${lim}&page=${pag}&category=${category}&location=${location}&difficultyLevel=${difficultyLevel}&search=${search}`;
    console.log(arg);
    
    try {
        const response = await fetch(`${API}/plan?${arg}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener los Planes ");
        }
        const data = await response.json();
        console.log(data);
        
        return data;
    } catch (err) {
        console.log('Error al obtener los Planes:', err);
        throw err;
    }
};



export const get_Category = async () => {
    try{
        const response = await fetch(`${API}/categorias`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error("Error al obtener las Categorías ");
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log('Error al obtener las Categorías:', err);
        throw err;
    }
}
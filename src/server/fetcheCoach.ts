import { IRegisterUser } from "@/interface/interface";
import { API } from "@/helpers/helper";


export const postSigupCoach = async (user: IRegisterUser) => {
    const response = await fetch(`${API}/auth/signupentrenador`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    // const data = await response.json();
    const data = 'usuario creado'
    console.log(data);

    return data;
};

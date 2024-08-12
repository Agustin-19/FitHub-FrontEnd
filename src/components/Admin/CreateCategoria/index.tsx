import { createCategory } from "@/server/fetchAmin";
import { useState } from "react"

const CrearCategoria = () => {
    const [cat, setCat] = useState({ name: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setCat((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // enviar categoria al backend

        try {
            const response = await createCategory(cat);
        } catch (error) {
            alert("Error al crear la actividad");
            console.error("Error:", error);
        }
    };
    return (
        <div>
            <form className="flex flex-col w-full p-4 border border-red-100" onSubmit={handleSubmit}>
                <h1
                    id="login-title"
                    className="text-2xl text-[#FF3E1A] font-extrabold text-center mb-10"
                >
                    Crear Categoria
                </h1>
                <label id="login-lable" className="text-[#97D6DF]" htmlFor="name">
                    Nueva Categoria:
                </label>
                <input
                    className=''
                    type="text"
                    id="name"
                    value={cat.name}
                    onChange={handleChange}
                />
                <button className="m-3 boton" type="submit">Crear Categoría</button>
            </form>
        </div>
    )
}
export default CrearCategoria
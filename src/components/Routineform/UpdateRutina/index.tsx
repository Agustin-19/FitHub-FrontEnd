"use client";
import { IRutinaEjercicio } from "@/interface/interface";
import { Dificultad, ICategory } from "@/interface/plan.interface";
import { get_Category } from "@/server/fetchPlan";
import { get_Ejercicios, get_RutinaById, put_Rutina } from "@/server/fetchRoutines";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "../routine.module.css";
import { uploaFile } from "@/server/fetchFile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UpdateRutinaProps {
    id: string;
}

const UpdateRutina: React.FC<UpdateRutinaProps> = ({ id }) => {
    const router = useRouter();

    const [rutina, setRutina] = useState({
        name: "",
        descripcion: "",
        category: [] as string[],
        exercise: [] as string[],
        difficultyLevel: "" as Dificultad | "",
        price: "",
        imgUrl:"",
    });

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [ejercicios, setEjercicio] = useState<IRutinaEjercicio[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Fetch existing rutina data
                if (id) {
                    const rutinaData = await get_RutinaById(id);
                    setRutina({
                        name: rutinaData.name,
                        descripcion: rutinaData.description,
                        category: rutinaData.category.map(cat => cat.id),
                        exercise: rutinaData.exercise.map(ej => ej.id).filter(Boolean) as string[],
                        difficultyLevel: rutinaData.difficultyLevel,
                        price: rutinaData.price?.toString() || "",
                        imgUrl: rutinaData.imgUrl || "",
                    });
                }

                // Fetch categories and exercises
                const [categoriesData, ejerciciosData] = await Promise.all([
                    get_Category(),
                    get_Ejercicios(),
                ]);

                setCategories(categoriesData);
                setEjercicio(ejerciciosData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchInitialData();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setRutina((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleChangeSelectMultiple: React.ChangeEventHandler<HTMLSelectElement> = (
        event
    ) => {
        const { id, options } = event.target;
        const values = Array.from(options)
            .filter((option) => option.selected)
            .map((option) => option.value);

        setRutina((prevState) => ({
            ...prevState,
            [id]: values,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, files } = e.target;
        if (files && files.length > 0) {
            if (id === "imageFile") {
                setImageFile(files[0]);
            }
        }
    };

    const handleChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = (
        event
    ) => {
        const { id, value } = event.target;
        setRutina((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const {
            name,
            descripcion,
            exercise,
            difficultyLevel,
            category,
            price,
        } = rutina;

        if (!name || !descripcion || !exercise.length || !difficultyLevel || !category.length || !price) {
            alert("Por favor complete todos los campos obligatorios.");
            return;
        }

        try {
            let imageUrls = rutina.imgUrl;
            if (imageFile) {
                const uploadedUrls = await uploaFile(imageFile);
                imageUrls = uploadedUrls[0];
            }

            const data = {
                name,
                description: descripcion,
                imgUrl: Array.isArray(imageUrls) ? imageUrls : [imageUrls],
                exercise,
                difficultyLevel,
                category,
                price: parseFloat(price),
            };

            console.log(JSON.stringify(data));
            

            if (id) {
                await put_Rutina(id, data);
                toast.success("Rutina actualizada exitosamente", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setTimeout(() => {
                    router.push("/dashboard");
                }, 3500);
            }
        } catch (error) {
            toast.error("Error al actualizar la rutina", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.error("Error al actualizar la rutina:", error);
        }
    };

    return (
        <div>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className="flex flex-col  justify-center items-center">
                        <h1
                            id="login-title"
                            className="text-5xl text-[#FF3E1A] font-extrabold text-center mb-10"
                        >
                            Actualizar Rutina
                        </h1>
                        <label className="text-[#97D6DF]" htmlFor="name">
                            Título:
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            id="name"
                            value={rutina.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col  justify-center items-center">
                        <label htmlFor="descripcion">Descripción:</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="descripcion"
                            value={rutina.descripcion}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col  justify-center items-center">
                        <label htmlFor="price">Precio: $</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="price"
                            value={rutina.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col  justify-center items-center">
                        <label htmlFor="exercise">Ejercicio:</label>
                        <select
                            id="exercise"
                            value={rutina.exercise}
                            onChange={handleChangeSelectMultiple}
                            className="daisy-select daisy-select-bordered w-full max-w-xs form-content bg-transparent  border-[#97D6DF] mb-5 mt-3"
                            multiple
                        >
                            {ejercicios.map((ejercicio) => (
                                <option key={ejercicio.id} value={ejercicio.id}>
                                    {ejercicio.titulo}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col  justify-center items-center">
                        <label htmlFor="difficultyLevel">Nivel de dificultad:</label>
                        <select
                            id="difficultyLevel"
                            value={rutina.difficultyLevel}
                            onChange={handleChangeSelect}
                            className="daisy-select daisy-select-bordered  max-w-xs form-content bg-transparent  border-[#97D6DF] mb-5 mt-3"
                        >
                            <option value="" disabled>
                                Selecciona
                            </option>
                            <option value="inicial">Inicial</option>
                            <option value="intermedio">Intermedio</option>
                            <option value="avanzado">Avanzado</option>
                            <option value="profesional">Profesional</option>
                        </select>
                    </div>

                    <div className="flex flex-col  justify-center items-center">
                        <label htmlFor="category">Categoría:</label>
                        <select
                            id="category"
                            value={rutina.category}
                            onChange={handleChangeSelectMultiple}
                            className="daisy-select daisy-select-bordered w-full max-w-xs form-content bg-transparent  border-[#97D6DF] mb-5 mt-3"
                            multiple
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col  justify-center items-center">
                        <label htmlFor="imageFile">Imagen:</label>
                        <input
                            className={styles.input}
                            type="file"
                            id="imageFile"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="flex justify-center">
                        <button className='boton m-4' type="submit">
                            Actualizar
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UpdateRutina;

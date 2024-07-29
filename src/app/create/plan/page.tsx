'use client';

import { ICategory } from '@/interface/plan.interface';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const CreatePlan: React.FC = () => {
    const router = useRouter();
    const token: string =
        (typeof window !== "undefined" && localStorage.getItem("token")) || "";

    const [plan, setPlan] = useState({
        name: '',
        descripcion: '',
        category: '',
        location: '',
        difficultyLevel: ''
    });

    // *************** CATEGORIAS ***********************
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3001/categorias');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }; fetchCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setPlan(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        // Aquí puedes acceder al valor seleccionado
        console.log(event.target.value);

        const { id, value } = event.target;
        setPlan(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { name, descripcion, location, difficultyLevel, category } = plan;

        if (!name) {
            alert("Por favor ingresa un título.");
            return;
        }
        if (!descripcion) {
            alert("Por favor ingresa una descripción.");
            return;
        }
        if (!location) {
            alert("Por favor ingresa una ubicación.");
            return;
        }
        if (!difficultyLevel) {
            alert("Por favor ingresa un nivel de dificultad.");
            return;
        }
        if (!category.length) {
            alert("Por favor selecciona una categoría.");
            return;
        }


        const Data = {
            name,
            description: descripcion,
            location,
            difficultyLevel,
            category: [category]
        };

        console.log(Data);




        try {
            const response = await fetch("http://localhost:3001/plan", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Data),
            });

            if (response.ok) {
                alert("Actividad creado exitosamente");
                router.push("/dashboard");
            } else {
                alert("Error al crear la actibidad");
                console.error("Error al crear la actividad");
            }
        } catch (error) {
            alert("Error al crear la actibidad");
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Título:</label>
                <input
                    type="text"
                    id="name"
                    value={plan.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="descripcion">Descripción:</label>
                <input
                    type="text"
                    id="descripcion"
                    value={plan.descripcion}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="location">Locacion:</label>
                <input
                    type="text"
                    id="location"
                    value={plan.location}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="difficultyLevel">Nivel de dificultad:</label>
                <select
                    id="difficultyLevel"
                    value={plan.difficultyLevel}
                    onChange={handleChangeSelect}
                    className="daisy-select daisy-select-bordered w-full max-w-xs"
                >
                    <option value='' disabled>Selecciona</option>
                    <option value='inicial'>Inicial</option>
                    <option value='intermedio'>Intermedio</option>
                    <option value='avanzado'>Avanzado</option>
                    <option value='profesional'>Profesional</option>
                </select>
            </div>

            <div>
                <label htmlFor="category">Categoría:</label>
                <select
                    id="category"
                    value={plan.category}
                    onChange={handleChangeSelect}
                    className="daisy-select daisy-select-bordered w-full max-w-xs"
                >
                    <option value='' disabled>Seleccionar Categoría</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit">Enviar</button>
        </form>
    );
};

export default CreatePlan;

'use client';

import { IRutinaEjercicio } from '@/interface/interface';
import { ICategory } from '@/interface/plan.interface';
import React, { useEffect, useState, useContext } from 'react';


const CreateRutina: React.FC = () => {

    const token: string =
        (typeof window !== "undefined" && localStorage.getItem("token")) || "";

    const [rutina, setRutina] = useState({
        name: '',
        descripcion: '',
        category: '',
        exercise: [] as string[],
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

    // ************** EJERCICIOS *******************
    const [ejercicios, setEjercicio] = useState<IRutinaEjercicio[]>([]);
    useEffect(() => {
        const fetchEjercicios = async () => {
            try {
                const response = await fetch('http://localhost:3001/ejercicio');
                const data = await response.json();
                setEjercicio(data);
            } catch (error) {
                console.error('Error fetching ejercicios:', error);
            }
        }; fetchEjercicios();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setRutina(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleChangeSelectMultiple: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        // Aquí puedes acceder al valor seleccionado
        const { id, options } = event.target;
        console.log(event.target.value);
        const values = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);

        setRutina(prevState => ({
            ...prevState,
            [id]: values
        }));
    };



    const handleChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        // Aquí puedes acceder al valor seleccionado
        console.log(event.target.value);

        const { id, value } = event.target;
        setRutina(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { name, descripcion, exercise, difficultyLevel, category } = rutina;

        if (!name) {
            alert("Por favor ingresa un título.");
            return;
        }
        if (!descripcion) {
            alert("Por favor ingresa una descripción.");
            return;
        }
        if (!exercise.length) {
            alert("Por favor selecciona al menos un ejercicio.");
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
            admin: 'efdc58a4-d08d-4143-a546-513e85155c1a',
            exercise,
            difficultyLevel,
            category: [category]
        };

        console.log(Data);

        try {
            const response = await fetch('http://localhost:3001/rutina', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Data)
            });

            if (response.ok) {
                console.log("rutina creado exitosamente");
            } else {
                console.error("Error al crear el rutina");
            }
        } catch (error) {
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
                    value={rutina.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="descripcion">Descripción:</label>
                <input
                    type="text"
                    id="descripcion"
                    value={rutina.descripcion}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="exercise">Ejercicio:</label>
                <select
                    id="exercise"
                    value={rutina.exercise}
                    onChange={handleChangeSelectMultiple}
                    className="daisy-select daisy-select-bordered w-full max-w-xs"
                    multiple
                >
                    {ejercicios.map(ejercicio => (
                        <option key={ejercicio.id} value={ejercicio.id}>
                            {ejercicio.titulo}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="difficultyLevel">Nivel de dificultad:</label>
                <select
                    id="difficultyLevel"
                    value={rutina.difficultyLevel}
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
                    value={rutina.category}
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

export default CreateRutina;

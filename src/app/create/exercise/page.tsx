'use client';

import { ICategory } from '@/interface/plan.interface';
import React, { useEffect, useState } from 'react';

const CreateExercise: React.FC = () => {

    const token: string =
        (typeof window !== "undefined" && localStorage.getItem("token")) || "";

    const [ejercicio, setEjercicio] = useState({
        titulo: '',
        descripcion: '',
        imgUrl: [''] // Ahora es un string que almacenará la URL del archivo
    });

    const [files, setFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setEjercicio(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { titulo, descripcion } = ejercicio;

        if (!titulo) {
            alert("Por favor ingresa un título.");
            return;
        }
        if (!descripcion) {
            alert("Por favor ingresa una descripción.");
            return;
        }
        if (!files) {
            alert("Por favor selecciona un archivo primero.");
            return;
        }

        console.log(files);

        // Primero, sube el archivo para obtener una URL
        const formData = new FormData();
        formData.append('files', files);

        const uploadResponse = await fetch('http://localhost:3001/files', {
            method: 'POST',
            body: formData
        });

        console.log(uploadResponse);

        if (!uploadResponse.ok) {
            console.error('Error al subir el archivo');
            return;
        }

        const fileUrl = await uploadResponse.json();

        // Construye el objeto Ejercicio para mostrar en la consola
        const ejercicioData = {
            titulo,
            descripcion,
            imgUrl: fileUrl
        };

        // Mostrar el objeto Ejercicio en la consola
        console.log('Ejercicio Data:', ejercicioData);
        try {
            const response = await fetch('http://localhost:3001/ejercicio', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ejercicioData)
            });

            if (response.ok) {
                console.log("Ejercicio creado exitosamente");
            } else {
                console.error("Error al crear el ejercicio");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="titulo">Título:</label>
                <input
                    type="text"
                    id="titulo"
                    value={ejercicio.titulo}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="descripcion">Descripción:</label>
                <input
                    type="text"
                    id="descripcion"
                    value={ejercicio.descripcion}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="file">Archivo:</label>
                <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                />
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
};

export default CreateExercise;

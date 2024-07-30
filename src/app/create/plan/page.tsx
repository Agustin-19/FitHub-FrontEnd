"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CreatePlan: React.FC = () => {
  const [plan, setPlan] = useState({
    name: "",
    descripcion: "",
    category: "",
    location: "",
    difficultyLevel: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPlan((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const { id, value } = event.target;
    setPlan((prevState) => ({
      ...prevState,
      [id]: value,
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
      category: ["118fae60-40a3-4514-b603-b5b6541a4354"],
    };

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvcnJlb0BtYWlsLmNvbSIsInN1YiI6IjJhMzU1NTMzLTQ3ZDUtNGU2Mi1iYzk1LWQ4OGIxZjBhZDA2MSIsInJvbGUiOiJlbnRyZW5hZG9yIiwiaWF0IjoxNzIyMjU2OTYyLCJleHAiOjE3MjIyNjA1NjJ9.GsL1E0hyp5h6On8Xy-yb4-9qEj7oPfles9umzN7gTAY";
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
    <div>
      <Link href="/dashboard">
        <button className="mt-4 mb-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
          Volver
        </button>
      </Link>
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
            <option value="" disabled>
              Selecciona
            </option>
            <option value="inicial">Inicial</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
            <option value="profesional">Profesional</option>
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
            <option value="" disabled>
              Seleccionar Categoría
            </option>
            <option value="1">Fulbo</option>
            <option value="2">Voley</option>
            <option value="3">Hockey</option>
            <option value="4">Correr</option>
          </select>
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default CreatePlan;

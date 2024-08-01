"use client";
import { useEffect, useState } from "react";
import styles from "./planform.module.css";
import { ICategory } from "@/interface/plan.interface";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { get_Category } from "@/server/fetchPlan";

export default function Plan() {
  const router = useRouter();
  const token: string =
    (typeof window !== "undefined" && localStorage.getItem("token")) || "";

  const [plan, setPlan] = useState({
    name: "",
    descripcion: "",
    category: "",
    location: "",
    difficultyLevel: "",
    name: "",
    descripcion: "",
    category: "",
    location: "",
    difficultyLevel: "",
    price: "",
  });

  // *************** CATEGORIAS ***********************
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/categorias");
        const data = await response.json();
        const data = await get_Category();

        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPlan((prevState) => ({
    setPlan((prevState) => ({
      ...prevState,
      [id]: value,
      [id]: value,
    }));
  };

  const handleChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
  const handleChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    // Aquí puedes acceder al valor seleccionado
    console.log(event.target.value);

    const { id, value } = event.target;
    setPlan((prevState) => ({
    setPlan((prevState) => ({
      ...prevState,
      [id]: value,
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
      category: [category],
      category: [category],
      price: 0,
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
    <div className={styles.container}>
      <Link href="/dashboard">
        <button className="mt-4 relative z-[2] rounded-full  top-2 border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
          Volver
        </button>
      </Link>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="uppercase text-3xl text-[#97D6DF] font-extrabold text-center ">
          Crear Plan
        </h1>
        <label id="login-lable" className="text-[#97D6DF]" htmlFor="name">
          Título:
        </label>
        <input
          className={styles.input}
          type="text"
          id="name"
          value={plan.name}
          onChange={handleChange}
        />
        <label
          id="login-lable"
          className="text-[#97D6DF]"
          htmlFor="descripcion"
        >
        <label id="login-lable" htmlFor="name">
          Precio:
        </label>
        <input
          className="form-content"
          type="text"
          id="price"
          value={plan.price}
          onChange={handleChange}
        />
        <label id="login-lable" htmlFor="descripcion">
          Descripción:
        </label>
        <input
          className={styles.input}
          type="text"
          id="descripcion"
          value={plan.descripcion}
          onChange={handleChange}
        />
        <label className="text-[#97D6DF]" id="login-lable" htmlFor="location">
          Locacion:
        </label>
        <input
          className={styles.input}
          type="text"
          id="location"
          value={plan.location}
          onChange={handleChange}
        />

        <label
          className="text-[#97D6DF]"
          id="login-lable"
          htmlFor="difficultyLevel"
        >
          Nivel de dificultad:
        </label>
        <select
          id="difficultyLevel"
          value={plan.difficultyLevel}
          onChange={handleChangeSelect}
          className="daisy-select border-[#FF3E1A] border-2 bg-transparent w-full max-w-xs "
        >
          <option value="" disabled>
            Selecciona
          </option>
          <option value="inicial">Inicial</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
          <option value="profesional">Profesional</option>
        </select>

        <label htmlFor="category" className="text-[#97D6DF] ">
          Categoría:
        </label>
        <select
          id="category"
          value={plan.category}
          onChange={handleChangeSelect}
          className="daisy-select border-[#FF3E1A] border-2 bg-transparent w-full max-w-xs "
        >
          <option value="" disabled className="text-[#97D6DF]">
            Seleccionar Categoría
          </option>
          {categories.map((category) => (
          <option value="" disabled>
            Seleccionar Categoría
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button
          className="mt-4 relative z-[2] rounded-full  top-2 border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

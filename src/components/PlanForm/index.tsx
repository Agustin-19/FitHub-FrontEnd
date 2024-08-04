"use client";
import { useEffect, useState } from "react";
import styles from "./planform.module.css";
import { ICategory } from "@/interface/plan.interface";
import { useRouter } from "next/navigation";
import { get_Category } from "@/server/fetchPlan";
import Link from "next/link";

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
    price: "",
    imgUrl: "",
  });

  // *************** CATEGORIAS ***********************
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await get_Category();

        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

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
    // Aquí puedes acceder al valor seleccionado
    console.log(event.target.value);

    const { id, value } = event.target;
    setPlan((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      name,
      descripcion,
      location,
      difficultyLevel,
      category,
      price,
      imgUrl,
    } = plan;

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
    if (!price) {
      alert("Por favor ingresa un precio.");
      return;
    }
    if (!imgUrl) {
      alert("Por favor ingresa una imagen.");
      return;
    }

    const Data = {
      name,
      description: descripcion,
      location,
      difficultyLevel,
      category: [category],
      price: 0,
      imgUrl,
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
        alert("Error al crear la actividad");
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
        <button className="mt-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
          Volver
        </button>
      </Link>
      <div id="Container" className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1
            id="login-title"
            className="text-5xl text-[#FF3E1A] font-extrabold text-center mb-10"
          >
            Crear Actividad
          </h1>
          <label id="login-lable" className="text-[#97D6DF] " htmlFor="name">
            Título:
          </label>
          <input
            className={styles.input}
            type="text"
            id="name"
            value={plan.name}
            onChange={handleChange}
          />
          <label id="login-lable" htmlFor="name">
            Precio:
          </label>
          <input
            className={styles.input}
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
          <label id="login-lable" htmlFor="location">
            Locacion:
          </label>
          <input
            className={styles.input}
            type="text"
            id="location"
            value={plan.location}
            onChange={handleChange}
          />
          <label id="login-lable" htmlFor="difficultyLevel">
            Nivel de dificultad:
          </label>
          <select
            id="difficultyLevel"
            value={plan.difficultyLevel}
            onChange={handleChangeSelect}
            className="daisy-select daisy-select-bordered w-full max-w-xs form-content bg-transparent  border-[#97D6DF] mb-5 mt-3"
          >
            <option value="" disabled>
              Selecciona
            </option>
            <option value="inicial">Inicial</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
            <option value="profesional">Profesional</option>
          </select>

          <label htmlFor="category">Categoría:</label>
          <select
            id="category"
            value={plan.category}
            onChange={handleChangeSelect}
            className="daisy-select daisy-select-bordered w-full max-w-xs form-content bg-transparent  border-[#97D6DF] mb-2 mt-5"
          >
            <option value="" disabled>
              Seleccionar Categoría
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <br></br>
          <label id="login-lable" className="text-[#97D6DF] " htmlFor="name">
            Sube Una Imagen Para El Plan:
          </label>
          <input
            className={styles.input}
            type="file"
            id="imgUrl"
            onChange={handleChange}
          />
          <div className="flex justify-center">
            <button type="submit" className={styles.button}>
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

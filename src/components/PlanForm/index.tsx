"use client";
import { useEffect, useState } from "react";
import styles from "./planform.module.css";
import { ICategory } from "@/interface/plan.interface";
import { useRouter } from "next/navigation";
import { createPlan, get_Category } from "@/server/fetchPlan";
import Link from "next/link";
import { uploaFile } from "@/server/fetchFile"; // Asegúrate de que esta función esté implementada

export default function Plan() {
  const router = useRouter();
  const token: string = (typeof window !== "undefined" && localStorage.getItem("token")) || "";

  const [plan, setPlan] = useState({
    name: "",
    descripcion: "",
    category: "",
    location: "",
    difficultyLevel: "",
    price: "",
  });

  // *************** CATEGORIAS ***********************
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [file, setFile] = useState<File | null>(null);

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

  const handleChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { id, value } = event.target;
    setPlan((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, descripcion, location, difficultyLevel, category, price } = plan;

    if (!name || !descripcion || !location || !difficultyLevel || !category || !price || !file) {
      alert("Por favor, completa todos los campos y sube una imagen.");
      return;
    }

    try {
      // Subir el archivo y obtener la URL
      const fileUrl: string = await uploaFile(file);

      const Data = {
        name,
        description: descripcion,
        location,
        difficultyLevel,
        category: [category],
        price: parseFloat(price),
        imgUrl: [fileUrl],
      };

      const response = await createPlan(Data, token);
      if (response.ok) {
        alert("Actividad creada exitosamente");
        router.push("/dashboard");
      } else {
        alert("Error al crear la actividad");
        console.error("Error:", response.text);
      }

    } catch (error) {
      alert("Error al crear la actividad");
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
          <h1 id="login-title" className="text-5xl text-[#FF3E1A] font-extrabold text-center mb-10">
            Crear Actividad
          </h1>
          <label id="login-lable" className="text-[#97D6DF]" htmlFor="name">
            Título:
          </label>
          <input className={styles.input} type="text" id="name" value={plan.name} onChange={handleChange} />
          <label id="login-lable" htmlFor="price">
            Precio:
          </label>
          <input className={styles.input} type="text" id="price" value={plan.price} onChange={handleChange} />
          <label id="login-lable" htmlFor="descripcion">
            Descripción:
          </label>
          <input className={styles.input} type="text" id="descripcion" value={plan.descripcion} onChange={handleChange} />
          <label id="login-lable" htmlFor="location">
            Locacion:
          </label>
          <input className={styles.input} type="text" id="location" value={plan.location} onChange={handleChange} />
          <label id="login-lable" htmlFor="difficultyLevel">
            Nivel de dificultad:
          </label>
          <select id="difficultyLevel" value={plan.difficultyLevel} onChange={handleChangeSelect} className="daisy-select daisy-select-bordered w-full max-w-xs form-content bg-transparent border-[#97D6DF] mb-5 mt-3">
            <option value="" disabled>
              Selecciona
            </option>
            <option value="inicial">Inicial</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
            <option value="profesional">Profesional</option>
          </select>
          <label htmlFor="category">Categoría:</label>
          <select id="category" value={plan.category} onChange={handleChangeSelect} className="daisy-select daisy-select-bordered w-full max-w-xs form-content bg-transparent border-[#97D6DF] mb-2 mt-5">
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
          <label id="login-lable" className="text-[#97D6DF]" htmlFor="file">
            Sube Una Imagen Para El Plan:
          </label>
          <input className={styles.input} type="file" id="file" onChange={handleFileChange} />
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

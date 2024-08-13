"use client";
import { IRutinaEjercicio } from "@/interface/interface";
import { Dificultad, ICategory } from "@/interface/plan.interface";
import { get_Category } from "@/server/fetchPlan";
import { create_Rutina, get_Ejercicios } from "@/server/fetchRoutines";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import styles from "./routine.module.css";
import { uploaFile } from "@/server/fetchFile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateRutina: React.FC = () => {
  const router = useRouter();
  const [rutina, setRutina] = useState({
    name: "",
    descripcion: "",
    category: [] as string[],
    exercise: [] as string[],
    difficultyLevel: "" as Dificultad | "",
    price: "",
    admin: "",
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

  // ************** EJERCICIOS *******************
  const [ejercicios, setEjercicio] = useState<IRutinaEjercicio[]>([]);
  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const data = await get_Ejercicios();
        setEjercicio(data);
      } catch (error) {
        console.error("Error fetching ejercicios:", error);
      }
    };
    fetchEjercicios();
  }, []);

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

  const [imageFile, setImageFile] = useState<File | null>(null);

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
    if (!imageFile) {
      alert("Por favor selecciona una imagen primero.");
      return;
    }

    try {
      const imageUrls: string[] = await uploaFile(imageFile);

      const data = {
        name,
        description: descripcion,
        imgUrl: imageUrls,
        exercise,
        difficultyLevel,
        category,
        price: parseFloat(rutina.price),
      };

      await create_Rutina(data);
      toast.success("Rutina creada exitosamente", {
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
        router.push("/dashboard/create");
      }, 3500);
    } catch (error) {
      toast.error("Error al crear la rutina", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Error al crear la rutina:", error);
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
              Crear Rutina
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
            <label htmlFor="name">Precio: $</label>
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
            <button className={styles.button} type="submit">
              Cargar rutina
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateRutina;

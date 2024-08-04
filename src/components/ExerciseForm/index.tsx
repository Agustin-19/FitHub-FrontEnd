"use client";
import { useState } from "react";
import styles from "./exerciseform.module.css";
import { useRouter } from "next/navigation";
import { uploaFile } from "@/server/fetchFile";
import { createExercise } from "../../server/fetchRoutines";
import Link from "next/link";

export default function ExerciseForm() {
  const router = useRouter();
  const [ejercicio, setEjercicio] = useState({
    titulo: "",
    descripcion: "",
    imgUrl: [""], // Ahora es un string que almacenará la URL del archivo
  });

  const [files, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEjercicio((prevState) => ({
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

    try {
      // Primero, sube el archivo para obtener una URL
      const fileUrl: string[] = await uploaFile(files);

      const ejercicioData = {
        titulo,
        descripcion,
        imgUrl: fileUrl,
      };

      console.log(ejercicioData);

      // Luego, crea el ejercicio con la URL del archivo
      await createExercise(ejercicioData);
      router.push("/dashboard");
    } catch (error) {
      return "error al subir el archivo";
    }
  };

  return (
    <div>
      <Link href="/dashboard">
        <button className="mt-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
          Volver
        </button>
      </Link>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1
            id="login-title"
            className="text-4xl text-[#FF3E1A] font-extrabold text-center mb-10"
          >
            Crear Ejercicio
          </h1>
          <label id="login-lable" className="text-[#97D6DF] " htmlFor="name">
            Título:
          </label>
          <input
            className={styles.input}
            type="text"
            id="titulo"
            value={ejercicio.titulo}
            onChange={handleChange}
          />
          <label id="login-lable" className="text-[#97D6DF] " htmlFor="name">
            Descripción:
          </label>
          <input
            className={styles.input}
            type="text"
            id="descripcion"
            value={ejercicio.descripcion}
            onChange={handleChange}
          />
          <label id="login-lable" className="text-[#97D6DF] " htmlFor="name">
            Sube Tu Ejercicio Aqui:
          </label>
          <input
            className={styles.input}
            type="file"
            id="file"
            onChange={handleFileChange}
          />
          <div className="flex justify-center">
            <button className={styles.button} type="submit">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

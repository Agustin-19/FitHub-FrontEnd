"use client";
import { useState } from "react";
import styles from "./exerciseform.module.css";
import { useRouter } from "next/navigation";
import { uploaFile } from "@/server/fetchFile";
import { createExercise } from '../../server/fetchRoutines';

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
      const fileUrl: string[] = await uploaFile(files)

      const ejercicioData = {
        titulo,
        descripcion,
        imgUrl: fileUrl,
      };
      
      console.log(ejercicioData);
      
      // Luego, crea el ejercicio con la URL del archivo
      await createExercise(ejercicioData)
      router.push("/dashboard");
    } catch (error) {
      return 'error al subir el archivo';
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          placeholder="Titulo"
          className={styles.input}
          type="text"
          id="titulo"
          value={ejercicio.titulo}
          onChange={handleChange}
        />
        <input
          placeholder="Descripción"
          className={styles.input}
          type="text"
          id="descripcion"
          value={ejercicio.descripcion}
          onChange={handleChange}
        />

        <input
          className={styles.input}
          type="file"
          id="file"
          onChange={handleFileChange}
        />
        <button className={styles.button} type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}

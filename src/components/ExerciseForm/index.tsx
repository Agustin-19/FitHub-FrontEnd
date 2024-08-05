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
    imgUrl: [""], 
    videoUrl: ""
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEjercicio((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target;
    if (files && files.length > 0) {
      if (id === "imageFile") {
        setImageFile(files[0]);
      } else if (id === "videoFile") {
        setVideoFile(files[0]);
      }
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
    if (!imageFile) {
      alert("Por favor selecciona una imagen primero.");
      return;
    }
    
    try {
      let videoUrl = "";
      if (videoFile) {
        // Primero, sube el video para obtener una URL
        const videoUrls = await uploaFile(videoFile);
        videoUrl = videoUrls[0];
      }

      // Luego, sube la imagen para obtener una URL
      const imageUrls = await uploaFile(imageFile);
      const imgUrl = imageUrls[0];

      const ejercicioData = {
        titulo,
        descripcion,
        imgUrl: [imgUrl],
        videoUrl,
      };

      console.log(ejercicioData);

      // Luego, crea el ejercicio con la URL del archivo
      await createExercise(ejercicioData);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error al subir el archivo", error);
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
          <label id="login-lable" className="text-[#97D6DF] " htmlFor="titulo">
            Título:
          </label>
          <input
            className={styles.input}
            type="text"
            id="titulo"
            value={ejercicio.titulo}
            onChange={handleChange}
          />
          <label id="login-lable" className="text-[#97D6DF] " htmlFor="descripcion">
            Descripción:
          </label>
          <input
            className={styles.input}
            type="text"
            id="descripcion"
            value={ejercicio.descripcion}
            onChange={handleChange}
          />
          <label id="login-lable" className="text-[#97D6DF] " htmlFor="videoFile">
            Sube Tu Video Aqui (opcional):
          </label>
          <input
            className={styles.input}
            type="file"
            id="videoFile"
            onChange={handleFileChange}
          />
          <label id="login-lable" className="text-[#97D6DF] " htmlFor="imageFile">
            Sube Tu Imagen Aqui:
          </label>
          <input
            className={styles.input}
            type="file"
            id="imageFile"
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

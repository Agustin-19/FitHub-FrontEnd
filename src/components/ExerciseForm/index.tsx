"use client";
import { useState } from "react";
import styles from "./exerciseform.module.css";
import { useRouter } from "next/navigation";
import { uploaFile } from "@/server/fetchFile";
import { createExercise } from "../../server/fetchRoutines";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ExerciseForm() {
  const router = useRouter();
  const [ejercicio, setEjercicio] = useState({
    titulo: "",
    descripcion: "",
    imgUrl: [""],
    videoUrl: "",
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
      toast.error("Por favor ingresa un título.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (!descripcion) {
      toast.error("Por favor ingresa una descripción.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (!imageFile) {
      toast.error("Por favor selecciona una imagen primero.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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

      // Luego, crea el ejercicio con la URL del archivo
      await createExercise(ejercicioData);

      toast.success("Ejercicio creado exitosamente", {
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
      toast.error("Error al subir el archivo", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Error al subir el archivo", error);
    }
  };

  return (
    <div>
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
          <label
            id="login-lable"
            className="text-[#97D6DF] "
            htmlFor="descripcion"
          >
            Descripción:
          </label>
          <input
            className={styles.input}
            type="text"
            id="descripcion"
            value={ejercicio.descripcion}
            onChange={handleChange}
          />
          <label
            id="login-lable"
            className="text-[#97D6DF] "
            htmlFor="videoFile"
          >
            Sube Tu Video Aqui (opcional):
          </label>
          <input
            className={styles.input}
            type="file"
            id="videoFile"
            onChange={handleFileChange}
          />
          <label
            id="login-lable"
            className="text-[#97D6DF] "
            htmlFor="imageFile"
          >
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
      <ToastContainer />
    </div>
  );
}

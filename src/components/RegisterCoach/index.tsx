"use client";

import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/userContext";
import { uploaFile, uploaFilePdf } from "@/server/fetchFile";
import { postCoach } from "@/server/fetcheCoach";
import styles from "../../components/PlanForm/planform.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function RegisterCoachComponent() {
  const router = useRouter();
  const { isLogged, user, setUser } = useContext(UserContext);

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isLogged) {
      router.push("/login");
    }
  }, [isLogged, router]);

  if (!isLogged) {
    return null;
  }

  const role = user?.role;

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (e.target.files) {
      if (type === "pdf") {
        setPdfFile(e.target.files[0]);
      } else if (type === "video") {
        setVideoFile(e.target.files[0]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (role !== "user") return;

    if (!pdfFile || !videoFile) {
      alert("Por favor selecciona tanto el archivo PDF como el video.");
      return;
    }

    try {
      //   // Subir video
      const videoResponse = await uploaFile(videoFile);

      console.log(videoResponse);

      // Subir PDF
      const pdfResponse = await uploaFilePdf(pdfFile);

      const coachData = {
        cvvideo: videoResponse[0],
        cvpdf: pdfResponse[0],
      };

      // Usar postCoach para la última solicitud
      const response = await postCoach(coachData);

      if (response.ok) {
        toast.success("Tus archivos fueron enviados, se te enviara un email", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/home");
      } else {
        toast.error("Error, Revisa los archivos e intentalo nuevamente", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div id="Container" className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className="text-5xl text-[#FF3E1A] font-extrabold text-center mb-10">
          Registro de Entrenador
        </h1>
        <label htmlFor="pdfFile" className="text-[#97D6DF]">
          Por favor, carga tu CV en PDF:
          <input
            type="file"
            id="pdfFile"
            onChange={(e) => handleFileChange(e, "pdf")}
            className={styles.input}
          />
        </label>
        <label htmlFor="videoFile" className="text-[#97D6DF]">
          Sube tu video aquí:
          <input
            type="file"
            id="videoFile"
            onChange={(e) => handleFileChange(e, "video")}
            className={styles.input}
          />
        </label>
        <div className="flex justify-center">
          <button type="submit" className={styles.button}>
            Guardar cambios
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

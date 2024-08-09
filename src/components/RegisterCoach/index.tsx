"use client";

import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/userContext";
import { uploaFile, uploaFilePdf } from "@/server/fetchFile";
import { postCoach } from "@/server/fetcheCoach";

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
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

    console.log(videoFile);
    

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

      if (response) {
        alert("Role actualizado a coach.");
      } else {
        alert("Error al actualizar el role.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="z-10 flex flex-col gap-4 bg-[#1A1D1A] p-8 rounded-lg w-full max-w-md"
      >
        <h1 className="text-[#FF3E1A] text-2xl mb-4 text-center">Registrar Entrenador</h1>
        <label htmlFor="pdfFile" className="text-[#97D6DF]">
          Por favor, carga tu CV en PDF:
          <input
            type="file"
            id="pdfFile"
            onChange={(e) => handleFileChange(e, "pdf")}
            className="mt-2 p-2 rounded border border-[#447988] bg-transparent text-[#97D6DF] w-full"
          />
        </label>
        <label htmlFor="videoFile" className="text-[#97D6DF]">
          Sube tu video aquí:
          <input
            type="file"
            id="videoFile"
            onChange={(e) => handleFileChange(e, "video")}
            className="mt-2 p-2 rounded border border-[#447988] bg-transparent text-[#97D6DF] w-full"
          />
        </label>
        <button
          type="submit"
          className="mt-4 bg-[#FF3E1A] text-white rounded py-2 hover:bg-[#FF5722] transition duration-150"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}

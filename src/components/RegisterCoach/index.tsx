"use client";

import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/userContext";

export function RegisterCoachComponent() {
  const router = useRouter();
  const { isLogged, user, setUser } = useContext(UserContext);
  // as {
  //   isLogged: boolean;
  //   user: {
  //     login: boolean;
  //     token: string;
  //     user: { role: string } | null;
  //   } | null;
  //   setUser: (user: any) => void;
  // };

  console.log(user);

  const [activity, setActivity] = useState("");
  const [files, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isLogged) {
      router.push("/login");
    }
  }, [isLogged, router]);

  if (!isLogged) {
    return null;
  }

  const role = user?.role;

  console.log("1 User role from context:", role);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (role !== "user") return;

    if (!activity) {
      alert("Por favor ingresa una actividad.");
      return;
    }

    if (!files) {
      alert("Por favor selecciona un archivo primero.");
      return;
    }

    const formData = new FormData();
    formData.append("files", files);

    const uploadResponse = await fetch("http://localhost:3001/files", {
      method: "POST",
      body: formData,
    });

    console.log(uploadResponse);

    if (!uploadResponse.ok) {
      console.error("Error al subir el archivo");
      return;
    }

    const fileUrl = await uploadResponse.json();

    console.log(fileUrl);

    const coachData = {
      activity,
      imgUrl: fileUrl,
    };

    try {
      const response = await fetch(
        "http://localhost:3001/auth/signupentrenador",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify(coachData),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUser((prev: any) => ({
          ...prev,
          user: { ...prev.user, role: "coach", activity },
        }));
        alert("Role actualizado a coach.");
      } else {
        alert("Error al actualizar el role.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  console.log("2 User role from context:", role);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 bg-[#1A1D1A] p-4 rounded-lg"
    >
      <h1 className="text-[#FF3E1A] text-2xl">Registrar Entrenador</h1>
      <label className="text-[#97D6DF]">
        Actividad:
        <input
          type="text"
          id="activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="mt-1 p-2 rounded border border-[#447988] bg-transparent text-[#97D6DF]"
        />
      </label>
      <label htmlFor="files" className="text-[#97D6DF]">
        Por favor, cargar tu CV:
        <input
          type="file"
          id="files"
          onChange={handleFileChange}
          className="mt-1 p-2 rounded border border-[#447988] bg-transparent text-[#97D6DF]"
        />
      </label>
      <button
        type="submit"
        className="mt-4 bg-[#FF3E1A] text-white rounded py-2 hover:bg-[#FF5722] transition duration-150"
      >
        Guardar cambios
      </button>
    </form>
  );
}

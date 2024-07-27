"use client";

import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/userContext";

export function RegisterCoachComponent() {
  const router = useRouter();
  const { isLogged, user, setUser } = useContext(UserContext) as {
    isLogged: boolean;
    user: {
      login: boolean;
      token: string;
      user: { role: string } | null;
    } | null;
    setUser: (user: any) => void;
  };

  const [activity, setActivity] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isLogged) {
      router.push("/login");
    }
  }, [isLogged, router]);

  if (!isLogged) {
    return null;
  }

  const role = user?.user?.role;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (role !== "user") return;

    const formData = new FormData();
    formData.append("activity", activity);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch("http://localhost:3001/auth/signupentrenador", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      });

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

  console.log("User role from context:", role);

  return (
    <div>
      {role === "user" ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <h1>Register Coach</h1>
          <label>
            Actividad:
            <input
              type="text"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            />
          </label>
          <label>
            Cargar archivo:
            <input type="file" onChange={handleFileChange} />
          </label>
          <button type="submit">Guardar cambios</button>
        </form>
      ) : role === "coach" ? (
        <h1>Ya se encuentra registrado como entrenador</h1>
      ) : null}
    </div>
  );
}

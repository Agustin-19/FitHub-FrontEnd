"use client";

import CoachList from "../../components/CoachList/index";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();
  const { isLogged } = useContext(UserContext);

  useEffect(() => {
    if (!isLogged) {
      router.push("/login");
    }
  }, [isLogged, router]);

  return (
    <div className="text-black bg-gray-100">
      <h1>Admin</h1>
      <p> Debe controlar las actividades, rutinas, entrenadores, usuarios</p>
      {/* users */}
      <CoachList />
      {/* activities */}
      {/* routines */}
    </div>
  );
}

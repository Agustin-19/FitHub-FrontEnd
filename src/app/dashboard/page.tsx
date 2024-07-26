"use client";

import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import CoachDashboard from "@/components/CoachDashboard";
import UserDashboard from "@/components/UserDashboard";

export default function Dashboard() {
  const router = useRouter();
  const { isLogged, user } = useContext(UserContext) as {
    isLogged: boolean;
    user: { role: string } | null;
  };

  if (!isLogged) {
    router.push("/login");
  }

  return (
    <div className="text-black bg-gray-100">
      <h1>Bienvenido al Dashboard</h1>
      <CoachDashboard />
      <UserDashboard />
      <p>Rol no reconocido.</p>
    </div>
  );
}

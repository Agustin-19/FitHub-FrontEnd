"use client";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import CoachDashboard from "@/components/CoachDashboard";
import UserDashboard from "@/components/UserDashboard";

export default function Dashboard() {
  const router = useRouter();
  const { isLogged } = useContext(UserContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!isLogged) {
      router.push("/login");
    }
  }, [isLogged, router]);

  if (!isLogged) {
    return null;
  }

  const role = user?.role;

  return (
    <div>
      {role === "user" ? (
        <UserDashboard />
      ) : role === "entrenador" ? (
        <CoachDashboard />
      ) : (
        <p>Rol no reconocido.</p>
      )}
    </div>
  );
}

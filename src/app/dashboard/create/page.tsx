"use client";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import CoachDashboard from "@/components/Coach/CoachDashboard";
import UserDashboard from "@/components/UserDashboard";
import Create from "@/components/Coach/Cards/create";

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
    <div className="z-10 relative">
      {role === "entrenador" ? <Create /> : <p>Rol no reconocido.</p>}
    </div>
  );
}

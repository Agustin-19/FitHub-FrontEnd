"use client";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import CardTable from "@/components/Coach/Cards/cardtable";

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
      {role === "entrenador" ? <CardTable /> : <p>Rol no reconocido.</p>}
    </div>
  );
}

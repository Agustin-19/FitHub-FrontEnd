"use client";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import CoachDashboard from "@/components/Coach/CoachDashboard";
import UserDashboard from "@/components/UserDashboard";
import Create from "@/components/Coach/Cards/create";
import CardStats from "@/components/Coach/Cards/cardstates";
import NewUsers from "@/components/Coach/Cards/newUsers";
import CardSales from "@/components/Coach/Cards/sales";

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
      <div className=" absolute flex justify-center top-[50px] ml-[500px] p-5 gap-4">
        <div>
          <CardStats />
        </div>
        <div>
          <NewUsers />
        </div>
        <div>
          <CardSales />
        </div>
      </div>
      {role === "entrenador" ? <Create /> : <p>Rol no reconocido.</p>}
    </div>
  );
}

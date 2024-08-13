"use client";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

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

  const role = user?.role;

  return (
    <div className="z-10 relative">
      <div className=" absolute flex justify-center top-[50px] ml-[500px] p-5 gap-4"></div>
      {role === "entrenador" ? <Create /> : <p>Rol no reconocido.</p>}
    </div>
  );
}

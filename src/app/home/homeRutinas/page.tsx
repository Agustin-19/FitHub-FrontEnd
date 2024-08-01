"use client";

import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import HomeUserRutina from "@/components/Home/HomeUser/indexRutina";
export default function Home() {
  const router = useRouter();
  const { isLogged } = useContext(UserContext);

  if (!isLogged) {
    router.push("/login");
  }
  return (
    <div>
      <HomeUserRutina />
    </div>
  );
}

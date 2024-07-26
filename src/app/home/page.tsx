"use client";
import HomeUser from "@/components/Home";

import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const { isLogged } = useContext(UserContext);

  if (!isLogged) {
    router.push("/login");
  }
  return (
    <div>
      <HomeUser />
    </div>
  );
}

"use client";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { isLogged } = useContext(UserContext);

  if (!isLogged) {
    router.push("/login");
  }
  return (
    <div className=" text-black bg-gray-100">
      <h1>es entrenador o usuario?</h1>
      <p> si entrenador llamamos al componente CoachDAshboard </p>
      <p> si usuario llamamos al componente UserDAshboard </p>
    </div>
  );
}

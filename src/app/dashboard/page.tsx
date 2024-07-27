"use client";

import { useContext, useEffect } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import CoachDashboard from "@/components/CoachDashboard";
import UserDashboard from "@/components/UserDashboard";
import { IUser } from "@/interface/interface";
import Image from "next/image";

export default function Dashboard() {
  const router = useRouter();
  const { isLogged, user } = useContext(UserContext) as {
    isLogged: boolean;
    user: {
      login: boolean;
      token: string;
      user: Partial<IUser> | null;
    } | null;
  };

  useEffect(() => {
    if (!isLogged) {
      router.push("/login");
    }
  }, [isLogged, router]);

  if (!isLogged) {
    return null;
  }

  const role = user?.user?.role;

  console.log("User role from context:", role);

  return (
    <div>
      {role === "user" ? (
        <UserDashboard />
      ) : role === "coach" ? (
        <CoachDashboard />
      ) : (
        <p>Rol no reconocido.</p>
      )}
    </div>
  );
}

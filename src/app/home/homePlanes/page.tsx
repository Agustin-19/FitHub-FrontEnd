"use client";

import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import HomeUserPlan from "@/components/Home/HomeUser/indexPlan";
export default function Home() {
  const router = useRouter();
  const { isLogged } = useContext(UserContext);

<<<<<<< HEAD
  // if (!isLogged) {
  //   router.push("/login");
  // }
=======
  if (!isLogged) {
    router.push("/login");
  }
>>>>>>> eedb157 (register listo)
  return (
    <div>
      <HomeUserPlan />
    </div>
  );
}

"use client";

import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import HomeUserPlan from "@/components/Home/HomeUser/indexPlan";
export default function Home() {
  const router = useRouter();
  const { isLogged } = useContext(UserContext);

  // if (!isLogged) {
  //   router.push("/login");
  // }

  return (
    <div className="z-10 relative">
      <HomeUserPlan />
    </div>
  );
}

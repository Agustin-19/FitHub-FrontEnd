"use client";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import ChatbotComponent from "@/components/Chatbot/";
import Sidebar from "@/components/Coach/Sidebar";

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
    <div className="flex relative z-20">
      <div className="text-center text-[#FF3E1A] bg-black">
        <Sidebar />
      </div>
      <div>
        {role === "entrenador" ? (
          <ChatbotComponent />
        ) : (
          <p>Rol no reconocido.</p>
        )}
      </div>
    </div>
  );
}

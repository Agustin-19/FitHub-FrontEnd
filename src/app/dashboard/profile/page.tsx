"use client";

import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import CardSettings from "../../../components/Coach/Cards/cardsettings";
import SidebarUser from "@/components/UserDashboard/SidebarUser";
import Sidebar from "@/components/Coach/Sidebar";

export default function Settings() {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="flex relative z-20">
        <div className="text-center  bg-black">
          {user && user.role === "entrenador" ? (
            <Sidebar />
          ) : (
            user && user.role === "user" && <SidebarUser />
          )}
        </div>
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
      </div>
    </>
  );
}

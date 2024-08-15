"use client";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import Sidebar from "../Sidebar";

import CouchDashboard from "../MisRutinasyPlanes";

// Define the Routine type
type Routine = {
  id: string;
  name: string;
  progress: number;
};

interface IUserConext {
  user: {
    rutinas: Routine[];
    imgUrl?: string[];
    name: string;
    email: string;
    address: string;
    city: string;
  } | null;
}

const CoachDashboard = () => {
  const userContext = useContext(UserContext) as IUserConext;
  const { user } = userContext;

  if (!user) return <p>Loading...</p>;

  const purchasedRoutines = user?.rutinas || [];

  return (
    <div>
      <div className="flex">
        <div className="text-center  text-[#FF3E1A] bg-[#1A1D1A]">
          <Sidebar />
        </div>
        <div className="w-full mb-5">
          <CouchDashboard />
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;

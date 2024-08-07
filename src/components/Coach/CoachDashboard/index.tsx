"use client";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import Sidebar from "../Sidebar";
import RoutinesSales from "../Coachviews";
import CardSocialTraffic from "../Cards/socialtraffic";
import CardStats from "../Cards/cardstates";
import NewUsers from "../Cards/newUsers";
import CardSales from "../Cards/sales";

// Define the Routine type
type Routine = {
  id: string;
  name: string;
  progress: number;
};

interface IUserConext {
  user: {
    rutinas: Routine[];
    fotosPerfil?: string[];
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
        <div className="text-center  bg-[#1A1D1A]">
          <Link href="/home">
            <button className="mt-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
              Volver
            </button>
          </Link>
          <Sidebar />
        </div>

        <div className=" flex justify-between ml-[100px] p-5 gap-4">
          <div>
            <CardStats />
          </div>
          <div>
            <NewUsers />
          </div>
          <div>
            <CardSales />
          </div>
          <div>
            <CardSales />
          </div>
        </div>
      </div>
      <div className="text-center flex absolute  top-[500px] ml-[350px]">
        <RoutinesSales />
        <CardSocialTraffic />
      </div>
    </div>
  );
};

export default CoachDashboard;

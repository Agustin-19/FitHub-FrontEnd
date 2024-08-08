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
import LineChart from "../Grafic/grafic";
import BarChart from "../Barchart";
import CardTable from "../Cards/cardtable";

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
        <div className="text-center  text-[#FF3E1A] bg-[#1A1D1A]">
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
      <div className="text-center absolute  top-[200px] ml-[350px]">
        <LineChart />
      </div>
      <div className="text-center absolute  top-[200px] ml-[950px]">
        <BarChart />
      </div>
    </div>
  );
};

export default CoachDashboard;

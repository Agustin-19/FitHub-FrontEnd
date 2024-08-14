"use client";
import React, { useEffect, useState } from "react";
import CoachCard from "../CoachCard";
import { IUser } from "@/interface/interface";
import { getCoach } from "@/server/fetcheCoach";

const CoachList: React.FC = () => {
  const [coaches, setCoaches] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCoach();
        setCoaches(data);
      } catch (error) {
        console.error("Error fetching coaches:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="p-4 relative z-10">
      <h1 className="text-center text-[#FF3E1A] text-5xl font-extrabold leading-tight bg-clip-text  text-centertext-transparent bg-gradient-to-r from-[#FF3E1A] via-[#FF6F3E] to-[#FF9E3E] shadow-lg mb-12">
        Nuestros Entrenadores
      </h1>
      <div className="flex flex-wrap justify-center">
        {coaches.map((coach, index) => (
          <CoachCard key={index} user={coach} />
        ))}
      </div>
    </div>
  );
};

export default CoachList;

import React from "react";
import CoachCard from "../CoachCard";

interface IUser {
  name: string;
  email: string;
  address: string;
  city: string;
  telefono: string;
  fotosPerfil?: string;
  role?: string;
  rutinas?: number[];
  actividades?: number[];
  rating?: number;
}

const coaches: IUser[] = [
  {
    name: "Emily Clark",
    email: "emily@example.com",
    address: "321 Maple Ave",
    city: "Big City",
    telefono: "555-2345",
    fotosPerfil: "https://via.placeholder.com/100",
    role: "Pilates Instructor",
    rating: 4.2,
  },
  {
    name: "Michael Brown",
    email: "michael@example.com",
    address: "654 Cedar Ln",
    city: "Smalltown",
    telefono: "555-6789",
    fotosPerfil: "https://via.placeholder.com/100",
    role: "Nutritionist",
    rating: 4.8,
  },
  {
    name: "Sophia Martinez",
    email: "sophia@example.com",
    address: "987 Birch Blvd",
    city: "Hometown",
    telefono: "555-3456",
    fotosPerfil: "https://via.placeholder.com/100",
    role: "Personal Trainer",
    rating: 4.7,
  },
  {
    name: "Daniel Lee",
    email: "daniel@example.com",
    address: "246 Oak Dr",
    city: "Metropolis",
    telefono: "555-7890",
    fotosPerfil: "https://via.placeholder.com/100",
    role: "Strength Coach",
    rating: 4.3,
  },
  {
    name: "Olivia Wilson",
    email: "olivia@example.com",
    address: "135 Elm St",
    city: "Oldtown",
    telefono: "555-8901",
    fotosPerfil: "https://via.placeholder.com/100",
    role: "Yoga Instructor",
    rating: 4.6,
  },
  {
    name: "Ethan Davis",
    email: "ethan@example.com",
    address: "468 Pine St",
    city: "New City",
    telefono: "555-1230",
    fotosPerfil: "https://via.placeholder.com/100",
    role: "Cardio Specialist",
    rating: 4.4,
  },
  {
    name: "Ava Taylor",
    email: "ava@example.com",
    address: "579 Maple St",
    city: "Easttown",
    telefono: "555-6781",
    fotosPerfil: "https://via.placeholder.com/100",
    role: "Pilates Instructor",
    rating: 4.9,
  },
  {
    name: "James Anderson",
    email: "james@example.com",
    address: "683 Birch St",
    city: "Westfield",
    telefono: "555-7892",
    fotosPerfil: "https://via.placeholder.com/100",
    role: "Nutritionist",
    rating: 4.1,
  },
];
const CoachList: React.FC = () => {
  return (
    <div className="p-4 bg-[#1A1D1A] min-h-screen">
      {" "}
      <h1 className="text-center text-[#FF3E1A] text-5xl font-extrabold leading-tight bg-clip-text  text-centertext-transparent bg-gradient-to-r from-[#FF3E1A] via-[#FF6F3E] to-[#FF9E3E] shadow-lg mb-12">
        Coaches
      </h1>{" "}
      <div className="flex flex-wrap justify-center gap-4">
        {" "}
        {coaches.map((coach, index) => (
          <CoachCard key={index} user={coach} />
        ))}
      </div>
    </div>
  );
};

export default CoachList;

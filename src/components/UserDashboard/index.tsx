import React, { useContext } from "react";
import { UserContext } from "@/context/userContext";

import Link from "next/link";

// Define the Routine type
type Routine = {
  id: string; // or number, depending on your data structure
  name: string;
};

type User = {
  rutinas?: Routine[];
};

// Update IUserConext to include rutinas
interface IUserConext {
  user: {
    rutinas?: Routine[]; // Ensure rutinas is defined here
    // ... other properties
  };
}

const UserDashboard = () => {
  const { user } = useContext<IUserConext>(UserContext); // Use IUserContext for typing

  // Suponiendo que las rutinas compradas están en el objeto user
  const purchasedRoutines = user?.rutinas || [];
  const coaches = [
    // Aquí puedes agregar la lógica para obtener la lista de profesores
    { name: "Emily Clark", role: "Pilates Instructor" },
    { name: "Michael Brown", role: "Nutritionist" },
    // Agrega más profesores según sea necesario
  ];

  return (
    <div>
      <h2>Dashboard de Usuario</h2>
      <h3>Rutinas Compradas</h3>
      <ul>
        {purchasedRoutines.length > 0 ? (
          purchasedRoutines.map((routine: Routine) => (
            <li key={routine.id}>
              <Link href={`/routines/${routine.id}`}>{routine.name}</Link>
            </li>
          ))
        ) : (
          <p>No has comprado ninguna rutina.</p>
        )}
      </ul>

      <h3>Profesores</h3>
      <ul>
        {coaches.map((coach, index) => (
          <li key={index}>
            {coach.name} - {coach.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;

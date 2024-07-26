import React, { useContext } from "react";
import { UserContext } from "@/context/userContext";

import Link from "next/link";
import {IUser, IRutina}   from "@/interface/interface";


const UserDashboard = () => {
  const { user, rutinas } = useContext(UserContext); // Use IUserContext for typing

  // Suponiendo que las rutinas compradas están en el objeto user
  const purchasedRoutines = rutinas || [];


  return (
    <div>
      <h2>Dashboard de Usuario</h2>
      <h3>Rutinas Compradas</h3>
      
      <ul>
        {purchasedRoutines.length > 0 ? (
          purchasedRoutines.map((routine: IRutina) => (
            <li key={routine.id}>
              <Link href={`/routines/${routine.id}`}>{routine.name}</Link>
            </li>
          ))
        ) : (
          <p>No has comprado ninguna rutina.</p>
        )}
      </ul>

      
    </div>
  );
};

export default UserDashboard;

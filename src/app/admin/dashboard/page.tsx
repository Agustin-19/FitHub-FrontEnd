"use client";

import CoachList from "@/components/Coach/CoachList";

export default function AdminDashboard() {


  return (
    <div className=" bg-gray-100 top-32">
      <h1>Admin</h1>
      <p> Debe controlar las actividades, rutinas, entrenadores, usuarios</p>
      <CoachList/>
    </div>
  );
}

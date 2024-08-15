"use client";
import CrearCategoria from "@/components/Admin/AdminForms/CreateCategoria";
import CategoryList from "@/components/Admin/CategoryList";
export default function AdminDashboard() {


  return (
    <div className=" top-32 flex flex-col justify-center ">
      <CrearCategoria/>
      <CategoryList/>
    </div>
  );
}

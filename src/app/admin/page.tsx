import CoachList from "../../components/CoachList/index";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();
  const { isLogged } = useContext(UserContext);

  if (!isLogged) {
    router.push("/login");
  }
  return (
    <div className=" text-black bg-gray-100">
      <h1>Admin</h1>
      <p> Debe controlar las actividades, rutinas, entrenadores, usuarios</p>
      {/* users */}
      <CoachList />
      {/* activities */}
      {/* routines */}
    </div>
  );
}

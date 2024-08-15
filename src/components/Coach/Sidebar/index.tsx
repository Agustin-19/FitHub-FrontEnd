import React, { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import NotificationDropdown from "@/components/Coach/Dropdown/dropdown";
import UserDropdown from "@/components/Coach/Dropdown/dropdown";
import imagenPerfil from "../../../../public/assets/imagenPerfil.webp";
import Image from "next/image";
import { PencilIcon } from "@heroicons/react/24/outline";
import { uploadProfileAvatar } from "@/server/fetchFile";

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
    role?: string;
  } | null;
}

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [avatar, setAvatar] = useState<string | null>(null);
  const userContext = useContext(UserContext);
  const { user, setUser } = userContext;

  if (!user) return <p>Loading...</p>;

  if (user.role !== "entrenador") return null;

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const response = await uploadProfileAvatar(file);
        console.log("Image uploaded successfully:", response.imgUrl);
        setAvatar(response.imgUrl);
        setUser((prevUser: any) => ({
          ...prevUser,
          imgUrl: response.imgUrl,
        }));

        // Actualiza la URL de la imagen en el almacenamiento local
        if (typeof window !== "undefined") {
          const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
          localStorage.setItem(
            "user",
            JSON.stringify({ ...currentUser, imgUrl: response.imgUrl })
          );
        }
      } catch (error) {
        console.error("Error al subir la imagen de perfil:", error);
      }
    }
  };

  const profileImage = avatar || user.imgUrl || imagenPerfil;

  return (
    <>
      <nav className=" text-[#FF3E1A] md:left-0 md:block m md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl flex flex-wrap items-center justify-between  md:w-64  py-4 px-6 bg-black ">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <Link href="/home">
            <button className="m-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
              Volver
            </button>
          </Link>
          {/* Brand */}
          <Image
            src={profileImage}
            alt="Avatar"
            width={500}
            height={80}
            className="rounded-full object-cover"
          />
          <label
            htmlFor="file-input"
            className="pencil-icon cursor-pointer mt-4"
          >
            <PencilIcon className="w-6 h-6 text-white bg-[#FF3E1A] rounded-full p-1" />
          </label>

          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <h3 className="mt-4 text-lg font-bold">{user.name}</h3>
          <p>Email: {user.email}</p>
          {/* User */}

          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Mis actividades
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none gap-2">
              <li className="items-center">
                <Link href="/dashboard/create">
                  <i className={"fas fa-tools mr-2 text-sm "}></i> Crear
                  Rutinas, Planes y Actividades
                </Link>
              </li>
              <li className="items-center">
                <Link href="/dashboard">
                  <i className={"fas fa-tools mr-2 text-sm "}></i> Mis
                  Actividades
                </Link>
              </li>
            </ul>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Configuración
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4 gap-2">
              <li className="items-center">
                <Link href="/dashboard/chat">
                  <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"></i>{" "}
                  Chat Bot
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

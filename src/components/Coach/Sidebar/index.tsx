import React, { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import NotificationDropdown from "@/components/Coach/Dropdown/dropdown";
import UserDropdown from "@/components/Coach/Dropdown/dropdown";
import imagenPerfil from "../../../../public/assets/imagenPerfil.webp";
import Image from "next/image";
import { PencilIcon } from "@heroicons/react/24/outline";

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

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [avatar, setAvatar] = useState<string | null>(null);
  const userContext = useContext(UserContext) as IUserConext;
  const { user } = userContext;

  if (!user) return <p>Loading...</p>;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <nav className="md:left-0 md:block m md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl flex flex-wrap items-center justify-between  md:w-64  py-4 px-6 ">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Brand */}
          <Image
            src={avatar || imagenPerfil}
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
          <p>nombre: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Dirección: {user.address}</p>
          <p>Ciudad: {user.city}</p>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
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
              Admin Layout Pages
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link href="/dashboard/coach">
                  <i className={"fas fa-tv mr-2 text-sm "}></i> Dashboard
                </Link>
              </li>

              <li className="items-center">
                <Link href="/dashboard/create">
                  <i className={"fas fa-tools mr-2 text-sm "}></i> Crear
                  Rutinas, Planes y Actividades
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/tables">
                  <i className={"fas fa-table mr-2 text-sm "}></i> Tables
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/maps">
                  <i className={"fas fa-map-marked mr-2 text-sm "}></i> Maps
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Auth Layout Pages
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link href="/auth/login">
                  <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm"></i>{" "}
                  Login
                </Link>
              </li>

              <li className="items-center">
                <Link href="/auth/register">
                  <i className="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>{" "}
                  Register
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              No Layout Pages
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link href="/landing">
                  <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>{" "}
                  Landing Page
                </Link>
              </li>

              <li className="items-center">
                <Link href="/profile">
                  <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"></i>{" "}
                  Profile Page
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

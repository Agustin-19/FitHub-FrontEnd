"use client";

import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/assets/navbar/logo.png";
import { UserContext } from "@/context/userContext";
import { UserIcon } from "@heroicons/react/24/outline";
import { IloginUserRegister } from "@/interface/interface";

export function Navbar() {
  const { isLogged, user, logOut } = useContext(UserContext);

  return (
    <div className="relative  border-4 border-[#97D6DF] flex w-full flex-nowrap items-center justify-between bg-[#1A1D1A] py-2 shadow-dark-mild dark:bg-[#1A1D1A] lg:flex-wrap lg:justify-start lg:py-4 rounded-lg">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div className="flex items-center ms-10 md:me-2">
          <Link
            href="/"
            className="flex items-center text-xl text-black dark:text-white"
          >
            <Image src={logo} alt="Logo" width={100} height={100} />
            <h1 className="text-3xl font-bold ms-3 text-[#FF3E1A]">-FITHUB-</h1>
          </Link>
        </div>

        {isLogged ? (
          <div className="flex items-center ms-10 md:me-2">
            <span className="text-[#97D6DF] dark:text-[#97D6DF] lg:px-2 text-sm">
              Bienvenido,{" "}
              {(user as IloginUserRegister & { email?: string })?.name ||
                (user as IloginUserRegister & { email?: string })?.email ||
                ""}
            </span>
            <Link
              href="/home"
              className="text-[#97D6DF] dark:text-[#97D6DF] lg:px-2 hover:text-[#FF3E1A] text-sm"
            >
              Inicio
            </Link>
            <div className="flex items-center ms-10 md:me-2">
              <Link
                href="/dashboard"
                className="text-[#97D6DF] dark:text-[#97D6DF] lg:px-2 hover:text-[#FF3E1A] text-sm"
              >
                <UserIcon className="w-6 h-6 text-white" />
              </Link>
            </div>
            <button onClick={logOut} className="text-sm text-[#FF3E1A]">
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link href="/register">
              <button className="relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
                Registrarse
              </button>
            </Link>
            <Link href="/login">
              <button className="relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
                Entrar
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

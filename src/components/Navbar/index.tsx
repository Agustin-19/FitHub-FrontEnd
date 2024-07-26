"use client";
import { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/assets/navbar/logo.png";
import { UserContext } from "@/context/userContext";
import { UserIcon } from "@heroicons/react/24/outline";

export function Navbar() {
  const { isLogged, setIsLogged } = useContext(UserContext);

  const toggleLoginState = () => {
    setIsLogged(!isLogged);
  };

  return (
    <div className="relative flex w-full flex-nowrap items-center justify-between bg-[#1A1D1A] py-2 shadow-dark-mild dark:bg-[#1A1D1A] lg:flex-wrap lg:justify-start lg:py-4 rounded-lg">
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
            <button
              onClick={toggleLoginState}
              className="text-sm text-[#FF3E1A]"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <>
            {/* Hamburger button for mobile view */}
            <button
              className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
              type="button"
              data-twe-collapse-init
              data-twe-target="#navbarSupportedContent14"
              aria-controls="navbarSupportedContent14"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => {
                const nav = document.getElementById("navbarSupportedContent14");
                if (nav) {
                  nav.classList.toggle("hidden");
                }
              }}
            >
              {/* Hamburger icon */}
              <span className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>

            {/* Collapsible navbar container */}
            <div className="mr-4">
              <div className="relative flex w-full flex-wrap items-stretch">
                <div
                  className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
                  id="navbarSupportedContent14"
                  data-twe-collapse-item
                >
                  {/* Left links */}
                  <ul
                    className="me-auto flex flex-col ps-0 lg:mt-1 lg:flex-row"
                    data-twe-navbar-nav-ref
                  >
                    {isLogged ? (
                      <li
                        className="my-4 ps-2 lg:my-0 lg:pe-1 lg:ps-2"
                        data-twe-nav-item-ref
                      >
                        <Link
                          href="/home"
                          className="text-[#97D6DF] dark:text-[#97D6DF] lg:px-2 hover:text-[#FF3E1A] text-sm"
                          aria-current="page"
                          data-twe-nav-link-ref
                        >
                          Inicio
                        </Link>
                      </li>
                    ) : (
                      <>
                        <li
                          className="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0"
                          data-twe-nav-item-ref
                        >
                          <Link
                            href="/#programs"
                            className="p-0 text-[#97D6DF] dark:text-[#97D6DF] lg:px-2 hover:text-[#FF3E1A] text-sm"
                            data-twe-nav-link-ref
                          >
                            Programas
                          </Link>
                        </li>
                        <li
                          className="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0"
                          data-twe-nav-item-ref
                        >
                          <Link
                            href="/#coaches"
                            className="p-0 text-[#97D6DF] dark:text-[#97D6DF] lg:px-2 hover:text-[#FF3E1A] text-sm"
                            data-twe-nav-link-ref
                          >
                            Entrenadores
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                  {!isLogged && (
                    <div className="flex space-x-4">
                      <Link href="/register">
                        <button
                          className="relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]"
                          type="button"
                          id="button-register"
                          data-twe-ripple-init
                        >
                          Registrarse
                        </button>
                      </Link>
                      <Link href="/login">
                        <button
                          className="relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]"
                          type="button"
                          id="button-login"
                          data-twe-ripple-init
                        >
                          Entrar
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={toggleLoginState}
              className="text-sm text-[#FF3E1A]"
            >
              Iniciar Sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
}

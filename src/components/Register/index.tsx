"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { validateRegister } from "@/helpers/validations.login";
import { useRouter } from "next/navigation";
import { IErrorsRegister, IRegisterUser } from "@/interface/interface";
import { UserContext } from "@/context/userContext";

export function RegisterComponet({ token, setToken }: any) {
  const { signUp } = useContext(UserContext);
  const router = useRouter();

  const [userData, setUserDate] = useState({
    name: "",
    email: "",
    dni: 0,
    password: "",
    passwordConfirm: "",
    phone: 0,
    country: "",
    address: "",
    city: "",
    delete: false,
  });

  const [errors, setErrors] = useState<IRegisterUser>({
    name: "*",
    email: "*",
    dni: 0,
    phone: 0,
    country: "*",
    city: "*",
    address: "*",
    password: "*",
    passwordConfirm: "*",
    delete: false,
  });

  const todosLosCamposCompletos = () => {
    return (
      userData.email !== "" &&
      userData.password !== "" &&
      userData.name !== "" &&
      userData.address !== "" &&
      userData.city !== "" &&
      userData.phone !== 0 &&
      userData.country !== "" &&
      userData.dni !== 0
    );
  };

  const handleImputChange = (event: any) => {
    const { name, value } = event.target;

    const newValue = (name === 'dni' || name === 'phone') ? Number(value) : value;
    const newUserDate = { ...userData, [name]: newValue };

    setUserDate(newUserDate);
    setErrors(
      validateRegister(newUserDate, [
        "email",
        "name",
        "dni",
        "phone",
        "country",
        "city",
        "address",
        "password",
        "passwordConfirm",
      ])
    );
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    

    if (userData.password !== userData.passwordConfirm) {
      alert("Las contraseñas no coinciden");
    // } else 
    // if (Object.keys(errors).length) {
    //   alert("Todos los campos son obligatorios ");
    } else {
      
      const userDataToSubmit = {
        name: userData.name,
        email: userData.email,
        dni: Number(userData.dni),
        phone: Number(userData.phone),
        country: userData.country,
        city: userData.city,
        address: userData.address,
        password: userData.password,
        passwordConfirm: userData.passwordConfirm,
        delete: false,
      }
      
      console.log(userDataToSubmit);
      
      const success = await signUp(userDataToSubmit);
      if (success) {
        router.push("/login");
      } else {
        console.log("Ingreso invalido");
      }
    }
  };
  return (
    <section className="bg-[#1A1D1A] w-full h-full p-4 flex items-center justify-center">
      <form
        className="w-full max-w-md h-full flex flex-col justify-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-[#97D6DF] text-2xl mb-5 text-center">Registro</h1>

        {/* Entrada de nombre */}
        <div className="relative mb-6" data-twe-input-wrapper-init>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Ingrese su Nombre y Apellido"
            required
            onChange={handleImputChange}
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#447988] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-[#447988] [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
          />
          <label
            htmlFor="name"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988] peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]"
          >
            Nombre y Apellido
          </label>
          {errors.name && (
            <p style={{ color: "red", fontSize: "10px", marginTop: "0px" }}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Entrada de correo */}
        <div className="relative mb-6" data-twe-input-wrapper-init>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Ingrese su correo"
            required
            onChange={handleImputChange}
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#447988] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-[#447988] [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
          />
          <label
            htmlFor="email"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988] peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]"
          >
            Correo
          </label>
          {errors.email && (
            <p style={{ color: "red", fontSize: "10px", marginTop: "0px" }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* DNI Input */}
        <div className="relative mb-6" data-twe-input-wrapper-init>
          <input
            type="number"
            name="dni"
            id="dni"
            placeholder="Enter your DNI"
            required
            onChange={handleImputChange}
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#447988] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-[#447988] [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
          />
          <label
            htmlFor="dni"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988] peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]"
          >
            DNI
          </label>
          {errors.dni && (
            <p style={{ color: "red", fontSize: "10px", marginTop: "0px" }}>
              {errors.dni}
            </p>
          )}
        </div>

        {/* Entrada de dirección */}
        <div className="relative mb-6" data-twe-input-wrapper-init>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Ingrese su dirección"
            required
            onChange={handleImputChange}
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#447988] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-[#447988] [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
          />
          <label
            htmlFor="address"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988] peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]"
          >
            Dirección
          </label>
          {errors.address && (
            <p style={{ color: "red", fontSize: "10px", marginTop: "0px" }}>
              {errors.address}
            </p>
          )}
        </div>

        {/* Entrada de país */}
        <div className="relative mb-6" data-twe-input-wrapper-init>
          <input
            type="text"
            name="country"
            id="country"
            placeholder="Ingrese su país"
            required
            onChange={handleImputChange}
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#447988] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-[#447988] [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
          />
          <label
            htmlFor="country"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988] peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]"
          >
            País
          </label>
          {errors.country && (
            <p style={{ color: "red", fontSize: "10px", marginTop: "0px" }}>
              {errors.country}
            </p>
          )}
        </div>

        {/* Entrada de ciudad */}
        <div className="relative mb-6" data-twe-input-wrapper-init>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Ingrese su ciudad"
            required
            onChange={handleImputChange}
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#447988] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-[#447988] [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
          />
          <label
            htmlFor="city"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988] peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]"
          >
            Ciudad
          </label>
          {errors.city && (
            <p style={{ color: "red", fontSize: "10px", marginTop: "0px" }}>
              {errors.city}
            </p>
          )}
        </div>

        {/* Entrada de celular */}
        <div className="relative mb-6" data-twe-input-wrapper-init>
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Ingrese su celular"
            required
            onChange={handleImputChange}
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#447988] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-[#447988] [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
          />
          <label
            htmlFor="phone"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988] peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]"
          >
            Celular
          </label>
          {errors.phone && (
            <p style={{ color: "red", fontSize: "10px", marginTop: "0px" }}>
              {errors.phone}
            </p>
          )}
        </div>

        {/* Entrada de contraseña */}
        <div className="relative mb-6" data-twe-input-wrapper-init>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Ingrese su contraseña"
            required
            onChange={handleImputChange}
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#447988] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-[#447988] [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
          />
          <label
            htmlFor="password"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988] peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]"
          >
            Contraseña
          </label>
          {errors.password && (
            <p style={{ color: "red", fontSize: "10px", marginTop: "0px" }}>
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirmación de contraseña */}
        <div className="relative mb-6" data-twe-input-wrapper-init>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            placeholder="Repita su contraseña"
            required
            onChange={handleImputChange}
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#447988] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-[#447988] [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
          />
          <label
            htmlFor="passwordConfirm"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988] peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]"
          >
            Repita su Contraseña
          </label>
          {errors.passwordConfirm && (
            <p style={{ color: "red", fontSize: "10px", marginTop: "0px" }}>
              {errors.passwordConfirm}
            </p>
          )}
        </div>

        {/* Mensaje de campos obligatorios */}
        {!todosLosCamposCompletos() && (
          <p
            style={{
              color: "red",
              fontSize: "10px",
              marginTop: "10px",
              marginBottom: "10px",
              textShadow: "1px 1px 1px black",
            }}
          >
            * Todos los campos son obligatorios
          </p>
        )}
        {/* Botón de envío */}
        <button
          type="submit"
          className="relative rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]"
        >
          Registrar
        </button>
        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-[#97D6DF]">
            O Ingresa Con
          </p>
        </div>

        {/* Botones sociales */}
        <Link
          className="mb-3 flex w-full items-center justify-center rounded bg-[#3b5998] pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-[#3b5998] hover:shadow-primary-2 focus:bg-[#3b5998] focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-[#3b5998] active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          href="#!"
          role="button"
          data-twe-ripple-init
          data-twe-ripple-color="light"
        >
          {/* Facebook Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-2 h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M22.675 0H1.325C.592 0 0 .592 0 1.325v21.351C0 23.408.592 24 1.325 24h11.494v-9.294H9.691v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.662-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.503 0-1.794.715-1.794 1.763v2.309h3.587l-.467 3.622h-3.12V24h6.116C23.408 24 24 23.408 24 22.675V1.325C24 .592 23.408 0 22.675 0z"
              clipRule="evenodd"
            />
          </svg>
          Continue with Facebook
        </Link>
        <Link
          className="mb-3 flex w-full items-center justify-center rounded bg-[#55acee] pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-[#55acee] hover:shadow-primary-2 focus:bg-[#55acee] focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-[#55acee] active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          href="#!"
          role="button"
          data-twe-ripple-init
          data-twe-ripple-color="light"
        >
          {/* Twitter Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-2 h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M24 4.557a9.816 9.816 0 01-2.828.775 4.93 4.93 0 002.165-2.724 9.865 9.865 0 01-3.127 1.195 4.916 4.916 0 00-8.373 4.482A13.939 13.939 0 011.671 3.15a4.922 4.922 0 001.523 6.574A4.903 4.903 0 01.964 9.1v.061a4.917 4.917 0 003.946 4.827 4.9 4.9 0 01-2.212.084 4.92 4.92 0 004.6 3.419 9.867 9.867 0 01-6.102 2.104c-.395 0-.785-.023-1.17-.069a13.945 13.945 0 007.548 2.212c9.056 0 14.01-7.507 14.01-14.01 0-.213-.005-.426-.014-.637A10.025 10.025 0 0024 4.557z"
              clipRule="evenodd"
            />
          </svg>
          Continue with Twitter
        </Link>
      </form>
    </section>
  );
}

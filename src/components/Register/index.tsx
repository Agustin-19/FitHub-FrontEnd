"use client";

import React from "react";
import { useState, useEffect, useContext } from "react";
import { validateRegister } from "@/helpers/validations.login";
import { useRouter } from "next/navigation";
import { IErrorsRegister, IRegisterUser } from "@/interface/interface";
import { UserContext } from "@/context/userContext";
import style from "./register.module.css";
import Image from "next/image";
import register1 from "../../../public/assets/loginyregister/register1.png";
import { motion } from "framer-motion";
import register2 from "../../../public/assets/loginyregister/register2.png";
import LoginLogout from "../Login-Logout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function RegisterComponet({ token, setToken }: any) {
  const { signUp } = useContext(UserContext);
  const router = useRouter();

  const [userData, setUserDate] = useState({
    name: "",
    email: "",
    dni: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    country: "",
    address: "",
    city: "",
    delete: false,
  });

  const [errors, setErrors] = useState<IErrorsRegister>({
    name: "*",
    email: "*",
    dni: "*",
    phone: "*",
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
      userData.phone !== "" &&
      userData.country !== "" &&
      userData.dni !== ""
    );
  };

  const handleImputChange = (event: any) => {
    const { name, value } = event.target;

    const newValue = name === "dni" || name === "phone" ? Number(value) : value;
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
      };

      const success = await signUp(userDataToSubmit);

      if (success) {
        toast.success("Registro exitoso", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          router.push("/login");
        }, 3500);
      } else {
        toast.error("Error en el registro", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  return (
    <section
      className={
        style.register + " w-full h-full p-4 flex  items-center justify-center "
      }
    >
      <div className={style.left} data-aos="fade-right">
        <Image
          src={register1}
          alt="Woman on the right"
          width={1000}
          height={900}
        />
      </div>{" "}
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className="text-[#97D6DF] text-5xl p-3 mb-5 text-center font-bold">
          Registro
        </h1>

        {/* Entrada de nombre */}
        <div className="grid grid-cols-2 p-4 gap-x-9  ">
          <div
            className="relative rounded-lg mb-6 "
            data-twe-input-wrapper-init
          >
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nombre y Apellido"
              onChange={handleImputChange}
              className="relative block w-[300px] border-1 border-solid border-red-500 rounded bg-transparent px-3 py-2 text-[#97D6DF] focus:outline-none focus:ring-2 focus:ring-[#FF3E1A] transition duration-150 ease-in-out text-center overflow-visible"
              style={{ width: "100%" }}
            />
            <label
              htmlFor="name"
              className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-1 leading-tight text-neutral-500 transition-all duration-200 ease-out ${
                userData.name
                  ? "-translate-y-[1.15rem] scale-[0.8] text-[#447988]"
                  : "peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988]"
              } motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]`}
            ></label>
            {errors.name && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "10px" }}>
                {errors.name}
              </p>
            )}
          </div>

          {/* Entrada de correo */}
          <div
            className="relative  rounded-lg mb-6 "
            data-twe-input-wrapper-init
          >
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleImputChange}
              className="relative block w-[300px] rounded bg-transparent px-3 py-2 text-[#97D6DF] focus:outline-none focus:ring-2 focus:ring-[#FF3E1A] transition duration-150 ease-in-out focus:outline-none] text-center  "
              style={{ width: "100%" }}
            />
            <label
              htmlFor="email"
              className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-1 leading-tight text-neutral-500 transition-all duration-200 ease-out ${
                userData.email
                  ? "-translate-y-[1.15rem] scale-[0.8] text-[#447988]"
                  : "peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988]"
              } motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]`}
            ></label>
            {errors.email && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "10px" }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* DNI Input */}
          <div
            className="relative  rounded-lg mb-6"
            data-twe-input-wrapper-init
          >
            <input
              type="text"
              name="dni"
              id="dni"
              placeholder="DNI"
              onChange={handleImputChange}
              className="relative block w-[300px] rounded bg-transparent px-3 py-2 text-[#97D6DF] focus:outline-none focus:ring-2 focus:ring-[#FF3E1A] transition duration-150 ease-in-out focus:outline-none] text-center  "
              style={{ width: "100%" }}
            />
            <label
              htmlFor="dni"
              className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-1 leading-tight text-neutral-500 transition-all duration-200 ease-out ${
                userData.dni
                  ? "-translate-y-[1.15rem] scale-[0.8] text-[#447988]"
                  : "peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988]"
              } motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]`}
            ></label>
            {errors.dni && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "10px" }}>
                {errors.dni}
              </p>
            )}
          </div>

          {/* Entrada de dirección */}
          <div
            className="relative rounded-lg mb-6 "
            data-twe-input-wrapper-init
          >
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Dirección"
              onChange={handleImputChange}
              className="relative block w-[300px] rounded bg-transparent px-3 py-2 text-[#97D6DF] focus:outline-none focus:ring-2 focus:ring-[#FF3E1A] transition duration-150 ease-in-out focus:outline-none] text-center  "
              style={{ width: "100%" }}
            />
            <label
              htmlFor="address"
              className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-1 leading-tight text-neutral-500 transition-all duration-200 ease-out ${
                userData.dni
                  ? "-translate-y-[1.15rem] scale-[0.8] text-[#447988]"
                  : "peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988]"
              } motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]`}
            ></label>
            {errors.address && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "10px" }}>
                {errors.address}
              </p>
            )}
          </div>

          {/* Entrada de país */}
          <div
            className="relative rounded-lg mb-6 "
            data-twe-input-wrapper-init
          >
            <input
              type="text"
              name="country"
              id="country"
              placeholder="País"
              onChange={handleImputChange}
              className="relative block w-[300px] rounded bg-transparent px-3 py-2 text-[#97D6DF] focus:outline-none focus:ring-2 focus:ring-[#FF3E1A] transition duration-150 ease-in-out focus:outline-none] text-center  "
              style={{ width: "100%" }}
            />
            <label
              htmlFor="country"
              className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-1 leading-tight text-neutral-500 transition-all duration-200 ease-out ${
                userData.country
                  ? "-translate-y-[1.15rem] scale-[0.8] text-[#447988]"
                  : "peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988]"
              } motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]`}
            ></label>
            {errors.country && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "0px" }}>
                {errors.country}
              </p>
            )}
          </div>

          {/* Entrada de ciudad */}
          <div className="relative rounded-lg mb-6" data-twe-input-wrapper-init>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="Ciudad"
              onChange={handleImputChange}
              className="relative block w-[300px] rounded bg-transparent px-3 py-2 text-[#97D6DF] focus:outline-none focus:ring-2 focus:ring-[#FF3E1A] transition duration-150 ease-in-out focus:outline-none] text-center  "
              style={{ width: "100%" }}
            />
            <label
              htmlFor="city"
              className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-1 leading-tight text-neutral-500 transition-all duration-200 ease-out ${
                userData.city
                  ? "-translate-y-[1.15rem] scale-[0.8] text-[#447988]"
                  : "peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988]"
              } motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]`}
            ></label>
            {errors.city && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "10px" }}>
                {errors.city}
              </p>
            )}
          </div>

          {/* Entrada de celular */}
          <div
            className="relative rounded-lg mb-6 "
            data-twe-input-wrapper-init
          >
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Celular"
              onChange={handleImputChange}
              className="relative block w-[300px] rounded bg-transparent px-3 py-2 text-[#97D6DF] focus:outline-none focus:ring-2 focus:ring-[#FF3E1A] transition duration-150 ease-in-out focus:outline-none] text-center  "
              style={{ width: "100%" }}
            />
            <label
              htmlFor="phone"
              className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-1 leading-tight text-neutral-500 transition-all duration-200 ease-out ${
                userData.phone
                  ? "-translate-y-[1.15rem] scale-[0.8] text-[#447988]"
                  : "peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988]"
              } motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]`}
            ></label>
            {errors.phone && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "10px" }}>
                {errors.phone}
              </p>
            )}
          </div>

          {/* Entrada de contraseña */}
          {/* Entrada de contraseña */}
          <div className="relative rounded-lg mb-6" data-twe-input-wrapper-init>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              onChange={handleImputChange}
              className="relative block w-[300px] rounded bg-transparent px-3 py-2 text-[#97D6DF] focus:outline-none focus:ring-2 focus:ring-[#FF3E1A] transition duration-150 ease-in-out focus:outline-none] text-center  "
              style={{ width: "100%" }}
            />
            <label
              htmlFor="password"
              className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-1 leading-tight text-neutral-500 transition-all duration-200 ease-out ${
                userData.password
                  ? "-translate-y-[1.15rem] scale-[0.8] text-[#447988]"
                  : "peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988]"
              } motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]`}
            ></label>
            {errors.password && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "10px" }}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirmación de contraseña */}
          <div className="relative rounded-lg mb-6" data-twe-input-wrapper-init>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="Confirme su contraseña"
              onChange={handleImputChange}
              className="relative block w-[300px] rounded bg-transparent px-3 py-2 text-[#97D6DF] focus:outline-none focus:ring-2 focus:ring-[#FF3E1A] transition duration-150 ease-in-out focus:outline-none] text-center  "
              style={{ width: "100%" }}
            />
            <label
              htmlFor="passwordConfirm"
              className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-1 leading-tight text-neutral-500 transition-all duration-200 ease-out ${
                userData.passwordConfirm
                  ? "-translate-y-[1.15rem] scale-[0.8] text-[#447988]"
                  : "peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988]"
              } motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]`}
            ></label>
            {errors.passwordConfirm && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "10px" }}>
                {errors.passwordConfirm}
              </p>
            )}
          </div>

          {/* Mensaje de campos obligatorios */}
          {!todosLosCamposCompletos() && (
            <p
              style={{
                color: "red",
                fontSize: "12px",
                marginTop: "10px",
                marginBottom: "10px",
                textShadow: "1px 1px 1px black",
              }}
            >
              * Todos los campos son obligatorios
            </p>
          )}
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className=" rounded-full w-full border-2 border-[#97D6DF] bg-[#FF3E1A] py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A] "
          disabled={
            !todosLosCamposCompletos() ||
            Object.keys(errors).some(
              (key) => errors[key as keyof IErrorsRegister]
            )
          }
        >
          Registrar
        </button>
        <div className="my-4   flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-[#97D6DF]">
            O Ingresa Con
          </p>
        </div>

        {/* Botones sociales */}
        <LoginLogout />
      </form>
      <div className={style.right} data-aos="fade-left">
        <motion.img
          src={register2.src}
          alt="Woman on the right"
          width={1000}
          height={900}
        />
      </div>
      <ToastContainer />
    </section>
  );
}

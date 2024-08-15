"use client";
import { useState, useContext } from "react";
import "../../app/globals.css";
import { validateLogin } from "@/helpers/validations.login";
import { useRouter } from "next/navigation";
import { IErrorsLogin, ILogin } from "@/interface/interface";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import style from "./login.module.css";
import Image from "next/image";
import mujer from "../../../public/assets/loginyregister/mujerderecha.png";
import hombre from "../../../public/assets/loginyregister/hombreizquierda.png";
import { motion } from "framer-motion";
import LoginLogout from "../Login-Logout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function LoginComponet({ token, setToken }: any) {
  const { signIn, setUser } = useContext(UserContext);
  const router = useRouter();

  const [userDate, setUserDate] = useState<ILogin>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<IErrorsLogin>({
    email: "*",
    password: "*",
  });

  const todosLosCamposCompletos = () => {
    return userDate.email !== "" && userDate.password !== "";
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newUserDate = { ...userDate, [name]: value };

    setUserDate(newUserDate);
    setErrors(validateLogin(newUserDate, ["email", "password"]));
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // console.log("Submitted credentials:", userDate);
      const success = await signIn(userDate);
      if (success) {
        toast.success("Inicio de sesión exitoso", {
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
          router.push("/home");
        }, 3500);
      } else {
        throw new Error("Credenciales inválidas.");
      }
    } catch (error) {
      toast.error(`Error en el inicio de sesión !! ${error}`, {
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
  };

  return (
    <section
      className={
        style.login +
        " relative z-10 w-full h-full p-4 flex items-center justify-center"
      }
    >
      <div className={`${style.left} hidden md:block`} data-aos="fade-right">
        <Image src={hombre} alt="Man on the left" width={700} height={700} />
      </div>
      <form onSubmit={handleSubmit} className={style.form}>
        <h1 className="text-[#97D6DF] text-3xl font-bold mb-5 text-center uppercase">
          Ingresa a FitHub
        </h1>

        {/* Entrada de email */}
        <div
          className="relative mb-6 flex flex-col items-center rounded"
          data-twe-input-wrapper-init
        >
          <input
            type="text"
            name="email"
            className="relative block w-[300px] rounded bg-transparent px-3 py-2 text-[#97D6DF] focus:outline-none focus:ring-2 focus:ring-[#FF3E1A] transition duration-150 ease-in-out text-center"
            id="email"
            placeholder="Email"
            onChange={handleInputChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        {/* Entrada de contraseña */}
        <div
          className="relative mb-6 flex flex-col items-center rounded"
          data-twe-input-wrapper-init
        >
          <input
            type="password"
            name="password"
            className="text-center relative block w-[300px] rounded bg-transparent px-3 py-2 text-[#97D6DF] transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FF3E1A]"
            id="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>
        {/* Botón de enviar */}
        <button
          type="submit"
          className="inline-block w-full rounded bg-[#FF3E1A] pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-[#FF3E1A] hover:shadow-primary-2 focus:bg-[#FF3E1A] focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-[#FF3E1A] active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          data-twe-ripple-init
          data-twe-ripple-color="light"
        >
          Ingresar
        </button>

        {/* Divider */}
        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-[#97D6DF] uppercase">
            O Ingresa Con
          </p>
        </div>

        {/* Botones sociales */}
        <LoginLogout />
      </form>
      <div className={`${style.right} hidden md:block`} data-aos="fade-left">
        <motion.img
          src={mujer.src}
          alt="Woman on the right"
          width={700}
          height={700}
        />
      </div>
      <ToastContainer />
    </section>
  );
}

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
    console.log("Submitted credentials:", userDate);
    const success = await signIn(userDate);
    if (success) {
      console.log("Login successful");
      router.push("/home");
    } else {
      console.log("Invalid login");
    }
  };

  return (
    <section
      className={
        style.login + " w-full h-full p-4 flex items-center justify-center"
      }
    >
      <div className={style.left} data-aos="fade-right">
        <Image src={hombre} alt="Woman on the right" width={700} height={700} />
      </div>
      <form onSubmit={handleSubmit} className={style.form}>
        <h1 className="text-[#97D6DF] text-3xl font-bold mb-5 text-center uppercase">
          Ingresa a FitHub
        </h1>

        {/* Entrada de email */}
        <div
          className="relative mb-6  flex flex-col items-center rounded"
          data-twe-input-wrapper-init
        >
          <input
            type="text"
            name="email"
            className="relative block w-[300px] rounded bg-transparent px-3 py-2 text-[#97D6DF] focus:outline-none focus:ring-2 focus:ring-[#FF3E1A] transition duration-150 ease-in-out focus:outline-none] text-center  "
            id="email"
            placeholder="Email"
            onChange={handleInputChange}
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "10px", marginTop: "0px" }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Entrada de contraseña */}
        <div
          className="relative mb-6  flex flex-col items-center rounded"
          data-twe-input-wrapper-init
        >
          <input
            type="password"
            name="password"
            className="text-center relative block w-[300px] rounded bg-transparent px-3 py-2 text-[#97D6DF] transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FF3E1A] "
            id="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
          {errors.password && (
            <p style={{ color: "red", fontSize: "10px", marginTop: "0px" }}>
              {errors.password}
            </p>
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
        {/* Twitter Icon */}
        <Link
          className="mb-3 flex  items-center justify-center  bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-full transition ease-in duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg  pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal hover:shadow-primary-2 focus:bg-[#F44336] focus:shadow-primary-2 active:bg-[#F44336] active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          href="#!"
          role="button"
          data-twe-ripple-init
          data-twe-ripple-color="light"
        >
          <button className="flex items-center justify-center py-2 px-20">
            <svg
              viewBox="0 0 24 24"
              height="25"
              width="25"
              y="0px"
              x="0px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707 C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321 C6.4099731,6.9193726,8.977478,5,12,5z"
                fill="#F44336"
              ></path>
              <path
                d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12 c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458 l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z"
                fill="#2196F3"
              ></path>
              <path
                d="M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511 C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215 C5.1484375,13.6044312,5,12.8204346,5,12z"
                fill="#FFC107"
              ></path>
              <path
                d="M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959 C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834 C14.7412109,18.5588989,13.4284058,19,12,19z"
                fill="#00B060"
              ></path>
              <path
                opacity=".1"
                d="M12,23.75c-3.5316772,0-6.7072754-1.4571533-8.9524536-3.7786865C5.2453613,22.4378052,8.4364624,24,12,24 c3.5305786,0,6.6952515-1.5313721,8.8881226-3.9592285C18.6495972,22.324646,15.4981079,23.75,12,23.75z"
              ></path>
              <polygon
                opacity=".1"
                points="12,14.25 12,14.5 18.4862061,14.5 18.587492,14.25"
              ></polygon>
              <path
                d="M23.9944458,12.1470337C23.9952393,12.0977783,24,12.0493774,24,12 c0-0.0139771-0.0021973-0.0274658-0.0022583-0.0414429C23.9970703,12.0215454,23.9938965,12.0838013,23.9944458,12.1470337z"
                fill="#E6E6E6"
              ></path>
              <path
                opacity=".2"
                d="M12,9.5v0.25h11.7855721c-0.0157471-0.0825195-0.0329475-0.1680908-0.0503426-0.25H12z"
                fill="#FFF"
              ></path>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                y2="12"
                y1="12"
                x2="24"
                x1="0"
                id="LxT-gk5MfRc1Gl_4XsNKba_xoyhGXWmHnqX_gr1"
              >
                <stop stop-opacity=".2" stop-color="#fff" offset="0"></stop>
                <stop stop-opacity="0" stop-color="#fff" offset="1"></stop>
              </linearGradient>
              <path
                d="M23.7352295,9.5H12v5h6.4862061C17.4775391,17.121582,14.9771729,19,12,19 c-3.8659668,0-7-3.1340332-7-7c0-3.8660278,3.1340332-7,7-7c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686 c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374l3.637146-3.4699707L19.8414307,2.940979 C17.7369385,1.1170654,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12c0,6.6273804,5.3725586,12,12,12 c6.1176758,0,11.1554565-4.5812378,11.8960571-10.4981689C23.9585571,13.0101929,24,12.508667,24,12 C24,11.1421509,23.906311,10.3068237,23.7352295,9.5z"
                fill="url(#LxT-gk5MfRc1Gl_4XsNKba_xoyhGXWmHnqX_gr1)"
              ></path>
              <path
                opacity=".1"
                d="M15.7885132,5.890686C14.6939087,5.1806641,13.4018555,4.75,12,4.75c-3.8659668,0-7,3.1339722-7,7 c0,0.0421753,0.0005674,0.0751343,0.0012999,0.1171875C5.0687437,8.0595093,8.1762085,5,12,5 c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374 l3.637146-3.4699707l-3.637146,3.2199707C16.1289062,6.1018066,15.9560547,5.9995728,15.7885132,5.890686z"
              ></path>
              <path
                opacity=".2"
                d="M12,0.25c2.9750366,0,5.6829224,1.0983887,7.7792969,2.8916016l0.144165-0.1375122 l-0.110014-0.0958166C17.7089558,1.0843592,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12 c0,0.0421753,0.0058594,0.0828857,0.0062866,0.125C0.0740356,5.5558472,5.4147339,0.25,12,0.25z"
                fill="#FFF"
              ></path>
            </svg>
            <span className="ml-8">Sign in with Google</span>
          </button>
        </Link>
      </form>
      <div className={style.right} data-aos="fade-left">
        <motion.img
          src={mujer.src}
          alt="Woman on the right"
          width={700}
          height={700}
        />
      </div>
    </section>
  );
}

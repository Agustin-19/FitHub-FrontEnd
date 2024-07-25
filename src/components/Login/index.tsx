"use client";
import { useState, useContext } from "react";
import { validateLogin } from "@/helpers/validations.login";
import { useRouter } from "next/navigation";
import { IErrorsLogin, ILogin } from "@/interface/interface";
import { UserContext } from "@/context/userContext";
import Link from "next/link";

export function LoginComponet({ token, setToken }: any) {
  const { signIn } = useContext(UserContext);
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
    <section className="bg-[#1A1D1A] w-full h-full p-4 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full h-full flex flex-col justify-center"
      >
        <h1 className="text-[#97D6DF] text-2xl mb-5 text-center">
          Ingresa a FitHub
        </h1>

        {/* Entrada de email */}
        <div className="relative mb-6" data-twe-input-wrapper-init>
          <input
            type="text"
            name="email"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#447988] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-[#447988] [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
            id="email"
            placeholder="Email address"
            onChange={handleInputChange}
          />
          <label
            htmlFor="email"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988] peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]"
          >
            Email address
          </label>
          {errors.email && (
            <p style={{ color: "red", fontSize: "10px", marginTop: "0px" }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Entrada de contraseña */}
        <div className="relative mb-6" data-twe-input-wrapper-init>
          <input
            type="password"
            name="password"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#447988] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-[#447988] [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
            id="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
          <label
            htmlFor="password"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988] peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]"
          >
            Password
          </label>
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

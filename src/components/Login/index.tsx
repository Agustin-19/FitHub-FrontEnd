"use client";

import React from "react";
import { useState, useEffect, useContext } from "react";
import { validateLogin } from "@/helpers/validations.login";
import { useRouter } from "next/navigation";
import { IErrorsLogin } from "@/interface/interface";
import { UserContext } from "@/context/userContext";

export function LoginComponet({ token, setToken }: any) {
  const { signIn } = useContext(UserContext);
  const router = useRouter();

  const [userDate, setUserDate] = useState({
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

  const handleImputChange = (event: any) => {
    const { name, value } = event.target;
    const newUserDate = { ...userDate, [name]: value };

    setUserDate(newUserDate);
    setErrors(validateLogin(newUserDate, ["email", "password"]));
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = await signIn(userDate);
    if (success) {
      router.push("/home");
    } else {
      console.log("Ingreso invalido");
    }
  };

  return (
    <div>
      <form className="max-w-2xl mx-auto " onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Ingrese su correo"
            required
            onChange={handleImputChange}
            className="daisy-input daisy-input-bordered w-full max-w-xs text-black"
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "10px", marginTop: "0px" }}>
              {errors.email}
            </p>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={handleImputChange}
            className="daisy-input daisy-input-bordered w-full max-w-xs text-black"
            placeholder="Ingrese su contraseña"
          />
          {errors.password && (
            <p style={{ color: "red", fontSize: "10px", marginTop: "0px" }}>
              {errors.password}
            </p>
          )}
        </div>
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
        <button
          type="submit"
          className="relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]"
        >
          Login
        </button>
      </form>
    </div>
  );
}

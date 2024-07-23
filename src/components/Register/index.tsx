"use client";

import React from "react";
import { useState, useEffect, useContext } from "react";
import { validateRegister } from "@/helpers/validations.login";
import { useRouter } from "next/navigation";
import { IErrorsRegister } from "@/interface/interface";
import { UserContext } from "@/context/userContext";

export function RegisterComponet({ token, setToken }: any) {
  const { signUp } = useContext(UserContext);
  const router = useRouter();

  const [userData, setUserDate] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    password: "",
    repeat_password: "",
    phone: "",
    statusMembrecia: "",
    fotosPerfil: "",
    role: "",
    rutinas: [],
    actividades: [],
    borradologico: false,
  });

  const [errors, setErrors] = useState<IErrorsRegister>({
    name: "*",
    email: "*",
    address: "*",
    city: "*",
    password: "*",
    repeat_password: "*",
    phone: "*",
  });

  const todosLosCamposCompletos = () => {
    return (
      userData.email !== "" &&
      userData.password !== "" &&
      userData.name !== "" &&
      userData.address !== "" &&
      userData.city !== "" &&
      userData.phone !== ""
    );
  };

  const handleImputChange = (event: any) => {
    const { name, value } = event.target;
    const newUserDate = { ...userData, [name]: value };

    setUserDate(newUserDate);
    setErrors(
      validateRegister(newUserDate, [
        "email",
        "password",
        "name",
        "address",
        "city",
        "phone",
        "repeat_password",
      ])
    );
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (userData.password !== userData.repeat_password) {
      alert("Las contraseñas no coinciden");
    } else if (Object.keys(errors).length) {
      alert("Todos los campos son obligatorios");
    } else {
      const { repeat_password, ...userDataToSubmit } = userData;
      const success = await signUp({
        ...userDataToSubmit,
        borradologico: false,
      });
      if (success) {
        router.push("/login");
      } else {
        console.log("Ingreso invalido");
      }
    }
  };

  return (
    <div>
      <form className="max-w-2xl mx-auto " onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Ingrese su Nombre y Apellido"
            required
            onChange={handleImputChange}
            className="daisy-input daisy-input-bordered w-full max-w-xs text-black"
          />
          {errors.name && (
            <p style={{ color: "red", fontSize: "10px", marginTop: "0px" }}>
              {errors.name}
            </p>
          )}
        </div>

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
            type="text"
            name="address"
            id="address"
            placeholder="Ingrese su dirección"
            required
            onChange={handleImputChange}
            className="daisy-input daisy-input-bordered w-full max-w-xs text-black"
          />
          {errors.address && (
            <p style={{ color: "red", fontSize: "10px", marginTop: "0px" }}>
              {errors.address}
            </p>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Ingrese su ciudad"
            required
            onChange={handleImputChange}
            className="daisy-input daisy-input-bordered w-full max-w-xs text-black"
          />
          {errors.city && (
            <p style={{ color: "red", fontSize: "10px", marginTop: "0px" }}>
              {errors.city}
            </p>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Ingrese su celular"
            required
            onChange={handleImputChange}
            className="daisy-input daisy-input-bordered w-full max-w-xs text-black"
          />
          {errors.phone && (
            <p style={{ color: "red", fontSize: "10px", marginTop: "0px" }}>
              {errors.phone}
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

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="repeat_password"
            id="repeat_passwords"
            placeholder="Ingrese su dirección"
            required
            onChange={handleImputChange}
            className="daisy-input daisy-input-bordered w-full max-w-xs text-black"
          />
          {errors.repeat_password && (
            <p style={{ color: "red", fontSize: "10px", marginTop: "0px" }}>
              {errors.repeat_password}
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
          Register
        </button>
      </form>
    </div>
  );
}

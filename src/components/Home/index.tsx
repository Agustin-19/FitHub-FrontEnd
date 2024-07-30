"use client";

import Link from "next/link";
import Image from "next/image";
import imagenRutina from "../../../public/assets/homeimage/imagenRutina.jpg";
import imagenPlan from "../../../public/assets/homeimage/imagenPlan.jpg";

export default function HomeUser() {
  return (
    <div>
      <Link href="/">
        <button className="mt-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
          Volver
        </button>
      </Link>
      <div className="flex justify-evenly m-10">
        <div className="flex flex-col items-center">
          <Image
            src={imagenRutina}
            width={300}
            height={300}
            alt="logo"
            className="rounded-lg"
          />
          <Link href="/home/homeRutinas">
            <button className="mt-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
              Rutinas
            </button>
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={imagenPlan}
            width={300}
            height={300}
            alt="logo"
            className="rounded-lg"
          />
          <Link href="/home/homePlanes">
            <button className="mt-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
              Planes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

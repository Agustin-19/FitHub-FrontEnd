"use client";

import Link from "next/link";
import Image from "next/image";
import imagenRutina from "../../../public/assets/homeimage/imagenRutina.jpg";
import imagenPlan from "../../../public/assets/homeimage/imagenPlan.jpg";
import escogiendo from "../../../public/assets/homeimage/escogiendo.png";
import styles from "./home.module.css";
import escogiendo2 from "../../../public/assets/homeimage/escogiendo2.png";
import { useState } from "react";

export default function HomeUser() {
  const [currentImage, setCurrentImage] = useState(escogiendo);

  const handleRutinaMouseEnter = () => {
    setCurrentImage(escogiendo2);
  };

  const handlePlanMouseEnter = () => {
    setCurrentImage(escogiendo);
  };

  const handleMouseLeave = () => {
    setCurrentImage(escogiendo);
  };

  return (
    <div>
      <div className={styles.container}>
        <div className="flex justify-evenly m-10">
          <div className="flex flex-col z-10 items-center">
            <Link href="/home/homeRutinas">
              <button
                className={`${styles["button-left"]} my-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]`}
                onMouseEnter={handleRutinaMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Rutinas
              </button>
            </Link>
            <Link href="/home/homeRutinas">
              <div className={styles["image-container"]}>
                <Image
                  src={imagenRutina}
                  width={300}
                  height={300}
                  alt="logo"
                  className={`${styles.image} rounded-lg`}
                  onMouseEnter={handleRutinaMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </Link>
          </div>
          <Image
            src={currentImage}
            width={700}
            height={500}
            alt="Escogiendo"
            className={styles.escogiendo}
          />
          <div className="flex flex-col z-10 items-center ml-44">
            <Link href="/home/homePlanes">
              <button
                className={`${styles["button-right"]} my-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]`}
                onMouseEnter={handlePlanMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Planes
              </button>
            </Link>
            <Link href="/home/homePlanes">
              <div className={styles["image-container"]}>
                <Image
                  src={imagenPlan}
                  width={300}
                  height={300}
                  alt="logo"
                  className={`${styles.image} rounded-lg`}
                  onMouseEnter={handlePlanMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

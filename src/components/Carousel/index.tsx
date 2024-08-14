"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import image1 from "../../../public/assets/carousel/imagen1.png";
import image2 from "../../../public/assets/carousel/imagen2.png";
import image3 from "../../../public/assets/carousel/imagen3.png";

export function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide % 3) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden z-10 h-[500px] ">
      {" "}
      {/* Puedes cambiar el valor de altura */}
      <div
        className={`daisy-carousel-item relative w-full transition-transform duration-500 ease-in-out ${
          currentSlide === 1 ? "block" : "hidden"
        }`}
      >
        <Image
          src={image1}
          alt=""
          className="w-full h-full object-cover object-center" // Añadido h-full y object-center
        />
      </div>
      <div
        className={`daisy-carousel-item relative w-full transition-transform duration-500 ease-in-out ${
          currentSlide === 2 ? "block" : "hidden"
        }`}
      >
        <Image
          src={image2}
          alt=""
          className="w-full h-full object-cover object-center" // Añadido h-full y object-center
        />
      </div>
      <div
        className={`daisy-carousel-item relative w-full transition-transform duration-500 ease-in-out ${
          currentSlide === 3 ? "block" : "hidden"
        }`}
      >
        <Image
          src={image3}
          alt=""
          className="w-full h-full object-cover object-center" // Añadido h-full y object-center
        />
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Importa los estilos de AOS

// Función para animar el conteo de números
const useCountUp = (end: number, duration: number) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 10);
    const handle = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(handle);
        start = end;
      }
      setCount(Math.floor(start));
    }, 10);

    return () => clearInterval(handle);
  }, [end, duration]);

  return count;
};

export default function SummaryStats() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const expertCoaches = useCountUp(140, 1000);
  const activePrograms = useCountUp(500, 1000);
  const happySubscribers = useCountUp(1200, 1000);

  return (
    <div className=" relative z-10 summary-stats p-8 rounded-lg shadow-md ">
      <div className="stats-container flex justify-around items-center gap-8">
        <div className="stat-item text-center" data-aos="fade-up">
          <span className="block text-4xl font-bold text-[#FF3E1A]">
            +{expertCoaches}
          </span>
          <span className="block text-lg font-medium text-[#97D6DF]">
            Entrenadores Expertos
          </span>
        </div>
        <div
          className="stat-item text-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <span className="block text-4xl font-bold text-[#FF3E1A]">
            +{activePrograms}
          </span>
          <span className="block text-lg font-medium text-[#97D6DF]">
            Programas Activos
          </span>
        </div>
        <div
          className="stat-item text-center"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <span className="block text-4xl font-bold text-[#FF3E1A]">
            +{happySubscribers}
          </span>
          <span className="block text-lg font-medium text-[#97D6DF]">
            Suscriptores Felices
          </span>
        </div>
      </div>
    </div>
  );
}

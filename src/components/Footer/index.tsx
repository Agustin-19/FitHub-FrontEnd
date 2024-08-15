import Link from "next/link";
import "../../app/globals.css";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export function Footer() {
  return (
    <div className="relative  z-10 backdrop-blur-sm">
      <div className="bottom-[3000px] left-0 w-full overflow-hidden ">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-[#447988]"
          ></path>
        </svg>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 p-10 gap-10 text-center">
          <div className="flex flex-col gap-5 p-4">
            <h2 className="text-3xl text-[#FF3E1A]">FitHub</h2>
            <p>
              Desarrolladores apasionados, creando soluciones innovadoras con
              compromiso y creatividad.
            </p>
          </div>
          <div className="flex flex-col  items-center gap-5 p-4">
            <h2 className="text-3xl text-[#FF3E1A]">Contacto</h2>
            <ul className="list-none p-0">
              <li className="flex items-center gap-2 mb-4">
                {" "}
                {/* Ajusta el margen inferior aquí */}
                <PhoneIcon className="w-6 h-6 text-[#25D366] ml-[90px]" />{" "}
                Whatsapp: +51 999 999 999
              </li>
              <li className="flex items-center gap-2">
                <EnvelopeIcon className="w-6 h-6 text-[#FF3E1A] " /> Email:
                fithub.entrenadorpersonalizado@gmail.com
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-5 p-4 ">
            <h2 className="text-3xl text-[#FF3E1A]">Más información</h2>
            <ul>
              <li>
                <Link href="/registerCoach" className="hover:text-[#FF3E1A]">
                  ¿Quieres ser entrenador?
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-5 p-4 ">
            <h2 className="text-3xl text-[#FF3E1A]">Nuestros Creadores</h2>
            <ul>
              <li>
                <Link
                  href="https://www.linkedin.com/in/alexis-guastalli/"
                  className="hover:text-[#FF3E1A]"
                >
                  Guastalli Alexis Dante
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/laura-larrotta-lh/"
                  className="hover:text-[#FF3E1A]"
                >
                  Larrotta Laura
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/mat%C3%ADas-ottersttet/"
                  className="hover:text-[#FF3E1A]"
                >
                  Ottersttet Matías Agustín
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/evaristo-aguirre/"
                  className="hover:text-[#FF3E1A]"
                >
                  Aguirre Evaristo
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/pieronileonardo/"
                  className="hover:text-[#FF3E1A]"
                >
                  Pieroni Leonardo
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/feed/"
                  className="hover:text-[#FF3E1A]"
                >
                  Sarkis Delfina
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center  p-4">
          <p>&copy; {new Date().getFullYear()} Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  );
}

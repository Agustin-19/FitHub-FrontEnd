import { Carousel } from "@/components/Carousel";
import SummaryStats from "@/components/SummaryStats";
import CoachList from "@/components/Coach/CoachList";
import Link from "next/link";
import LoginLogout from "@/components/Login-Logout";
import { InfoLandingComponent } from "./indexInfo";
import RutinaListLanding from "@/components/RoutinesList/indexLanding";

export default function LandingPage() {
  return (
    <div>
      <div className="flex justify-center">
        <div className=" hidden ">
          <LoginLogout />
        </div>
      </div>
      <div className="flex justify-center">
        <h1 className="relative z-[2] text-7xl text-[#ff1a1a] font-extrabold text-center mt-10">
          ¡Bienvenido a FitHub!
        </h1>
      </div>
      <div className="flex justify-center mb-10">
        <Link href="/home">
          <button className="m-4 text-2xl relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
            INGRESAR A FITHUB
          </button>
        </Link>
      </div>
      <div>
        <section id="carousel" className="mb-5">
          <Carousel />
        </section>
      </div>

      <div id="info" className="mb-5">
        <InfoLandingComponent />
      </div>
      <section id="programs" className="mb-5">
        <div>
          <h1 className="text-center relative z-[2] text-[#FF3E1A] text-5xl font-extrabold leading-tight bg-clip-text  text-centertext-transparent bg-gradient-to-r from-[#FF3E1A] via-[#FF6F3E] to-[#FF9E3E] shadow-lg mb-12">
            Algunas de Nuestras Mejores Rutinas
          </h1>
          <RutinaListLanding />
        </div>
      </section>
      <section id="coaches">
        <CoachList />
      </section>

      <section>
        <SummaryStats />
      </section>
    </div>
  );
}

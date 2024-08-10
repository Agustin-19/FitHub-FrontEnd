import { Carousel } from "@/components/Carousel";
import SummaryStats from "@/components/SummaryStats";
import CoachList from "@/components/Coach/CoachList";
import Link from "next/link";
import LoginLogout from "@/components/Login-Logout";
import SearchRutina from "@/components/SearchRutina";
import { InfoLandingComponent } from "./indexInfo";

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
        <section id="carousel" className="mb-10">
          <Carousel />
        </section>
      </div>

      <div className="my-60">
        <InfoLandingComponent />
      </div>
      <section id="programs" className="mb-10">
        <SearchRutina />
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

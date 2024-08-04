import { Carousel } from "@/components/Carousel";
import SummaryStats from "@/components/SummaryStats";
import Programs from "@/components/Programs";
import CoachList from "@/components/CoachList";
import Link from "next/link";
import LoginLogout from "@/components/Login-Logout";

export default function LandingPage() {
  return (
    <div>
      <div className="flex justify-center">
        <Link href="/home">
          <button className="m-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
            INGRESAR
          </button>
        </Link>
        <div className=" hidden ">
          <LoginLogout />
        </div>
      </div>
      <div>
        <section className="mb-8 ">
          <Carousel />
        </section>
      </div>
      <section className="mb-10">
        <SummaryStats />
      </section>
      <section id="programs" className="mb-10">
        <Programs />
      </section>
      <section id="coaches" className="mb-10">
        <CoachList />
      </section>
    </div>
  );
}

import { RegisterCoachComponent } from "@/components/RegisterCoach";
import { InfoCoachComponent } from "@/components/RegisterCoach/indexInfo";
import Link from "next/link";

export default function RegisterCoach() {
  return (
    <div>
      <Link href="/">
        <button className="m-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
          Volver
        </button>
      </Link>
      <div>
        <InfoCoachComponent />
      </div>
      <div className="my-11">
        <RegisterCoachComponent />
      </div>
      <div className=" relative z-10 m-5 flex gap-4 items-center justify-center mx-36 border-4 border-[#97D6DF] bg-[#97D6DF]/10  p-7 rounded-lg text-white">
        <ul>
          <li className="text-lg">
            1- Sube tu CV en formato PDF: Queremos conocer tu trayectoria. Sube
            tu currículum vitae para que los usuarios puedan ver tus
            credenciales y habilidades.
          </li>
          <li className="text-lg">
            2- Graba un video de presentación: ¡Muéstrales quién eres! Graba un
            breve video en el que te presentes, hables sobre tus métodos de
            entrenamiento y compartas tu pasión por el fitness.
          </li>
          <li className="text-lg">
            3- Publica tus rutinas y planes: Una vez aprobado como Entrenador,
            podrás crear y publicar tus rutinas de ejercicios, planes
            nutricionales y consejos saludables. ¡Empieza a inspirar a otros hoy
            mismo!
          </li>
        </ul>
      </div>
    </div>
  );
}

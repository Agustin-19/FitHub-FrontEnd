import RutinaList from "../RoutinesList";
import "./programs.module.css";

import { get_Rutinas } from "@/server/fetchRoutines";

const Programas = async () => {
  const rutinas = await get_Rutinas();
  // console.log(rutinas);

  return (
    <div className=" relative z-10 p-8 " data-aos="fade-up">
      <div className="text-center">
        <div className="flex justify-center space-x-4 mb-8">
          <span
            className={` text-5xl font-bold stroke-text animate-fadeIn`}
            data-text="Explora nuestros"
          >
            Explora nuestros
          </span>
          <span className="text-4xl font-bold text-[#97D6DF] animate-fadeIn">
            programas para
          </span>
          <span className="text-5xl font-bold text-[#447988] animate-fadeIn">
            dar forma a tu cuerpo
          </span>
        </div>
      </div>
      <RutinaList rutinas={rutinas} />
    </div>
  );
};

export default Programas;

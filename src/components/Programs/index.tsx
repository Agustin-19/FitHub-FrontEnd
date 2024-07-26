import { rutinas } from "../../../public/data/rutines.data"; // Importa las rutinas
import RutinaList from "../RoutinesList";
import "./programs.module.css";

export default function Programas() {
  return (
    <div className="bg-[#1A1D1A] p-8">
      <div className="text-center">
        <div className="flex justify-center space-x-4 mb-8">
          <span
            className={`text-4xl font-bold stroke-text animate-fadeIn`}
            data-text="Explora nuestros"
          >
            Explora nuestros
          </span>
          <span className="text-4xl font-bold text-[#97D6DF] animate-fadeIn">
            programas para
          </span>
          <span className="text-4xl font-bold text-[#447988] animate-fadeIn">
            dar forma a tu cuerpo
          </span>
        </div>
      </div>
      <RutinaList rutinas={rutinas} />
    </div>
  );
}

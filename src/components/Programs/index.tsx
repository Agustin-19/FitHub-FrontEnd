import RoutinesList from "../RoutinesList";
import "./programs.module.css";

export default function Programas() {
  return (
    <div className="bg-[#1A1D1A] p-8">
      <div className="text-center">
        <div className="mb-8 flex justify-center space-x-4">
          <span
            className={`text-5xl font-bold stroke-text `}
            data-text="Explora nuestros"
          >
            Explora nuestros
          </span>
          <span className="text-4xl font-bold text-[#97D6DF] animate-fadeIn">
            programas para
          </span>
          <span className="text-5xl font-bold text-[#447988] ">
            dar forma a tu cuerpo
          </span>
        </div>
      </div>
      <RoutinesList />
    </div>
  );
}

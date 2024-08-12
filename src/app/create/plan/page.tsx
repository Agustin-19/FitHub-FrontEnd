import PlanForm from "@/components/PlanForm";
import { InfoPlanFormComponent } from "@/components/PlanForm/indexInfo";
import Link from "next/link";

const CreatePlan: React.FC = () => {
  return (
    <div>
      <Link href="/dashboard/create">
        <button className="m-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
          Volver
        </button>
      </Link>
      <div>
        <InfoPlanFormComponent />
      </div>
      <div>
        <PlanForm />
      </div>
      <div className="relative z-10 m-5 flex flex-col mx-36 border-4 border-[#97D6DF] bg-[#97D6DF]/10  p-7 rounded-lg text-white">
        <h3 className="text-2xl font-bold text-center">Formulario</h3>
        <p className="text-lg text-center">
          Rellena el formulario con los detalles de tu actividad: título,
          precio, descripción, país, ubicación en Google Maps, nivel de
          dificultad, categoría e imagen. Una vez enviado, tu actividad quedará
          en suspenso hasta que la administración la apruebe.
        </p>
      </div>
    </div>
  );
};

export default CreatePlan;

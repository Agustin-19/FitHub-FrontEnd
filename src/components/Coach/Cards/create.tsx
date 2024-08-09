import Link from "next/link";
import Image from "next/image";
import imagenRutina from "../../../../public/assets/homeimage/imagenRutina.jpg";
import imagenPlan from "../../../../public/assets/homeimage/imagenPlan.jpg";
import imagenEjercicio from "../../../../public/assets/homeimage/imagenEjercicio.jpg";
import Sidebar from "../Sidebar";

export default function Create() {
  return (
    <div className="flex items-center">
      <div className="text-center text-[#FF3E1A] bg-black">
        <Sidebar />
      </div>
      <div className="text-[#97D6DF] flex  ml-[350px] absolute justify-between">
        <div className="text-center">
          <h3 className="m-5 text-lg text-center">
            ¿Deseas crear una nueva Actividad?
          </h3>
          <Image
            src={imagenPlan}
            width={200}
            height={200}
            alt="logo"
            className="rounded-lg ml-[80px]"
          />
          <Link href="/create/plan">
            <button className="bg-[#FF3E1A] text-white p-2 rounded m-5">
              Crear Actividad
            </button>
          </Link>
        </div>
        <div className="text-center">
          <h3 className="m-5 text-lg text-center">
            ¿Deseas crear una nueva rutina?
          </h3>
          <Image
            src={imagenRutina}
            width={200}
            height={200}
            alt="logo"
            className="rounded-lg  ml-[60px]"
          />
          <Link href="/create/rutina">
            <button className="bg-[#FF3E1A] text-white p-2 rounded m-5">
              Crear Rutina
            </button>
          </Link>
        </div>
        <div className="text-center">
          <h3 className="m-5 text-lg text-center">
            ¿Deseas crear una nuevo ejercicio?
          </h3>
          <Image
            src={imagenEjercicio}
            width={200}
            height={200}
            alt="logo"
            className="rounded-lg  ml-[70px]"
          />
          <Link href="/create/exercise">
            <button className="bg-[#FF3E1A] text-white p-2 rounded m-5">
              Crear Ejercicio
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useContext, useEffect } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { IRutina } from "@/interface/interface";
import { IRutinaEjercicio } from "@/interface/interface";
import { get_RutinaById } from "@/server/fetchRoutines";
import Link from "next/link";
import Image from "next/image";
import ExerciseVideo from "@/components/ExerciseVideo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IRoutineProps {
  params: {
    id: string;
  };
}

const RutinaComprada = ({ params }: IRoutineProps) => {
  const [
    selectedEjercicio,
    setSelectedEjercicio,
  ] = useState<IRutinaEjercicio | null>(null);
  const { isLogged, user } = useContext(UserContext);
  const [routine, setRutina] = useState<IRutina | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const id = params.id;

  // Redirigir si el usuario no está logueado
  useEffect(() => {
    if (!isLogged) {
      router.push("/login");
    }
  }, [isLogged, router]);

  // Fetch de rutina
  useEffect(() => {
    const fetchRutinaID = async () => {
      try {
        const routine = await get_RutinaById(id);
        setRutina(routine);
      } catch (err) {
        setError("Error al obtener las rutinas");
      } finally {
        setLoading(false);
      }
    };
    fetchRutinaID();
  }, [id, isLogged]);

  const imgDefect =
    "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";
  const getImageSrc = (image: string | string[] | null | undefined) => {
    if (typeof image === "string") {
      return image;
    } else if (Array.isArray(image) && image.length > 0) {
      return image[0];
    } else {
      return imgDefect;
    }
  };

  return (
    <div>
      <Link href="/dashboard">
        <button className="m-4 relative z-10 rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
          Volver
        </button>
      </Link>
      <div className="relative z-10">
        <div className="p-4 rounded-lg">
          <div className="flex justify-center gap-5">
            <div className="m-3">
              <h2 className="text-2xl font-bold text-titulos mb-4">
                {routine?.name}
              </h2>
              <div className="relative object-contain w-40 h-40 rounded-t-lg">
                <Image
                  src={
                    routine?.imgUrl && routine.imgUrl.length > 0
                      ? routine.imgUrl[0]
                      : imgDefect
                  }
                  alt={routine?.name || "imagen por defecto"}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={true}
                  className="rounded-t-lg"
                />
              </div>
            </div>
            <div className="m-5">
              <p className="my-4 text-lg">{routine?.description}</p>
              <h3 className="text-sm font-semibold mb-2">
                Categoría/s:{" "}
                {routine?.category && routine.category.length > 0
                  ? routine.category.map((cat) => cat.name).join(", ")
                  : "Sin categoría"}
              </h3>
              <h3 className="text-xl font-semibold mb-2">
                Precio: ${routine?.price}
              </h3>
            </div>
          </div>
          <ul className="flex flex-col justify-center items-center gap-5 ">
            {routine?.exercise?.map((ejercicio) => (
              <li
                key={ejercicio.id}
                className="mb-4 border-2 border-[--titulo] bg-[#97D6DF]/5 p-4 rounded-lg shadow-lg w-3/4 "
              >
                <div className="flex items-center justify-between m-3">
                  <div className="text-center">
                    <h4 className="font-bold text-3xl my-2">
                      {ejercicio.titulo}
                    </h4>
                    <div className="relative object-contain w-40 h-40">
                      <Image
                        src={getImageSrc(ejercicio.imgUrl)}
                        alt={ejercicio.titulo}
                        fill={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={true}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="flex items-center mx-10 text-2xl">
                      {ejercicio.descripcion}
                    </p>
                  </div>
                  <div>
                    <button
                      className="mt-4 relative z-10 rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]"
                      onClick={() => setSelectedEjercicio(ejercicio)}
                    >
                      Ver Video
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {selectedEjercicio && (
            <ExerciseVideo
              ejercicio={selectedEjercicio}
              onClose={() => setSelectedEjercicio(null)}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RutinaComprada;

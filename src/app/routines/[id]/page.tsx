"use client";
import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import ExerciseVideo from "@/components/ExerciseVideo";
import { IRutina, IRutinaEjercicio } from "@/interface/interface";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { get_RutinaById } from "@/server/fetchRoutines";
import { createRutineOrder } from "@/server/fetchMercadoPago";
import Link from "next/link";
import { API } from "@/helpers/helper";

// Declarar globalmente el tipo Window para incluir checkoutButton
declare global {
  interface Window {
    checkoutButton: any;
  }
}

interface IRoutineProps {
  params: {
    id: string;
  };
}

const Routine = ({ params }: IRoutineProps) => {
  const { isLogged, user } = useContext(UserContext);
  const id = params.id;
  const [
    selectedEjercicio,
    setSelectedEjercicio,
  ] = useState<IRutinaEjercicio | null>(null);

  const [routine, setRutina] = useState<IRutina | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRutinaID = async () => {
      try {
        const response = await fetch(`${API}/rutina/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener la rutina");
        }
        const data = await response.json();

        setRutina(data);
      } catch (err) {
        setError("Error al obtener la rutina");
      } finally {
        setLoading(false);
      }
    };
    fetchRutinaID();
  }, [id]);

  useEffect(() => {
    initMercadoPago("APP_USR-170df093-20f9-45fb-9bb2-11eb49586790", {
      locale: "es-AR",
    });
  }, []);

  if (loading) {
    return <div className="text-center text-white">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  const handlePurchase = async () => {
    if (!isLogged) {
      alert("Debes iniciar sesión para comprar la rutina.");
      router.push("/login");
      return;
    }

    try {
      const rutinaData = {
        id: user?.sub,
        rutinaId: id,
        title: routine?.name,
        quantity: 1,
        unit_price: Number(routine?.price),
      };

      const preference = await createRutineOrder(rutinaData);
      setPreferenceId(preference.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    await handlePurchase();
  };

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
      <Link href="/home/homeRutinas">
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
              <p className="my-4">{routine?.description}</p>
              <h3 className="text-sm font-semibold mb-2">
                Categoría/s:{" "}
                {routine?.category && routine.category.length > 0
                  ? routine.category.map((cat) => cat.name).join(", ")
                  : "Sin categoría"}
              </h3>
              <h3 className="text-xl font-semibold mb-2">
                Precio: ${routine?.price}
              </h3>
              <button
                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                onClick={handleBuy}
              >
                Comprar Rutina
              </button>
              {preferenceId && (
                <Wallet
                  initialization={{ preferenceId: preferenceId }}
                  customization={{ texts: { valueProp: "smart_option" } }}
                />
              )}
            </div>
          </div>
          <ul>
            {routine?.exercise?.map((ejercicio) => (
              <li
                key={ejercicio.id}
                className="mx-40 my-5 border-2 border-[--titulo] bg-[#97D6DF]/5 p-4 rounded-lg shadow-lg"
              >
                <div className="flex gap-3 align-middle m-3">
                  <div className="text-center">
                    <h4 className="font-bold text-3xl m-2">
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
                  <p className="flex items-center ml-24 text-2xl">
                    Para ver el Detalle del ejercicio debes realizar la compra
                    de la rutina: {routine?.name}
                  </p>
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
    </div>
  );
};

export default Routine;

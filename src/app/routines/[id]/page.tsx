"use client";
import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import ExerciseVideo from "@/components/ExerciseVideo";
import { IRutina, IRutinaEjercicio } from "@/interface/interface";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

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
  const [selectedEjercicio, setSelectedEjercicio] =
    useState<IRutinaEjercicio | null>(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const { isLogged } = useContext(UserContext);

  const id = params.id;
  const [routine, setRutina] = useState<IRutina>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRutinaID = async () => {
      try {
        const response = await fetch(`http://localhost:3001/rutina/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener las rutinas");
        }
        const routine = await response.json();
        setRutina(routine);
      } catch (err) {
        setError("Error al obtener las rutinas");
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
        title: routine?.name,
        quantity: 1,
        unit_price: 100,
      };

      const response = await fetch(
        "http://localhost:3001/rutina/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rutinaData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear la orden");
      }

      const preference = await response.json();
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
    <div className=" ">
      <div className=" p-4 rounded-lg ">
        <div className=" flex justify-center gap-5">
          <div className="m-3">
            <h2 className="text-2xl font-bold text-titulos mb-4">
              {routine?.name}
            </h2>
            <div className="relative object-contain w-40 h-40 rounded-t-lg">
              <Image
                src={routine?.imgUrl || imgDefect}
                alt={routine?.name || "imagen por defecto"}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={true}
                className="rounded-t-lg"
              />
            </div>
          </div>
          <div className="m-5 ">
            <p className="my-4">{routine?.description}</p>
            <h3 className="text-xl font-semibold mb-2">Ejercicios</h3>
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
            <li key={ejercicio.id} className="mb-2 border-2 border-[--titulo]">
              <div className="flex gap-3 align-middle">
                <div className="m-2 text-center">
                  <h4 className="font-bold m-1">{ejercicio.titulo}</h4>
                  <div className="relative object-contain w-40 h-40 rounded-t-lg">
                    <Image
                      src={getImageSrc(ejercicio.imgUrl)}
                      alt={ejercicio.titulo}
                      fill={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={true}
                      className="rounded-t-lg"
                    />
                  </div>
                  {isPurchased ? (
                    <button
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                      onClick={() => setSelectedEjercicio(ejercicio)}
                    >
                      Ver Video
                    </button>
                  ) : (
                    <button
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                      onClick={() => alert("Debes comprar la rutina")}
                    >
                      Ver Video
                    </button>
                  )}
                </div>
                <div className=" text-center m-3 mt-10">
                  <p>{ejercicio.description}</p>
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
  );
};

export default Routine;

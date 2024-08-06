"use client";
import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { IPlan } from "@/interface/plan.interface";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import Link from "next/link";
import { createPlanOrder } from "@/server/fetchMercadoPago";

// Declarar globalmente el tipo Window para incluir checkoutButton
declare global {
  interface Window {
    checkoutButton: any;
  }
}

interface IPlanProps {
  params: {
    id: string;
  };
}

const PlanDetail = ({ params }: IPlanProps) => {
  const { isLogged, user } = useContext(UserContext);

  const id = params.id;
  const [plan, setPlan] = useState<IPlan>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlanID = async () => {
      try {
        const response = await fetch(`http://localhost:3001/plan/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener el plan");
        }
        const planData = await response.json();
        setPlan(planData);
      } catch (err) {
        setError("Error al obtener el plan");
      } finally {
        setLoading(false);
      }
    };
    fetchPlanID();
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
      alert("Debes iniciar sesión para comprar el plan.");
      router.push("/login");
      return;
    }

    try {
      const planData = {
        id: user?.sub,
        planId: id,
        title: plan?.name,
        quantity: 1,
        unit_price: Number(plan?.price),
      };

      console.log(planData);
      const preference = await createPlanOrder(planData);
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

  return (
    <div className="relative z-10">
      <Link href="/home/homePlanes">
        <button className="mt-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
          Volver
        </button>
      </Link>
      <div className="p-4 rounded-lg">
        <div className="flex justify-center gap-5">
          <div className="m-3">
            <h2 className="text-2xl font-bold text-titulos mb-4">
              {plan?.name}
            </h2>
            <div className="relative object-contain w-40 h-40 rounded-t-lg">
              <Image
                src={plan?.imgUrl || imgDefect}
                alt={plan?.name || "imagen por defecto"}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={true}
                className="rounded-t-lg"
              />
            </div>
          </div>
          <div className="m-5">
            <p className="my-4">{plan?.description}</p>
            <h3 className="text-xl font-semibold mb-2">Detalles del Plan</h3>
            <p className="mb-2">
              <span className="font-bold">Ubicación:</span>{" "}
              {plan?.location || "No especificado"}
            </p>
            <p className="mb-2">
              <span className="font-bold">Categorías:</span>
              {Array.isArray(plan?.category)
                ? plan.category.map((cat) => cat).join(", ")
                : "No especificado"}
            </p>
            <p className="mb-2">
              <span className="font-bold">Precio:</span> $
              {plan?.price || "No especificado"}
            </p>
            <p className="mb-2">
              <span className="font-bold">Activo:</span>{" "}
              {plan?.isActive ? "Sí" : "No"}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              onClick={handleBuy}
            >
              Comprar Plan
            </button>
            {preferenceId && (
              <Wallet
                initialization={{ preferenceId: preferenceId }}
                customization={{ texts: { valueProp: "smart_option" } }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetail;

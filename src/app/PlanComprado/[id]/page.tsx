"use client";

import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { IPlan } from "../../../interface/plan.interface";
import Link from "next/link";
import Image from "next/image";
import Maps from "@/components/Maps/map";

import { API } from "@/helpers/helper";
import { get_PlanById } from "@/server/fetchPlan";

interface IPlanProps {
  params: {
    id: string;
  };
}

const PlanComprado = ({ params }: IPlanProps) => {
  const [plan, setPlan] = useState<IPlan | null>(null);
  const { isLogged, user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const id = params.id;

  useEffect(() => {
    if (!isLogged) {
      router.push("/login");
    }
  }, [isLogged, router]);

  useEffect(() => {
    const fetchPlanID = async () => {
      try {
        const plan = await get_PlanById(id);
        setPlan(plan);
      } catch (err) {
        setError("Error al obtener las rutinas");
      } finally {
        setLoading(false);
      }
    };
    fetchPlanID();
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

  const handleMapChange = (lat: number, lng: number) => {
    setPlan((prevState) => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        latitude: Number(lat),
        longitude: Number(lng),
      };
    });
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
          <div className="flex justify-center bg-[#97D6DF]/5 p-6 rounded-lg shadow-lg">
            <div className="m-3 ">
              <h2 className="text-2xl font-bold text-titulos mb-4">
                {plan?.name}
              </h2>
              <div className="relative object-contain w-40 h-40 rounded-t-lg">
                <Image
                  src={
                    Array.isArray(plan?.imgUrl) && plan.imgUrl.length > 0
                      ? plan.imgUrl[0][0]
                      : imgDefect
                  }
                  alt={plan?.name || "imagen por defecto"}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={true}
                  className="rounded-t-lg"
                />
              </div>
            </div>
            <div className="m-5">
              <p className="my-4 text-lg">{plan?.description}</p>
              <h3 className="text-sm font-semibold mb-2">
                Categoría/s:{" "}
                {plan?.category && plan.category.length > 0
                  ? plan.category.map((cat) => cat.name).join(", ")
                  : "Sin categoría"}
              </h3>
              <h3 className="text-xl font-semibold mb-2">
                Precio: ${plan?.price}
              </h3>
            </div>
          </div>
          <div
            style={{
              height: "60vh",
              width: "60vh",
              border: "5px solid #97D6DF",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              margin: "20px auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {plan && (
              <Maps
                latitude={parseFloat(plan.latitude.toString()) || 0}
                longitude={parseFloat(plan.longitude.toString()) || 0}
                onMarkerClick={(lat, lng) => handleMapChange(lat, lng)}
                onCameraChange={(lat, lng) => handleMapChange(lat, lng)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanComprado;

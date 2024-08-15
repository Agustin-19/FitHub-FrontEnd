import { IPlan } from "@/interface/plan.interface";
import { delete_Plan, get_Plan } from "@/server/fetchPlan";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPlansList: React.FC = () => {
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      const response = await delete_Plan(id);

      if (response.ok) {
        toast.success("El plan fue eliminado", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      // Elimina el plan del estado
      setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
    } catch (err) {
      setError("No se pudo eliminar el plan");
    }
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plansData = await get_Plan();
        setPlans(plansData);
      } catch (err) {
        setError("Error al obtener los planes");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) return <p>Cargando planes...</p>;
  if (error) return <p>{error}</p>;

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
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 m-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative w-full h-48">
              <Image
                src={getImageSrc(plan.imgUrl)}
                alt={plan.name}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={true}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-3">
              <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
              <p className="text-gray-600 mb-2">{plan.description}</p>
              <p className="text-gray-700 mb-2">
                Categorias: {plan.category.map((cat) => cat.name).join(", ")}
              </p>
              <p className="text-gray-700 font-semibold mb-2">
                Ubicación: {plan.location}
              </p>
              <p className="text-gray-700 font-semibold mb-4">${plan.price}</p>
              <button
                className="mt-4 inline-block px-3 py-1 bg-[#FF3E1A] text-white rounded-lg hover:bg-[#FF5722] transition-colors"
                onClick={() => handleDelete(plan.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPlansList;

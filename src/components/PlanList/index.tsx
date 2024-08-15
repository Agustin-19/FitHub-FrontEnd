import { IPlan } from "@/interface/plan.interface";
import Image from "next/image";
import Link from "next/link";

interface PlanListProps {
  plans: IPlan[];
}

const PlanList: React.FC<PlanListProps> = ({ plans }) => {
  console.log(plans);

  const imgDefect =
    "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";

  return (
    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 m-4">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className=" border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
        >
          <div className="relative w-full h-48">
            <Image
              src={plan.imgUrl || imgDefect}
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
            <p className="text-gray-700 font-semibold mb-4">{plan.location}</p>
            <p className="text-gray-700 mb-2">
              Categoría/s:{" "}
              {plan.category && plan.category.length > 0
                ? plan.category.map((cat) => cat.name).join(", ")
                : "Sin categoría"}
            </p>
            <p className="text-gray-700 font-semibold mb-4">${plan.price}</p>
            <Link
              href={`/plans/${plan.id}`}
              className="mt-4 inline-block px-3 py-1 bg-[#FF3E1A] text-white rounded-lg hover:bg-[#FF5722] transition-colors"
            >
              Ver Detalles
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanList;

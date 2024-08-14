import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const LineChart: React.FC = () => {
  const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Ventas Mensuales",
        data: [30, 20, 50, 40, 70],
        borderColor: "rgba(255,87,34,1)", // Rojo Vibrante
        backgroundColor: "rgba(255,87,34,0.2)", // Rojo Vibrante con opacidad
        tension: 0.4, // Línea más curva
        borderWidth: 5,
      },
    ],
  };

  return (
    <div className="w-[500px] h-[250px]   bg-[#000] border-10 ">
      <Line data={data} />
    </div>
  );
};

export default LineChart;

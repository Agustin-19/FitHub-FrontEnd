import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const BarChart: React.FC = () => {
  const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Alumnos inscritos",
        data: [30, 20, 50, 40, 70],
        borderColor: "rgba(255,87,34,1)", // Rojo Vibrante
        backgroundColor: "rgba(255,87,34,0.2)", // Rojo Vibrante con opacidad
        borderWidth: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Meses",
        },
      },
      y: {
        title: {
          display: true,
          text: "Alumnos Inscritos",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-black  border-10 w-[450px] h-[250px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;

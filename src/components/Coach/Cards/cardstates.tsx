import React from "react";
import PropTypes from "prop-types";

// Define la interfaz para las props
interface CardStatsProps {
  statSubtitle?: string;
  statTitle?: string;
  statArrow?: "up" | "down";
  statPercent?: string;
  statPercentColor?: string;
  statDescription?: string; // Corregido el nombre aquí
  statIconName?: string;
  statIconColor?: string;
}

export default function CardStats({
  statSubtitle = "Visitas",
  statTitle = "350,897",
  statArrow = "up",
  statPercent = "3.48",
  statPercentColor = "text-emerald-500",
  statDescription = "Since last month",
  statIconName = "far fa-chart-bar",
  statIconColor = "bg-red-500",
}: CardStatsProps) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                {statSubtitle}
              </h5>
              <span className="font-semibold text-xl text-blueGray-700">
                {statTitle}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  statIconColor
                }
              >
                <i className={statIconName}></i>
              </div>
            </div>
          </div>
          <p className="text-sm text-blueGray-400 mt-4">
            <span className={statPercentColor + " mr-2"}>
              <i
                className={
                  statArrow === "up"
                    ? "fas fa-arrow-up"
                    : statArrow === "down"
                    ? "fas fa-arrow-down"
                    : ""
                }
              ></i>{" "}
              {statPercent}%
            </span>
            <span className="whitespace-nowrap">{statDescription}</span>
          </p>
        </div>
      </div>
    </>
  );
}

// Definición de las PropTypes para validación en runtime (opcional en TypeScript)
CardStats.propTypes = {
  statSubtitle: PropTypes.string,
  statTitle: PropTypes.string,
  statArrow: PropTypes.oneOf(["up", "down"]),
  statPercent: PropTypes.string,
  statPercentColor: PropTypes.string,
  statDescription: PropTypes.string, // Corregido el nombre aquí
  statIconName: PropTypes.string,
  statIconColor: PropTypes.string,
};

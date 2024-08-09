import React from "react";

// components

import CardSettings from "@/components/Coach/Cards/cardsettings";

export default function Settings() {
  return (
    <>
      <div className="flex relative z-10">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
      </div>
    </>
  );
}

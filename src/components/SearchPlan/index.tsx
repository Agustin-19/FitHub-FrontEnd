"use client";
import { PlanContext } from "@/context/planContext";
import { useContext } from "react";
import PlanList from "../PlanList";
import SearchComponent from "../SearchComponents";

const SearchPlan: React.FC = () => {
  const { plans, error, getAllPlanes } = useContext(PlanContext);

  return (
    <SearchComponent
      fetchItems={getAllPlanes}
      renderList={(items) => <PlanList plans={items} />}
      error={error}
    />
  );
};

export default SearchPlan;

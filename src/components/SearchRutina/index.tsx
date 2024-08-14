'use client'
import { RutinaContext } from "@/context/trainingContext";
import { useContext } from "react";
import RutinaList from "../RoutinesList";
import SearchComponent from "../SearchComponents";

const SearchRutina: React.FC = () => {
    const { rutinas, error, getAllRutinas } = useContext(RutinaContext);

    return (
        <SearchComponent
            fetchItems={getAllRutinas}
            renderList={(items) => <RutinaList rutinas={items} />}
            error={error}
        />
    );
};

export default SearchRutina;

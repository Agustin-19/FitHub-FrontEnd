import { useState } from "react";
import { rutinas } from "../../../public/data/rutines.data";

export default function RoutinesList() {
  const [categoria, setCategoria] = useState("");
  const [precioMaximo, setPrecioMaximo] = useState(100);

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoria(e.target.value);
  };

  const handlePrecioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrecioMaximo(Number(e.target.value));
  };

  const filteredRutinas = rutinas.filter((rutina) => {
    const matchesCategoria = categoria ? rutina.categoria === categoria : true;
    const matchesPrecio = rutina.precio <= precioMaximo;
    return matchesCategoria && matchesPrecio;
  });

  return (
    <div className="text-black bg-gray-100">
      <h1>Lista de rutinas</h1>
      <div>
        <label>
          Categoría:
          <select value={categoria} onChange={handleCategoriaChange}>
            <option value="">Todas</option>
            <option value="Fuerza">Fuerza</option>
            <option value="Cardio">Cardio</option>
            <option value="Flexibilidad">Flexibilidad</option>
            <option value="Core">Core</option>
          </select>
        </label>
        <label>
          Precio máximo:
          <input
            type="number"
            value={precioMaximo}
            onChange={handlePrecioChange}
          />
        </label>
      </div>
      <ul>
        {filteredRutinas.map((rutina) => (
          <li key={rutina.id}>
            <h2>{rutina.name}</h2>
            <p>{rutina.description}</p>
            <p>Precio: ${rutina.precio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

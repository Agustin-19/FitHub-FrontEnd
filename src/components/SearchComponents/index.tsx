'use client';
import { useContext, useEffect, useState } from "react";
import RutinaList from "../RoutinesList";
import { RutinaContext } from "@/context/trainingContext";
import { IRutina } from "@/interface/interface";

const SearchComponents: React.FC = () => {
    const { rutinas, setRutinas, error, setError, getAllRutinas } = useContext(RutinaContext);

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useState({
        limit: '',
        category: '',
        location: '',
        difficultyLevel: '',
        search: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        });
    };

    const handleChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        const { name, value } = event.target;
        setSearchParams(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const fetchRutinas = async () => {
        const { limit, category, location, difficultyLevel, search } = searchParams;
        setLoading(true);
        try {
            const queryString = {
                page: page.toString(),
                limit,
                category,
                location,
                difficultyLevel,
                search,
            };

            const data = await getAllRutinas(queryString);
            setRutinas(data);
        } catch (err) {
            setError("Error al obtener las rutinas");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRutinas();
    }, []);

    const handlePrevious = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
        fetchRutinas(); // Fetch routines for the new page
    };

    const handleNext = () => {
        setPage(prevPage => prevPage + 1);
        fetchRutinas(); // Fetch routines for the new page
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPage(1);
        fetchRutinas();
    };

    if (loading) {
        return <div className="text-center text-white">Cargando...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="bg-[#1A1D1A] p-8">
            <div className="text-center">
                <div className="flex justify-center space-x-4 mb-8">
                    <span className="text-4xl font-bold stroke-text animate-fadeIn" data-text="Explora nuestros">
                        Explora nuestros
                    </span>
                    <span className="text-4xl font-bold text-[#97D6DF] animate-fadeIn">
                        SearchComponents para
                    </span>
                    <span className="text-4xl font-bold text-[#447988] animate-fadeIn">
                        dar forma a tu cuerpo
                    </span>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex space-x-4">
                    <input
                        type="text"
                        name="search"
                        placeholder="Buscar..."
                        value={searchParams.search}
                        onChange={handleChange}
                        className="p-2 rounded border"
                    />
                    <select name="category" value={searchParams.category} onChange={handleChange} className="p-2 rounded border">
                        <option value="">Categoría</option>
                        <option value="e7775355-f280-420d-ad54-3a88d370437e">Gimnasia</option>
                        <option value="f5abde3a-443c-44f6-9aa1-3fb8c147c93c">Tenis</option>
                    </select>
                    <select name="difficultyLevel" value={searchParams.difficultyLevel} onChange={handleChangeSelect} className="p-2 rounded border">
                        <option value="">Nivel de Dificultad</option>
                        <option value="inicial">Inicial</option>
                        <option value="intermedio">Intermedio</option>
                        <option value="avanzado">Avanzado</option>
                        <option value="profesional">Profesional</option>
                    </select>
                    <button type="submit" className="p-2 rounded bg-blue-500 text-white">Buscar</button>
                </div>
            </form>
            <RutinaList rutinas={rutinas} />
            <div className="daisy-join">
                <button className="daisy-join-item daisy-btn" onClick={handlePrevious}>«</button>
                <button className="daisy-join-item daisy-btn">Page {page}</button>
                <button className="daisy-join-item daisy-btn" onClick={handleNext}>»</button>
            </div>
        </div>
    );
}

export default SearchComponents;

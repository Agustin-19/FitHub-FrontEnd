import { IRutina } from '@/interface/interface';
import { delete_Rutina, get_Rutinas } from '@/server/fetchRoutines';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const AdminRutinasList: React.FC = () => {
    const [rutinas, setRutinas] = useState<IRutina[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
            try {
                await delete_Rutina(id); // Usa la función importada
    
                // Elimina la rutina del estado
                setRutinas((prevRutinas) => prevRutinas.filter((rutina) => rutina.id !== id));
            } catch (err) {
                setError('No se pudo eliminar la rutina');
            }

    };

    useEffect(() => {
        const fetchRutinas = async () => {
            try {
                const rutinasData = await get_Rutinas();
                setRutinas(rutinasData);
            } catch (err) {
                setError('Error al obtener las rutinas');
            } finally {
                setLoading(false);
            }
        };

        fetchRutinas();
    }, []);

    if (loading) return <p>Cargando rutinas...</p>;
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
                {rutinas.map((rutina) => (
                    <div
                        key={rutina.id}
                        className=" border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
                    >
                        <div className="relative w-full h-48">
                            <Image
                                src={getImageSrc(rutina.imgUrl)}
                                alt={rutina.name}
                                fill={true}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={true}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="p-3">
                            <h2 className="text-xl font-bold mb-2">{rutina.name}</h2>
                            <p className="text-gray-600 mb-2">{rutina.description}</p>
                            <p className="text-gray-700 mb-2">
                                Categorias:
                                {""} {rutina.category.map((cat) => cat.name).join(", ")}
                            </p>
                            <p className="text-gray-700 font-semibold mb-4">${rutina.price}</p>
                            <button
                                className="mt-4 inline-block px-3 py-1 bg-[#FF3E1A] text-white rounded-lg hover:bg-[#FF5722] transition-colors"
                                onClick={() => handleDelete(rutina.id)}>
                                Eliminar
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminRutinasList;

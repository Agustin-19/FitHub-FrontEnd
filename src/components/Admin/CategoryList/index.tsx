import { ICategory } from '@/interface/plan.interface';
import { get_Category } from '@/server/fetchPlan';
import React, { useState, useEffect } from 'react';

export default function CategoryList() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await get_Category();
                setCategories(categories);
            } catch (err) {
                setError('Failed to fetch categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []); // El array vacío asegura que esto se ejecute solo una vez cuando el componente se monte

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2 className="text-xl text-[--botones] font-extrabold text-center mt-10">Lista de Categorias</h2>
            <ul className='grid grid-cols-2 md:grid-cols-3 mb-5 lg:grid-cols-4 gap-2 p-2 border max-w-96 lg:max-w-[30rem] border-white'>
                {categories.map((category) => (
                    <li
                        className='bg-gray-900 p-2 text-center text-white m-2 border border-white'
                        key={category.id}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

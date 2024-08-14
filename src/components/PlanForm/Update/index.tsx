"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ICategory, IPlan, IPlanUpdate } from "@/interface/plan.interface";
import { get_PlanById, update_Plan, get_Category } from "@/server/fetchPlan";
import { uploaFile } from "@/server/fetchFile";
import Maps from "../../Maps/map";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../planform.module.css";

interface UpdatePlanProps {
    id: string;
}

export default function UpdatePlan({ id }: UpdatePlanProps) {
    const router = useRouter();
    const token: string =
        (typeof window !== "undefined" && localStorage.getItem("token")) || "";

    const [plan, setPlan] = useState<IPlan | null>(null);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    useEffect(() => {
        if (typeof id === "string") {
            const fetchPlan = async () => {
                try {
                    const data = await get_PlanById(id);
                    setPlan(data);
                    
                    setLatitude(data.latitude.toString());
                    setLongitude(data.longitude.toString());
                    setSelectedCategory(data.category[0].id || '');
                    
                } catch (error) {
                    console.error("Error fetching plan:", error);
                }
            };
            fetchPlan();
        }

        const fetchCategories = async () => {
            try {
                const data = await get_Category();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setPlan((prevState) => prevState && ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleChangeSelectCat: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        const { value } = event.target;
        setSelectedCategory(value);
        
    };
    const handleChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        const { id, value } = event.target;
        setPlan((prevState) => prevState && ({
            ...prevState,
            [id]: value,
        }));
        console.log(plan);
        
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!plan) return;
        console.log(plan);
        

        const {
            name,
            description,
            location,
            latitude,
            longitude,
            difficultyLevel,
            category,
            price,
            imgUrl,
        } = plan;

        if (!name || !description || !location || !difficultyLevel || !selectedCategory  || !category || !price) {
            toast.error("Por favor completa todos los campos.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }


        try {
            let fileUrl = imgUrl;
            
            if (file) {
                const updateUrl = await uploaFile(file);
                fileUrl = updateUrl[0] 
            }

            const updatedPlan = {
                name,
                categoryToUpdate: [selectedCategory],
                description,
                location,
                latitude,
                longitude,
                difficultyLevel,
                imgUrl: fileUrl,
                price: parseFloat(price),
            };

            console.log(JSON.stringify(updatedPlan));


            const response = await update_Plan(id, updatedPlan, token);
            if (response) {
                if (response.ok) {
                    toast.success("Plan actualizado exitosamente", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setTimeout(() => {
                        router.push("/dashboard");
                    }, 3500);
                }
            } else {
                toast.error("Error al actualizar el plan", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            toast.error("Error al actualizar el plan", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.error("Error:", error);
        }
    };

    const [latitude, setLatitude] = useState("-34.608576");
    const [longitude, setLongitude] = useState("-58.373641");

    const handleMapChange = (lat: number, lng: number) => {
        setLatitude(lat.toString());
        setLongitude(lng.toString());

        setPlan((prevState) => prevState ? {
            ...prevState,
            latitude: lat,
            longitude: lng,
        } : null);
    };

    function setMarkerPosition(arg0: { lat: number; lng: number; }) {
        throw new Error("Function not implemented.");
    }

    return (
        <div>
            <div id="Container" className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h1
                        id="update-title"
                        className="text-5xl text-[#FF3E1A] font-extrabold text-center mb-10"
                    >
                        Actualizar Actividad
                    </h1>
                    <label id="login-label" className="text-[#97D6DF]" htmlFor="name">
                        Título:
                    </label>
                    <input
                        className={styles.input}
                        type="text"
                        id="name"
                        value={plan?.name || ""}
                        onChange={handleChange}
                    />
                    <label id="login-label" htmlFor="price">
                        Precio:
                    </label>
                    <input
                        className={styles.input}
                        type="number"
                        id="price"
                        value={plan?.price || ""}
                        onChange={handleChange}
                    />
                    <label id="login-label" htmlFor="description">
                        Descripción:
                    </label>
                    <input
                        className={styles.input}
                        type="text"
                        id="description"
                        value={plan?.description || ""}
                        onChange={handleChange}
                    />
                    <label id="login-label" htmlFor="location">
                        País:
                    </label>
                    <input
                        className={styles.input}
                        type="text"
                        id="location"
                        value={plan?.location || ""}
                        onChange={handleChange}
                    />
                    <div>
                        <label>Ubicación:</label>
                        <br></br>
                        <label id="latitude" className="text-[#97D6DF] ml-6">
                            Latitud:
                        </label>
                        <input
                            className={styles.input}
                            type="number"
                            id="latitude"
                            value={latitude}
                            onChange={(e) => {
                                setLatitude(e.target.value);
                                setMarkerPosition({
                                    lat: parseFloat(e.target.value),
                                    lng: parseFloat(longitude),
                                });
                            }}
                        />
                        <label id="longitude" className="text-[#97D6DF] ml-6">
                            Longitud:
                        </label>
                        <input
                            className={styles.input}
                            type="number"
                            id="longitude"
                            value={longitude}
                            onChange={(e) => {
                                setLongitude(e.target.value);
                                setMarkerPosition({
                                    lat: parseFloat(latitude),
                                    lng: parseFloat(e.target.value),
                                });
                            }}
                        />
                        <div
                            style={{
                                height: "30vh",
                                width: "30vh",
                                border: "5px solid #97D6DF",
                                display: "flex",
                                flexDirection: "column",
                                position: "relative",
                                margin: "20px auto",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Maps
                                latitude={parseFloat(latitude) || 0}
                                longitude={parseFloat(longitude) || 0}
                                onMarkerClick={(lat, lng) => handleMapChange(lat, lng)}
                                onCameraChange={(lat, lng) => handleMapChange(lat, lng)}
                            />
                        </div>
                    </div>
                    <label id="login-label" htmlFor="difficultyLevel">
                        Nivel de dificultad:
                    </label>
                    <select
                        id="difficultyLevel"
                        value={plan?.difficultyLevel || ""}
                        onChange={handleChangeSelect}
                        className={styles.input}
                    >
                        <option value="" disabled>Seleccionar nivel de dificultad</option>
                        <option value="inicial">Inicial</option>
                        <option value="intermedio">Intermedio</option>
                        <option value="avanzado">Avanzado</option>
                        <option value="profesional">Profesional</option>

                    </select>
                    <label id="login-label" htmlFor="category">
                        Categoría:
                    </label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={handleChangeSelectCat}
                        className={styles.input}
                    >
                        <option value="" disabled>Seleccionar categoría</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="file">
                        Cargar imagen:
                    </label>
                    <input
                        type="file"
                        id="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <button
                        type="submit"
                        className='boton m-4'
                    >
                        Actualizar Plan
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

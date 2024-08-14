import React, { useEffect, useState } from "react";
import Cookie from 'js-cookie';
import { create_Admin, delete_Admin } from "@/server/fetchAmin"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const AdminForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [token, setToken] = useState<string | undefined>("");

    // Utilizamos useEffect para obtener el token al montar el componente
    useEffect(() => {
        const storedToken = Cookie.get("token");
        setToken(storedToken);
    }, []);


    const handleCreateAdmin = async () => {
        if (!token) {
            toast.error("Token no encontrado");
            return;
        }
        try {
            await create_Admin(email, token);

            toast.success("Admin creado exitosamente", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => window.location.reload(),
            });

        } catch (error) {
            toast.error("Error al crear admin");
        }
    };

    const handleDeleteAdmin = async () => {
        if (!token) {
            toast.error("Token no encontrado");
            return;
        }
        try {
            await delete_Admin(email, token);

            toast.success("Admin eliminado exitosamente", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => window.location.reload(),
            });
        } catch (error) {
            toast.error("Error al eliminar admin");
        }
    };

    return (
        <div className="flex flex-col m-5 border border-white p-4">
            <h2
                id="login-title"
                className="text-2xl text-[#FF3E1A] font-extrabold text-center mb-10">
                Administrar Admin
            </h2>
            <label id="login-lable" className="text-[#97D6DF]" htmlFor="name">
                Ingrese el Email:
            </label>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex">

                <button className="m-3 boton-aprobar" onClick={handleCreateAdmin}>Crear Admin</button>
                <button className="m-3 boton-denegar" onClick={handleDeleteAdmin}>Eliminar Admin</button>
            </div>

            <ToastContainer />
        </div>
    );
};

export default AdminForm;

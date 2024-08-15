'use client';

import { ISolicitudes } from "@/interface/admin.interface";
import { getSolicitudes } from "@/server/fetchAmin";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const AdminNavbar = () => {
    const [activeButton, setActiveButton] = useState('/admin');
    const [navbarSticky, setNavbarSticky] = useState(false);
    const [solicitudes, setSolicitudes] = useState<ISolicitudes | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const storedToken = Cookie.get("token");
        if (storedToken) {
            const decodedToken: any = jwtDecode(storedToken);
            if (decodedToken.role === 'superadmin') {
                setIsSuperAdmin(true);
            }
        }
    }, []);

    const handleButtonClick = (path: string) => {
        setActiveButton(path);
        setMenuOpen(false);
    };

    useEffect(() => {
        const fetchSolicitudes = async () => {
            try {
                const data = await getSolicitudes();
                console.log(data);
                setSolicitudes(data);
            } catch (error) {
                console.error('Error al obtener solicitudes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSolicitudes();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setNavbarSticky(true);
            } else {
                setNavbarSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar fixed top-36 mx-10 shadow-remake ${navbarSticky ? 'sticky' : ''}`}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-2">
                <button
                    className="text-gray-500 md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    )}
                </button>
                <div className={`${menuOpen ? 'menu' : 'hidden'} w-full md:flex md:w-auto`} id="navbar-default">
                    <ul className="font-medium flex flex-col justify-center md:flex-row md:space-x-4 md:mt-0 md:border-0">
                        <li className=' m-5 md:m-0 w-11/12 md:w-auto ' >
                            <Link href="/admin/coachs"
                                className={`navbar-boton ${activeButton === '/admin/coachs' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('/admin/coachs')}>
                                Entrenadores
                                <span className={`count ${solicitudes?.coachs.length ? (solicitudes.coachs.length > 0 ? 'red' : 'hidden') : 'hidden'}`}>
                                    {` (${solicitudes?.coachs.length || 0})`}
                                </span>
                            </Link>
                        </li>
                        <li className=' m-5 md:m-0 w-11/12 md:w-auto ' >
                            <Link href="/admin/routines"
                                className={`navbar-boton ${activeButton === '/admin/routines' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('/admin/routines')}>
                                Rutinas
                                <span className={`count ${solicitudes?.rutinas.length ? (solicitudes.rutinas.length > 0 ? 'red' : 'hidden') : 'hidden'}`}>
                                    {` (${solicitudes?.rutinas.length || 0})`}
                                </span>
                            </Link>
                        </li>
                        <li className=' m-5 md:m-0 w-11/12 md:w-auto ' >
                            <Link href="/admin/plans"
                                className={`navbar-boton ${activeButton === '/admin/plans' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('/admin/plans')}>
                                Actividades
                                <span className={`count ${solicitudes?.planes.length ? (solicitudes.planes.length > 0 ? 'red' : 'hidden') : 'hidden'}`}>
                                    {` (${solicitudes?.planes.length || 0})`}
                                </span>
                            </Link>
                        </li>
                        <li className=' m-5 md:m-0 w-11/12 md:w-auto ' >
                            <Link href="/admin/dashboard"
                                className={`navbar-boton ${activeButton === '/admin/dashboard' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('/admin/dashboard')}>
                                Categorias
                            </Link>
                        </li>
                        {isSuperAdmin && (
                            <li className=' m-5 md:m-0 w-11/12 md:w-auto ' >
                                <Link href="/admin/superadmin"
                                    className={`navbar-boton ${activeButton === '/admin/superadmin' ? 'active' : ''}`}
                                    onClick={() => handleButtonClick('/admin/superadmin')}>
                                    Admins
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;

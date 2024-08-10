'use client';

import Link from "next/link";
import React, { useEffect, useState } from 'react';

const AdminNavbar = () => {
    const [activeButton, setActiveButton] = useState('/admin');
    const [navbarSticky, setNavbarSticky] = useState(false);

    const handleButtonClick = (path: string) => {
        setActiveButton(path);
    };

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
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row rtl:space-x-reverse md:mt-0 md:border-0">
                        <li>
                            <Link href="/admin"
                                className={`navbar-boton ${activeButton === '/admin' ? 'active' : ''}`} 
                                onClick={() => handleButtonClick('/admin')}>
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/coachs"
                                className={`navbar-boton ${activeButton === '/admin/coachs' ? 'active' : ''}`} 
                                onClick={() => handleButtonClick('/admin/coachs')}>
                                Entrenadores
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/routines"
                                className={`navbar-boton ${activeButton === '/admin/routines' ? 'active' : ''}`} 
                                onClick={() => handleButtonClick('/admin/routines')}>
                                Rutinas
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/plans"
                                className={`navbar-boton ${activeButton === '/admin/plans' ? 'active' : ''}`} 
                                onClick={() => handleButtonClick('/admin/plans')}>
                                Actividades
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/exercises"
                                className={`navbar-boton ${activeButton === '/admin/exercises' ? 'active' : ''}`} 
                                onClick={() => handleButtonClick('/admin/exercises')}>
                                Ejercicios
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
};

export default AdminNavbar;
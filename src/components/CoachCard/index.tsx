import React from 'react';
import Image from 'next/image';

interface IUser {
    name: string;
    email: string;
    address: string;
    city: string;
    telefono: string;
    fotosPerfil?: string;
    role?: string;
    rutinas?: number[];
    actividades?: number[];
}

interface CoachCardProps {
    user: IUser;
}

const CoachCard: React.FC<CoachCardProps> = ({ user }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Address: {user.address}</p>
            <p>City: {user.city}</p>
            <p>Telefono: {user.telefono}</p>
            {user.fotosPerfil &&
            <Image src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIjwYVsnkZdFeK5EdIOoTELkvxUJ48OzuVPQ&s'} style={{ width: '100px', height: '100px' }} alt="" className="w-full object-cover h-[510px]" />}
            {/* {user.role && <p>Role: {user.role}</p>} */}
        </div>
    );
};

export default CoachCard;

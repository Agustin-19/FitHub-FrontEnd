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

        <div className="daisy-card m-5 daisy-card-side rounded-xl  shadow-xl shadow-[--titulos] text-[--titulos]">
            <figure>
                {user.fotosPerfil &&
                    <div className='relative object-contain w-40 h-40 rounded-t-lg'>
                        <Image
                            src={user.fotosPerfil}
                            alt={user.name}
                            fill={true}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={true}
                            className="rounded-t-lg"
                        />
                    </div>}
            </figure>
            <div className="daisy-card-body ">
                <h2 className="daisy-card-title">{user.name}</h2>
                <p>Email: {user.email}</p>
                <p>Address: {user.address}</p>
                <p>City: {user.city}</p>
                <p>Telefono: {user.telefono}</p>
            </div>
        </div>
    );
};

export default CoachCard;

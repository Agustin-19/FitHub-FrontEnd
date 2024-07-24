import React from 'react';
import CoachCard from '../CoachCard';

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

const coaches: IUser[] = [
    { name: 'John Doe', email: 'john@example.com', address: '123 Main St', city: 'Anytown', telefono: '555-1234', fotosPerfil: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrOdrD7qiiJELiBThsps1KbOESl-LA6xEjrw&s', role: 'Strength Coach' },
    { name: 'Jane Smith', email: 'jane@example.com', address: '456 Oak St', city: 'Othertown', telefono: '555-5678', fotosPerfil: 'https://static-content-2.boomfit.com/img/ybc_blog/post/b-artigo%20pts%20-%20website%20v2.jpg', role: 'Yoga Instructor' },
    { name: 'Mark Johnson', email: 'mark@example.com', address: '789 Pine St', city: 'Sometown', telefono: '555-8765', fotosPerfil: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl0OdeOSiVzY5ZL_yD1uG8wnL1tJiKOczRDg&s', role: 'Cardio Specialist' },
];

const CoachList: React.FC = () => {
    return (
        <div>
            <h1>Coaches</h1>
            {coaches.map((coach, index) => (
                <CoachCard
                    key={index}
                    user={coach}
                />
            ))}
        </div>
    );
};

export default CoachList;

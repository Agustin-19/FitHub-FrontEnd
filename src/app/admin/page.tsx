import CoachList from '../../components/CoachList/index';


export default function Admin() {
    return (
        <div className=" text-black bg-gray-100">
            <h1>Admin</h1>
            <p> Debe controlar las actividades, rutinas, entrenadores, usuarios</p>
        {/* users */}
        <CoachList/>
        {/* activities */}
        {/* routines */}
        </div>
    );
}

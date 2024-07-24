

interface IEjercicio {
    id: number;
    name: string;
    description: string;
    series: number;
    repeticiones: number;
    tiempoActividad: number;
    tiempoDescanso: number;
    imagen: string;
    videoUrl: string;
}

interface IVideoPlayerProps {
    ejercicio: IEjercicio | null;
    onClose: () => void;
}

const ExerciseVideo = ({ ejercicio, onClose }: IVideoPlayerProps) => {
    if (!ejercicio) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="relative rounded-lg w-3/4 max-w-3xl">
                <button
                    className="absolute right-2 text-black"
                    onClick={onClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[--titulos]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                </button>
                <div className="w-full h-auto mt-6">
                    <iframe

                        className="w-full h-[340px]"
                        src={ejercicio.videoUrl}
                        title={ejercicio.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen>
                    </iframe>
                </div>
                <div className="text-center">
                    <h4 className="text-xl font-bold mb-2">{ejercicio.name}</h4>
                    <p>{ejercicio.description}</p>
                    <p>Series: {ejercicio.series}</p>
                    <p>Repeticiones: {ejercicio.repeticiones}</p>
                    <p>Tiempo de Actividad: {ejercicio.tiempoActividad} segundos</p>
                    <p>Tiempo de Descanso: {ejercicio.tiempoDescanso} segundos</p>
                </div>
            </div>
        </div>
    );
}

export default ExerciseVideo;

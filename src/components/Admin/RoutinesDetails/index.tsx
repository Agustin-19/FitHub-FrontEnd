import { IRutina } from "@/interface/interface";
import Image from "next/image";

interface RoutineDetailsProps {
    routine: IRutina | null;
    onClose: () => void;
}

export default function RoutineDetails({ routine, onClose }: RoutineDetailsProps) {
    if (!routine) return null;

    const imgDefect =
        "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";
    const getImageSrc = (image: string | string[] | null | undefined) => {
        if (typeof image === "string") {
            return image;
        } else if (Array.isArray(image) && image.length > 0) {
            return image[0];
        } else {
            return imgDefect;
        }
    };

    return (
        <div className="daisy-modal top-10 daisy-modal-open bg-black">
            <div className="daisy-modal-box max-w-5xl bg-black overflow-hidden">
                <button className="daisy-btn daisy-btn-sm float-right" onClick={onClose}>
                    Cerrar
                </button>
                <div className="relative rounded-lg w-3/4 max-w-3xl p-6 overflow-y-auto max-h-screen">
                    <h2 className="text-2xl font-bold mt-4">{routine.name}</h2>
                    <div className="relative object-contain w-40 h-40 rounded-t-lg">
                        <Image
                            src={
                                routine?.imgUrl && routine.imgUrl.length > 0
                                    ? routine.imgUrl[0]
                                    : imgDefect
                            }
                            alt={routine?.name || "imagen por defecto"}
                            fill={true}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={true}
                            className="rounded-t-lg"
                        />
                    </div>
                    <p className="mt-2">{routine.description}</p>
                    <div className="mt-4">
                        <h3 className="text-xl font-semibold">Categoría:</h3>
                        {routine.category?.map((cat, index) => (
                            <span key={index} className="daisy-badge daisy-badge-outline daisy-badge-lg mr-2">
                                {cat.name}
                            </span>
                        ))}
                        <div className="text-sm opacity-50 mt-2">Dificultad: {routine.difficultyLevel}</div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-xl font-semibold">Ejercicios:</h3>
                        {routine.exercise?.map((exercise, index) => (
                            <div key={index} className="mt-4">
                                <h4 className="text-lg font-semibold">{exercise.titulo}</h4>
                                <p className="mt-1">{exercise.descripcion}</p>
                                {exercise.imgUrl && exercise.imgUrl.map((img, idx) => (
                                    <div key={idx} className="mt-2">
                                        <Image
                                            src={img}
                                            alt={exercise.titulo}
                                            width={600}
                                            height={400}
                                            className="rounded-lg"
                                        />
                                    </div>
                                ))}
                                {exercise.videoUrl && (
                                    <div className="mt-2">
                                        <iframe
                                            className="w-full h-[340px]"
                                            src={exercise.videoUrl}
                                            title={exercise.titulo}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 font-bold">
                        Precio: ${routine.price}
                    </div>
                </div>
                <div className="daisy-modal-backdrop" onClick={onClose}></div>
            </div>
        </div>
    );
}

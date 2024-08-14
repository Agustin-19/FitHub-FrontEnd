import { IRutinaEjercicio } from "@/interface/interface";

interface IVideoPlayerProps {
  ejercicio: IRutinaEjercicio | null;
  onClose: () => void;
}

const videoDefect =
  "https://res.cloudinary.com/dae25mckx/video/upload/v1722454955/ulgn0mob8nixsqf2fqwr.mp4";
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

const ExerciseVideo = ({ ejercicio, onClose }: IVideoPlayerProps) => {
  if (!ejercicio) return null;

  const videoSrc = ejercicio.videoUrl ? ejercicio.videoUrl : videoDefect;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="relative rounded-lg w-3/4 max-w-3xl">
        <button className="absolute right-2 text-white" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-[--titulos]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        <div className="w-full h-auto mt-6 ">
          {ejercicio.videoUrl ? (
            <iframe
              className="w-full h-[340px]"
              src={videoSrc}
              title={ejercicio.titulo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              className="w-full h-[340px] object-contain"
              src={getImageSrc(ejercicio.imgUrl)}
              alt={ejercicio.titulo}
            />
          )}
        </div>
        <div className="text-center">
          <h4 className="text-3xl font-bold mb-2">{ejercicio.titulo}</h4>
          <p>{ejercicio.descripcion}</p>
        </div>
      </div>
    </div>
  );
};

export default ExerciseVideo;

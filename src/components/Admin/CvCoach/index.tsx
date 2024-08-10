import PdfViewer from "@/components/ViewPdf";
import { ICoach } from "@/interface/admin.interface";

interface IParans {
    coach: ICoach | null;
    onClose: () => void;
}

const videoDefect =
    "https://res.cloudinary.com/dae25mckx/video/upload/v1722454955/ulgn0mob8nixsqf2fqwr.mp4";
const pdfDefect = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"; // PDF de ejemplo

const CvCoach = ({ coach, onClose }: IParans) => {
    if (!coach) return null;

    const videoSrc = coach.cvvideo ? coach.cvvideo : videoDefect;
    const pdfSrc = coach.cvpdf ? coach.cvpdf : pdfDefect;

    return (
        <div className="fixed inset-0 top-14 flex items-center justify-center bg-black z-50">
            <div className="relative rounded-lg w-3/4 max-w-3xl p-6 overflow-y-auto max-h-screen">
                <button className="absolute right-2 top-2" onClick={onClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div className="text-center mt-4">
                    <h4 className="text-3xl font-bold mb-2">{coach.name}</h4>
                    <p>{coach.email}</p>
                </div>
                <div className="w-full h-auto mt-6">
                    <iframe
                        className="w-full h-[340px]"
                        src={videoSrc}
                        title={coach.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="mt-4">
                    <PdfViewer pdfUrl={pdfSrc} />
                </div>

            </div>
        </div>
    );
};

export default CvCoach;

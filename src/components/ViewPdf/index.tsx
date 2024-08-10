import { FC } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

interface PdfViewerProps {
    pdfUrl: string;
}

const PdfViewer: FC<PdfViewerProps> = ({ pdfUrl }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <div style={{ height: '750px', width: '100%' }}>
                <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
            </div>
        </Worker>
    );
};

export default PdfViewer;

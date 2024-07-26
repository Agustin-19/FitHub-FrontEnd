import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            }
        ]
    },
    video: {
        formats: ['mp4', 'webm', 'ogg']
    }
};

export default withNextVideo(nextConfig);